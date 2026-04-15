import axios from "axios"

const mailSender = async (
  email: string,
  title: string,
  body: string
) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "StudyNotion",
          email: process.env.SENDER_EMAIL!,
        },
        to: [{ email }],
        subject: title,
        htmlContent: body,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY!,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )

    console.log("Brevo Success:", response.data.messageId)

    return response.data
  } catch (error: any) {
    console.error("BREVO ERROR:")

    if (error.response) {
      console.error("Status:", error.response.status)
      console.error("Message:", error.response.data.message)
    } else {
      console.error(error.message)
    }

    return null
  }
}

export default mailSender