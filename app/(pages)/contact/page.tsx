// 'use client';
import type { Metadata } from "next";
import ContactUs from "./contactus";

export const generateMetadata = (): Metadata =>
{
    return { title: 'Contact' }
}

export default function Page()
{
    return (
        <div id="contactPage" className="max-w-3xl mx-auto px-4 py-12 mb-20 w-full">
            <h4 className="text-3xl font-semibold mb-8 text-[var(--var-rnbw5)] text-center md:text-left">We would love to hear from you</h4>
            <ContactUs />
        </div>
    );
}

// SendGrid, Resend, or Nodemailer (More Professional)
// You create an account with an email API service (like Resend or SendGrid). We then build an API route (app/api/contact/route.ts) in your project to securely take the POST request data and talk to the email service to deliver the message.

// Pros: Completely white-labeled (no 3rd party branding). The free tier on a service like Resend gives you 3,000 emails per month.
// Cons: Requires a little bit of setup. You have to verify ownership of the allsaintsla.church domain by adding some DNS records to your domain provider, and we have to add an environment variable to your project.