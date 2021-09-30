import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { RiBankLine, RiFileList3Line } from 'react-icons/ri';

const dropDownMenu = [
  {
    text: 'Choose Source System',
    link: '/choose-source-system',
    icon: <RiBankLine />,
  },
  {
    text: 'Transaction List',
    link: '/transactions',
    icon: <RiFileList3Line />,
  },
  { text: 'Log Out', link: '/login', icon: <FiLogOut /> },
];

const Navbar = () => {
  const router = useRouter();
  const showHamburger =
    router.pathname === '/login'
      ? false
      : router.pathname === '/choose-source-system'
      ? false
      : true;
  const [isDropDown, setIsDropDown] = useState(false);

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const linkToAnotherPage = (link: string) => {
    setIsDropDown(false);
    router.push(link);
  };

  return (
    <div>
      <div className="flex justify-between items-center text-white bg-blue-600 h-14 px-4">
        <div className="text-2xl">Auto Transfer Manager</div>
        {showHamburger && (
          <button onClick={handleDropDown}>
            {!isDropDown && <GiHamburgerMenu />}
            {isDropDown && <CgClose />}
          </button>
        )}
      </div>
      {showHamburger && isDropDown && (
        <div>
          {dropDownMenu.map((menu,index) => (
            <div
              key={index}
              className="flex items-center space-x-1.5 text-l border-gray-200  bg-blue-600 text-white px-4 hover:cursor-pointer py-2"
              onClick={() => linkToAnotherPage(menu.link)}
            >
              <div>{menu.icon}</div>
              <div>{menu.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
