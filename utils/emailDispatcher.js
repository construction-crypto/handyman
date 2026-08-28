
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export async function sendProjectPortalEmail({ clientEmail, clientName, projectId, clientToken }) {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || "https://handymanpaintingllc.co";
  const portalUrl = `${domain}/dashboard?token=${clientToken}`;

  if (!process.env.RESEND_API_KEY) {
    console.log(`RESEND_API_KEY not set. Skipping email dispatch. Dashboard URL: ${portalUrl}`);
    return { success: true, skipped: true };
  }

  try {
    const data = await resend.emails.send({
      from: "Handyman Painting L.L.C. <portal@handymanpaintingllc.co>",
      to: [clientEmail],
      subject: `Your Project Portal Access - Project #${projectId}`,
      html: `
        <div style="font-family: Inter, sans-serif; background-color: #F8F9FA; padding: 40px; color: #1A1A1A;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 24px 32px; border-bottom: 2px solid #C5A059;">
              <h2 style="color: white; margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 0.05em;">Handyman Painting L.L.C.</h2>
              <span style="color: #C5A059; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold;">Customer Project Center</span>
            </div>
            <div style="padding: 32px;">
              <h3 style="color: #0F172A; margin-top: 0; font-size: 20px;">Hello ${clientName},</h3>
              <p style="color: #4A5568; font-size: 14px; line-height: 1.6;">Your project portal has been successfully initialized. You can track your real-time phases, view cure status, and access project tools instantly via your secure link below:</p>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${portalUrl}" style="background-color: #0F172A; color: #C5A059; padding: 14px 28px; border-radius: 4px; font-weight: bold; text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em; display: inline-block; border: 1px solid #C5A059;">Open Your Secure Portal</a>
              </div>

              <p style="color: #718096; font-size: 12px; line-height: 1.5; border-top: 1px solid #F1F5F9; paddingTop: 20px;">If you have any questions or need to reach your crew lead directly, call us at <strong>320-321-9359</strong>. You Betcha, Quality Guaranteed.</p>
            </div>
          </div>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send portal email:", error);
    return { success: false, error };
  }
}

