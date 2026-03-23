const nodemailer = require("nodemailer");

const sendResetEmail = async (email, OTP) => {
  // 1. Cấu hình "Người gửi" (Sử dụng Gmail hoặc Mailtrap để test)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Nội dung Email
  const mailOptions = {
    from: '"LoxTick Support" <no-reply@loxtick.com>',
    to: email,
    subject: "Đặt lại mật khẩu cho tài khoản LoxTick",
    text: `Mã OTP của bạn là: ${OTP}. Có hiệu lực trong 5 phút.`,
    html: `
       <div style="font-family: sans-serif; max-width: 400px; margin: auto;">
        <h2>Khôi phục mật khẩu</h2>
        <p>Mã OTP của bạn là:</p>
        <h1 style="letter-spacing: 8px; color: #fe2c55;">${OTP}</h1>
        <p>Mã có hiệu lực trong <strong>5 phút</strong>.</p>
        <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
      </div>
    `,
  };

  // 3. Thực hiện gửi
  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
