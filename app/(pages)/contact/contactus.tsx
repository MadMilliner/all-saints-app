'use client'
import type { FC } from "react";
import { sendEmail } from "@/app/utils/send-email";
import { useForm, type SubmitHandler } from 'react-hook-form'

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactUs: FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await sendEmail(data);
    reset();
  };

    return (
        <form onSubmit={handleSubmit(onSubmit)} 
            id="contact-form" encType="text/plain" className="flex flex-col gap-6 bg-[var(--var-lightmed)] bg-opacity-10 shadow-lg rounded-2xl p-6 md:p-10 text-[var(--var-medlight)]">
                {/* <fieldset className="flex flex-col md:flex-row gap-6 border-none p-0 m-0"> */}
                    <div className="flex-1 flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium mb-1">Name <span className="text-red-500">*</span></label>
                        <input type="text" id="name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--var-rnbw5)] focus:border-transparent transition-all shadow-sm text-black" {...register('name', { required: true })}/>
                    </div>
                    {/* <div className="flex-1 flex flex-col">
                        <label htmlFor="last-name" className="text-sm font-medium mb-1">Last Name</label>
                        <input type="text" id="last-name" name="last_name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--var-rnbw5)] focus:border-transparent transition-all shadow-sm text-black" />
                    </div>
                </fieldset> */}

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
                    <input type="email" id="email" required className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--var-rnbw5)] focus:border-transparent transition-all shadow-sm text-black" {...register('email', { required: true })}/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="message" className="text-sm font-medium mb-1">Message <span className="text-red-500">*</span></label>
                    <textarea id="message" rows={5} required className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--var-rnbw5)] focus:border-transparent transition-all shadow-sm text-black resize-y" {...register('message', { required: true })}></textarea>
                </div>

                <div className="flex justify-start mt-4">
                    <button type="submit" className="w-full md:w-auto px-10 border-0 py-3 bg-[var(--var-rnbw5)] text-white text-lg font-semibold rounded-lg shadow-md hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--var-rnbw5)] overflow-hidden m-0">
                    Send Message
                    </button>
                </div>
            </form>
    )
}

export default ContactUs