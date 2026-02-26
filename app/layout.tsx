import '@/app/ui/global.css'
import { Footer, Navbar } from './ui/Head-Foot';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Poppins } from 'next/font/google';
 
export const metadata: Metadata = {
  title: {
    template: '%s | All Saints LA',
    default: 'All Saints LA', // a default is required when creating a template
  },
  description: 'All Saints is a Jesus-centered, progressive, LGBTQIA+ affirming church. ',
}

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en" className={poppins.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/img/favicon.ico"></link>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" /> */}
      </head>
        
      <body className={`antialiased`}>
        <Navbar />
            {children}
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
