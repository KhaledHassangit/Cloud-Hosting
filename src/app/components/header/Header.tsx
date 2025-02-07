import Link from 'next/link'
import Navbar from './Navbar';
import { Pages, Routes } from '@/app/constants/enums';

const Header = () => {
  
    return (
      <header className="bg-gray-200 h-24 flex items-center justify-between px-10 border-b-4 border-gray-500">
        <Navbar  />
        <div className="flex items-center gap-4">
          <Link href={Pages.LOGIN} className="text-lg font-semibold text-gray-800 hover:text-blue-800">Login</Link>
          <Link href={Pages.Register} className="text-lg font-semibold text-gray-800 hover:text-blue-800">Register</Link>
        </div>
          <div className="absolute left-0 top-full w-full bg-gray-200 transition-all duration-500 z-50 md:hidden">
            <ul className="flex flex-col items-start space-y-3 p-4">
              <li><Link href={Routes.ROOT} className="text-lg font-semibold text-gray-800 hover:text-blue-800">Home</Link></li>
              <li><Link href={Routes.ARTICLES} className="text-lg font-semibold text-gray-800 hover:text-blue-800">Articles</Link></li>
              <li><Link href={Routes.ABOUT} className="text-lg font-semibold text-gray-800 hover:text-blue-800">About</Link></li>
            </ul>
          </div>
      </header>
    );
  };
  

export default Header