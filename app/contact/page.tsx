// 'use client';
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return{title: 'Contact',}
}

export default function Page() {
    return (
        <div id="contactPage">
            <h4>We would love to hear from you</h4>
            <form id="contact-form" className="contact-form">
                <fieldset className="name-fields">
                    <div>
                    <label htmlFor="first-name">First Name <span>(required)</span></label>
                    <input type="text" id="first-name" name="first_name" required />
                    </div>
                    <div>
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last_name" />
                    </div>
                </fieldset>

                <label htmlFor="email">Email <span>(required)</span></label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">Message <span>(required)</span></label>
                <textarea id="message" name="message" rows={5} required></textarea>

                <button type="submit">Send Message</button>
                </form>
        </div>
);
    };