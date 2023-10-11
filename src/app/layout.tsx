import './globals.css'
import { Nunito } from 'next/font/google'

import Navbar from '@/src/components/navbar/Navbar';
import ToasterProvider from '@/src/providers/ToasterProvider';
import ClientOnly from '@/src/components/ClientOnly';

export const metadata = {
  title: 'Book-room',
  description: 'Airbnb Clone',
}

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <Navbar />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
