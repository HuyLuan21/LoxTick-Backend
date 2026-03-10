const nodemailer = require("nodemailer");

const sendResetEmail = async (email, resetUrl) => {
  // 1. Cấu hình "Người gửi" (Sử dụng Gmail hoặc Mailtrap để test)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Email của Huy
      pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng (App Password)
    },
  });

  // 2. Nội dung Email
  const mailOptions = {
    from: '"LoxTick Support" <no-reply@loxtick.com>',
    to: email,
    subject: "Đặt lại mật khẩu cho tài khoản LoxTick",
    // Gửi dạng Text (Phòng trường hợp trình duyệt chặn HTML)
    text: `Chào bạn, vui lòng click vào link sau để đổi mật khẩu: ${resetUrl}`,
    // Gửi dạng HTML để có nút bấm đẹp
    html: `
      <h1>Yêu cầu đặt lại mật khẩu</h1>
      <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấn vào nút bên dưới để tiếp tục:</p>
      <a href="${resetUrl}" style="background-color: #fe2c55; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Đặt lại mật khẩu
      </a>
      <p>Link này sẽ hết hạn sau 15 phút.</p>
    `,
  };

  // 3. Thực hiện gửi
  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
