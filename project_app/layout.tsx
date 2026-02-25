import '@/app/ui/global.css'
import { poppins, lusitana } from './ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
        
      <body className={`${poppins.className} antialiased`}>
        {/* <nav className="">TopNav</nav> */}
        {children}
      </body>
    </html>
  );
}
