import Link from 'next/link'
import Navbar from './Navbar';
import { Pages } from '@/constants/enums';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '@/lib/verifyToken';
import LogoutButton from './Logout';

const Header = async () => {
  const token = (await cookies()).get("token")?.value || ""
  const userData = verifyTokenForPage(token)
  return (
    <header className="bg-gray-200 h-24 flex items-center justify-between px-10 border-b-4 border-gray-500">
      <Navbar />
      <div className="flex items-center gap-4">
        {
          userData ? (
            <>
              <Link href="/profile" className='text-blue-800 font-bold md:text-xl capitalize'>
                {userData?.username}
              </Link>
              <LogoutButton />
            </>
          ) :
          <div className="flex items-center gap-4">
              <Link href={Pages.LOGIN} className="text-lg font-semibold text-gray-800 hover:text-blue-800">Login</Link>
              <Link href={Pages.Register} className="text-lg font-semibold text-gray-800 hover:text-blue-800">Register</Link>
            </div>
        }
      </div>
    </header>
  );
};


export default Header