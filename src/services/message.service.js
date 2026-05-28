const { Op } = require("sequelize");
const {
  Conversation,
  ConversationMember,
  Message,
  User,
} = require("../models");

const userAttributes = ["id", "username", "display_name", "avatar_url"];

/**
 * Get or create a 1-on-1 conversation between two users
 */
const getOrCreateConversation = async (userId, partnerId) => {
  // Tìm conversation chung giữa 2 user
  const myConvIds = await ConversationMember.findAll({
    where: { user_id: userId },
    attributes: ["conversation_id"],
    raw: true,
  });
  const myIds = myConvIds.map((r) => r.conversation_id);

  if (myIds.length > 0) {
    const partnerInSameConv = await ConversationMember.findOne({
      where: {
        conversation_id: { [Op.in]: myIds },
        user_id: partnerId,
      },
    });

    if (partnerInSameConv) {
      return await Conversation.findByPk(partnerInSameConv.conversation_id);
    }
  }

  // Chưa có → tạo mới
  const conversation = await Conversation.create({});
  await ConversationMember.bulkCreate([
    { conversation_id: conversation.id, user_id: userId },
    { conversation_id: conversation.id, user_id: partnerId },
  ]);

  return conversation;
};

/**
 * Get all conversations for a user with last message and partner info
 */
const getConversations = async (userId) => {
  // Lấy tất cả conversation_ids mà user tham gia
  const memberRows = await ConversationMember.findAll({
    where: { user_id: userId },
    attributes: ["conversation_id"],
    raw: true,
  });
  const convIds = memberRows.map((r) => r.conversation_id);

  if (convIds.length === 0) return [];

  const conversations = await Conversation.findAll({
    where: { id: { [Op.in]: convIds } },
    include: [
      {
        model: User,
        as: "members",
        attributes: userAttributes,
        through: { attributes: [] },
      },
    ],
  });

  // Cho mỗi conversation: lấy last message, unread count, partner info
  const result = await Promise.all(
    conversations.map(async (conv) => {
      const lastMessage = await Message.findOne({
        where: { conversation_id: conv.id },
        order: [["created_at", "DESC"]],
      });

      const unreadCount = await Message.count({
        where: {
          conversation_id: conv.id,
          sender_id: { [Op.ne]: userId },
          is_read: false,
        },
      });

      // Partner = member khác mình
      const partner = conv.members.find((m) => m.id !== userId) || conv.members[0];

      return {
        id: conv.id,
        partner: {
          id: partner.id,
          username: partner.username,
          display_name: partner.display_name,
          avatar_url: partner.avatar_url,
          isOnline: false, // TODO: track qua socket
        },
        lastMessage: lastMessage
          ? {
              id: lastMessage.id,
              conversationId: lastMessage.conversation_id,
              senderId: lastMessage.sender_id,
              content: lastMessage.content,
              type: lastMessage.message_type,
              createdAt: lastMessage.created_at,
              isRead: lastMessage.is_read,
            }
          : null,
        unreadCount,
        updatedAt: lastMessage ? lastMessage.created_at : conv.created_at,
      };
    }),
  );

  // Sort by updatedAt DESC
  result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return result;
};

/**
 * Get messages for a conversation (cursor-based pagination)
 */
const getMessages = async (conversationId, { cursor, limit = 30 }) => {
  const whereCondition = { conversation_id: conversationId };

  if (cursor) {
    whereCondition.id = { [Op.lt]: Number(cursor) };
  }

  const messages = await Message.findAll({
    where: whereCondition,
    include: [
      {
        model: User,
        as: "sender",
        attributes: userAttributes,
      },
    ],
    limit: Number(limit) + 1,
    order: [["id", "DESC"]],
  });

  const has_more = messages.length > limit;
  const data = has_more ? messages.slice(0, limit) : messages;

  const formattedData = data.map((msg) => ({
    id: msg.id,
    conversationId: msg.conversation_id,
    senderId: msg.sender_id,
    content: msg.content,
    type: msg.message_type,
    createdAt: msg.created_at,
    isRead: msg.is_read,
  }));

  // Reverse để oldest-first cho display
  formattedData.reverse();

  const next_cursor = has_more ? String(data[data.length - 1].id) : null;

  return { messages: formattedData, next_cursor, has_more };
};

/**
 * Create a new message
 */
const createMessage = async (conversationId, senderId, content, type = "text") => {
  const message = await Message.create({
    conversation_id: conversationId,
    sender_id: senderId,
    content,
    message_type: type,
  });

  return {
    id: message.id,
    conversationId: message.conversation_id,
    senderId: message.sender_id,
    content: message.content,
    type: message.message_type,
    createdAt: message.created_at,
    isRead: message.is_read,
  };
};

/**
 * Mark all messages in a conversation as read (from the other user)
 */
const markAsRead = async (conversationId, userId) => {
  await Message.update(
    { is_read: true },
    {
      where: {
        conversation_id: conversationId,
        sender_id: { [Op.ne]: userId },
        is_read: false,
      },
    },
  );
};

/**
 * Get partner user id from a conversation
 */
const getPartnerId = async (conversationId, userId) => {
  const members = await ConversationMember.findAll({
    where: { conversation_id: conversationId },
    raw: true,
  });
  const partner = members.find((m) => m.user_id !== userId);
  return partner ? partner.user_id : null;
};

module.exports = {
  getOrCreateConversation,
  getConversations,
  getMessages,
  createMessage,
  markAsRead,
  getPartnerId,
};
