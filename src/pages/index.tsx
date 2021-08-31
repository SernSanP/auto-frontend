import Papa from "papaparse";
import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File>();
//   var data;
//   Papa.parse(selectedFile.files[0], {
//   complete: function(results:any) {
//     console.log(results);
//     data = results.data;
//   }
// });
	const changeHandler = (event:any) => {
		setSelectedFile(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      complete: function(results:any) {
        console.log(results);
      }
    });
	};
  return (
    <div className='p-4'>
      <h1>Hello</h1>
      <input type="file" name="file" onChange={changeHandler} />
      <div className='text-red-600'>Welcome!</div>
    </div>
  );
}