import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <div className='flex-col'>
    <Navbar/>
    <div className='flex-col mt-16'>
    <Component {...pageProps} />
    </div>
    <Footer/>
  </div>
}
