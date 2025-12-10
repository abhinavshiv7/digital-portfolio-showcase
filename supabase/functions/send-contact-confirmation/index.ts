import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";
import { z } from "https://esm.sh/zod@3.25.76";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Server-side validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().max(100, "Company must be less than 100 characters").optional().nullable(),
  whatsapp: z.string().max(20, "WhatsApp number must be less than 20 characters").optional().nullable(),
  message: z.string().max(1000, "Message must be less than 1000 characters").optional().nullable(),
});

// HTML escape function to prevent XSS in email templates
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input
    const rawData = await req.json();
    const validationResult = contactSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid form data. Please check your inputs and try again.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, company, whatsapp, message } = validationResult.data;

    // Escape HTML entities for safe email template insertion
    const safeName = escapeHtml(name);
    const safeCompany = company ? escapeHtml(company) : null;

    console.log("Processing contact form submission:", { name: safeName, email, company: safeCompany, whatsapp });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save contact to database
    const { error: dbError } = await supabase
      .from("visitor_contacts")
      .insert({
        name,
        email,
        company: company || null,
        whatsapp: whatsapp || null,
        message: message || null,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Database operation failed");
    }

    console.log("Contact saved to database successfully");

    // Send confirmation email with escaped content
    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for reaching out!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            .highlight { background: #667eea; color: white; padding: 2px 8px; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Visiting!</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${safeName}</strong>,</p>
              <p>Thank you for taking the time to visit my portfolio and reach out. I truly appreciate your interest!</p>
              <p>I have received your message and will get back to you as soon as possible. I'm excited to discuss potential opportunities and collaborations.</p>
              ${safeCompany ? `<p>I noticed you're from <span class="highlight">${safeCompany}</span>. Looking forward to learning more about your organization.</p>` : ''}
              <p>In the meantime, feel free to explore my portfolio further to learn more about my projects, skills, and experience.</p>
              <p><strong>Best regards,</strong><br/>Computer Science Student</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact saved and confirmation email sent",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    // Log detailed error server-side only
    console.error("Error in send-contact-confirmation function:", error);
    
    // Return generic error message to client
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to process your request. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
