const otpTemplate = (otp: string) => {
  const clientUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://your-default-url.com"

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>OTP Verification</title>
    </head>

    <body
      style="
        margin: 0;
        padding: 0;
        background-color: #f4f7fb;
        font-family: Arial, sans-serif;
      "
    >
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="padding: 40px 0"
      >
        <tr>
          <td align="center">
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              style="
                max-width: 520px;
                background: #ffffff;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
              "
            >
              <!-- Header -->
              <tr>
                <td
                  align="center"
                  style="
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    padding: 40px 20px;
                    color: white;
                  "
                >
                  <h1
                    style="
                      margin: 0;
                      font-size: 28px;
                      font-weight: 700;
                    "
                  >
                    Verify Your Account
                  </h1>

                  <p
                    style="
                      margin-top: 10px;
                      font-size: 15px;
                      opacity: 0.9;
                    "
                  >
                    Secure OTP Verification
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 32px; text-align: center">
                  <h2
                    style="
                      margin: 0;
                      color: #111827;
                      font-size: 24px;
                    "
                  >
                    Your OTP Code
                  </h2>

                  <p
                    style="
                      margin: 16px 0 28px;
                      color: #6b7280;
                      font-size: 15px;
                      line-height: 1.6;
                    "
                  >
                    Use the verification code below to continue.
                    This code is valid for
                    <strong>5 minutes</strong>.
                  </p>

                  <!-- OTP Box -->
                  <div
                    style="
                      display: inline-block;
                      background: #f3f4f6;
                      padding: 18px 32px;
                      border-radius: 14px;
                      letter-spacing: 10px;
                      font-size: 32px;
                      font-weight: bold;
                      color: #4f46e5;
                      border: 2px dashed #c7d2fe;
                    "
                  >
                    ${otp}
                  </div>

                  <p
                    style="
                      margin-top: 30px;
                      color: #9ca3af;
                      font-size: 14px;
                      line-height: 1.6;
                    "
                  >
                    If you did not request this OTP,
                    you can safely ignore this email.
                  </p>

                  <!-- Button -->
                  <a
                    href="${clientUrl}"
                    style="
                      display: inline-block;
                      margin-top: 28px;
                      background: linear-gradient(135deg, #6366f1, #8b5cf6);
                      color: #ffffff;
                      text-decoration: none;
                      padding: 14px 28px;
                      border-radius: 12px;
                      font-size: 15px;
                      font-weight: 600;
                    "
                  >
                    Visit App
                  </a>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td
                  align="center"
                  style="
                    padding: 24px;
                    background: #f9fafb;
                    color: #9ca3af;
                    font-size: 13px;
                  "
                >
                  © ${new Date().getFullYear()} Your App.
                  All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `
}

export default otpTemplate