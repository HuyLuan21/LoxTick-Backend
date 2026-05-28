const messageService = require("../services/message.service");
const { ConversationMember } = require("../models");

/**
 * GET /api/conversations
 * Lấy danh sách cuộc trò chuyện của user hiện tại
 */
const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await messageService.getConversations(userId);
    res.json({ conversations });
  } catch (error) {
    console.error("getConversations error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * GET /api/conversations/:id/messages
 * Lấy tin nhắn của một cuộc trò chuyện (cursor-based)
 */
const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversationId = Number(req.params.id);
    const { cursor, limit } = req.query;

    // Verify user belongs to this conversation
    const membership = await ConversationMember.findOne({
      where: { conversation_id: conversationId, user_id: userId },
    });

    if (!membership) {
      return res.status(404).json({ message: "Không tìm thấy cuộc trò chuyện" });
    }

    const result = await messageService.getMessages(conversationId, {
      cursor,
      limit: limit ? Number(limit) : 30,
    });

    res.json(result);
  } catch (error) {
    console.error("getMessages error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * POST /api/conversations/:id/messages
 * Gửi tin nhắn mới
 */
const sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversationId = Number(req.params.id);
    const { content, type } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Nội dung không được trống" });
    }

    // Verify user belongs to this conversation
    const membership = await ConversationMember.findOne({
      where: { conversation_id: conversationId, user_id: userId },
    });

    if (!membership) {
      return res.status(404).json({ message: "Không tìm thấy cuộc trò chuyện" });
    }

    const message = await messageService.createMessage(
      conversationId,
      userId,
      content.trim(),
      type || "text",
    );

    // Emit via socket to partner
    const { getIO } = require("../config/socket");
    const io = getIO();
    if (io) {
      const partnerId = await messageService.getPartnerId(conversationId, userId);
      if (partnerId) {
        io.to(`user:${partnerId}`).emit("NEW_MESSAGE", {
          conversationId,
          message,
        });
      }
    }

    res.status(201).json({ message: "Đã gửi", data: message });
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * POST /api/conversations/start
 * Bắt đầu hoặc lấy cuộc trò chuyện với một user khác
 * Body: { partnerId: number }
 */
const startConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { partnerId } = req.body;

    if (!partnerId) {
      return res.status(400).json({ message: "Thiếu partnerId" });
    }

    if (Number(partnerId) === userId) {
      return res.status(400).json({ message: "Không thể nhắn tin cho chính mình" });
    }

    const conversation = await messageService.getOrCreateConversation(
      userId,
      Number(partnerId),
    );

    res.json({ conversationId: conversation.id });
  } catch (error) {
    console.error("startConversation error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * POST /api/conversations/:id/read
 * Đánh dấu đã đọc tất cả tin nhắn
 */
const markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversationId = Number(req.params.id);

    await messageService.markAsRead(conversationId, userId);

    // Notify sender that messages were read
    const { getIO } = require("../config/socket");
    const io = getIO();
    if (io) {
      const partnerId = await messageService.getPartnerId(conversationId, userId);
      if (partnerId) {
        io.to(`user:${partnerId}`).emit("MESSAGES_READ", { conversationId });
      }
    }

    res.json({ message: "Đã đọc" });
  } catch (error) {
    console.error("markAsRead error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = {
  getConversations,
  getMessages,
  sendMessage,
  startConversation,
  markAsRead,
};
