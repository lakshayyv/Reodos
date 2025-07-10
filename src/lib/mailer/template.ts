export const VERFICATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reodos Email Verification</title>
    <!-- Google Fonts: Poppins -->
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="max-width: 600px; margin: 0 auto"
          >
            <tr>
              <td
                align="center"
                style="background-color: #ffffff; padding: 0 20px"
              >
                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    max-width: 400px;
                    background-color: #ffffff;
                    border-radius: 16px;
                    font-family: 'Poppins', sans-serif;
                  "
                >
                  <tr>
                    <td style="padding: 40px 30px; text-align: center">
                     <h1
                        style="
                          margin: 0 0 12px;
                          font-size: 22px;
                          color: #1e1e1e;
                        "
                      >
                        Reodos
                      </h1>
                      <h1
                        style="
                          margin: 0 0 12px;
                          font-size: 22px;
                          color: #1e1e1e;
                        "
                      >
                        Verify Your Email
                      </h1>
                      <p
                        style="
                          margin: 0 0 28px;
                          font-size: 14px;
                          color: #555555;
                        "
                      >
                        Enter the OTP below to verify your account.
                      </p>

                      <div
                        style="
                          display: inline-block;
                          font-size: 24px;
                          letter-spacing: 6px;
                          padding: 14px 24px;
                          background-color: #e8e8e8;
                          color: #000000;
                          border-radius: 12px;
                          font-weight: bold;
                        "
                      >
                        {{otp_code}}
                      </div>

                      <p
                        style="
                          margin: 28px 0 0;
                          font-size: 12px;
                          color: #888888;
                        "
                      >
                        This is a no-reply email. Please don&apos;t respond.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
