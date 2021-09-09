import { Menubar } from "./component/menubar";
import Papaparse from "./component/Papaparse";
import React from 'react'
import { Login } from "./login";


export default function index() {
  return (
    <div className='p-4'>
      <Papaparse></Papaparse>
      <Login></Login>
    </div>
  );
}