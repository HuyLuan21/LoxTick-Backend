const nodemailer = require("nodemailer");

const sendEmail = async (email, type, OTP) => {
  // 1. Cấu hình "Người gửi" (Sử dụng Gmail hoặc Mailtrap để test)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Nội dung Email
  let content = "";
  if (type === "register") {
    content = `
       <div style="font-family: sans-serif; max-width: 400px; margin: auto;">
        <h2>Xác thực tài khoản LoxTick</h2>
        <p>Mã OTP của bạn là:</p>
        <h1 style="letter-spacing: 8px; color: #fe2c55;">${OTP}</h1>
        <p>Mã có hiệu lực trong <strong>5 phút</strong>.</p>
        <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
      </div>
    `;
  } else if (type === "reset") {
    content = `
       <div style="font-family: sans-serif; max-width: 400px; margin: auto;">
        <h2>Khôi phục mật khẩu</h2>
        <p>Mã OTP của bạn là:</p>
        <h1 style="letter-spacing: 8px; color: #fe2c55;">${OTP}</h1>
        <p>Mã có hiệu lực trong <strong>5 phút</strong>.</p>
        <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
      </div>
    `;
  }
  const mailOptions = {
    from: '"LoxTick Support" <no-reply@loxtick.com>',
    to: email,
    subject: type === "register" ? "Xác thực tài khoản" : "Đặt lại mật khẩu",
    text: `Mã OTP của bạn là: ${OTP}. Có hiệu lực trong 5 phút.`,
    html: content,
  };
  // 3. Thực hiện gửi
  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
