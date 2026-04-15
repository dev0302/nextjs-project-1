const otpTemplate = (otp: string) => {
  const clientUrl =
    process.env.CLIENT_URL ||
    "https://your-default-url.com"

  return `
    <html>
      <body>
        <h1>Your OTP is: ${otp}</h1>
        <p>Valid for 5 minutes</p>
        <a href="${clientUrl}">Visit App</a>
      </body>
    </html>
  `
}

export default otpTemplate