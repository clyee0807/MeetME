import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MeetME',
}

export default function RootLayout({ children }) {
  // console.log(children);
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* <meta charSet="utf-8" /> */}
        {/* <meta name="description" content="MeetME" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/alien.svg"/>
      </head>
      {/* <body className={inter.className }> */}
      <body className=' bg-[#F7F2ED]'>
        {/* <Navbar/> */}
        {children}
        <Footer/>
      </body>
    </html>
  )
}
