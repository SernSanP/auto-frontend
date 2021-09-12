import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Papaparse from "./component/Papaparse";

export default function upload() {
    
  return (
         <div className="w-full max-w-lg">
            <div className="flex items-center justify-center bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <Papaparse></Papaparse>
            </div>
        </div>
  );
}