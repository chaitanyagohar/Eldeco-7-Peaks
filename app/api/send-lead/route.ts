import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, phone } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "solidate03@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Website Lead" <leads.albero@gmail.com>',
      to: "goharchaitanya04@gmail.com",
      subject: "New Lead - Eldeco 7 Peaks",
      html: `
        <h2>New Website Lead</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}