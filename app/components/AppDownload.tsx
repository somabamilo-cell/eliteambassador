import Google from '@/app/assets/Google Play.svg';
import Apple from '@/app/assets/App Store.svg';
import Image from 'next/image';

const AppDownload = () => {
  return (
    <div className='flex items-center gap-4 mt-6 md:hidden'>
        <a href="/" className='h-10'><Image sizes='100%' className='h-full w-full object-contain ' src={Apple} alt="Ios Download" /></a>
        <a href="/" className='h-10'><Image sizes='100%' className='h-full w-full object-contain ' src={Google} alt="Andriod Download" /></a>
    </div>
  )
}

export default AppDownload