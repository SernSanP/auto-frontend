import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Papaparse from "./components/Papaparse";

export default function upload() {
    
  return (
         <div className="items-center justify-center bg-gray-200 px-8 pt-8 pb-8">
            <div className="flex items-center justify-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <Papaparse></Papaparse>
            </div>
        </div>
  );
}