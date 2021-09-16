import { useRouter } from 'next/dist/client/router';
import React from 'react';
import {GiHamburgerMenu} from 'react-icons/gi'

const Navbar = () => {
  const router = useRouter();
  const logout = () => {
    localStorage.clear()
    router.push('/login')
  }
  return (
    <div className="flex justify-between items-center text-white bg-blue-600 h-14 px-4">
      <div className="text-2xl">Auto Transfer Manager</div>
      {/* <div>
        <GiHamburgerMenu />
      </div> */}
      <button type="button" onClick={logout}>
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
