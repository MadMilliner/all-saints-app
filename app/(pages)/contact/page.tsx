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
        <div id="contactPage" className="max-w-3xl mx-auto px-4 py-12 mb-20 w-full flex-col items-center">
            <h4 className="text-3xl font-semibold mb-8 text-[var(--var-rnbw5)] text-center md:text-left">We would love to hear from you</h4>
            <ContactUs />
        </div>
    );
}
