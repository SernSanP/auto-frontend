import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';


const Navbar = () =>  {
    return (
        <div className="flex justify-between items-center text-white bg-blue-600 h-14 px-4">
            <div className="text-2xl">Auto Transfer Manager</div>
            <div><GiHamburgerMenu /></div>
        </div>
    )
}

export default Navbar;
