import { Menubar } from "./component/menubar";
import Papaparse from "./component/Papaparse";
import React from 'react'


export default function index() {
  return (
    <div className='p-4'>
      <Papaparse></Papaparse>
      <Menubar></Menubar>
    </div>
  );
}