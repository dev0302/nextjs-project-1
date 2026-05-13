const BASE_STYLES = {
  wrapper:
    "margin:0;padding:0;font-family:Arial,sans-serif;background-color:#020617;",
  outerTable: "background-color:#020617;padding:40px 0;",
  card: "background-color:#0f172a;border-radius:8px;border:1px solid #1e293b;",
  cardCell: "padding:40px 30px;text-align:center;",
  title: "color:#e5e7eb;margin:0 0 20px 0;font-size:28px;",
  body: "color:#94a3b8;margin:0 0 30px 0;font-size:14px;line-height:1.7;",
  box: "background-color:#1e293b;border:1px solid #334155;border-radius:8px;padding:24px;margin:30px 0;",
  footer: "color:#64748b;margin:20px 0 0 0;font-size:12px;line-height:1.6;",
}

const otpTemplate = (otp: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>OTP Verification</title>
    </head>

    <body style="${BASE_STYLES.wrapper}">
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="${BASE_STYLES.outerTable}"
      >
        <tr>
          <td align="center">

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              style="
                ${BASE_STYLES.card};
                max-width: 600px;
              "
            >
              <tr>
                <td style="${BASE_STYLES.cardCell}">

                  <!-- Logo / Brand -->
                  <div style="margin-bottom:24px;">
                    <h1
                      style="
                        margin:0;
                        color:#22d3ee;
                        font-size:20px;
                        font-weight:bold;
                        letter-spacing:1px;
                      "
                    >
                      YOUR APP
                    </h1>
                  </div>

                  <!-- Title -->
                  <h1 style="${BASE_STYLES.title}">
                    Verify Your Account
                  </h1>

                  <!-- Description -->
                  <p style="${BASE_STYLES.body}">
                    Use the OTP below to continue securely.
                    This verification code will expire in
                    <strong style="color:#e5e7eb;">5 minutes</strong>.
                  </p>

                  <!-- OTP Box -->
                  <div style="${BASE_STYLES.box}">
                    <p
                      style="
                        color:#e5e7eb;
                        font-size:36px;
                        font-weight:bold;
                        letter-spacing:10px;
                        margin:0;
                        font-family:monospace;
                      "
                    >
                      ${otp}
                    </p>
                  </div>

                  <!-- Footer Note -->
                  <p style="${BASE_STYLES.footer}">
                    If you didn’t request this OTP,
                    you can safely ignore this email.
                  </p>

                  <!-- Copyright -->
                  <p
                    style="
                      color:#475569;
                      font-size:12px;
                      margin-top:32px;
                    "
                  >
                    © ${new Date().getFullYear()} Your App.
                    All rights reserved.
                  </p>

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