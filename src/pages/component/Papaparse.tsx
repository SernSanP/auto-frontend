import axios from "axios";
import Papa from "papaparse";
import { useCallback, useState } from "react";
import { getBankFromAbbr } from "src/bank";
import Dropzone from "./DropZone";


interface Transaction {
  bankCode: string;
  fullName: string;
  accountNo: string;
  balance: number;
}

interface TransactionError {
  line: number;
  errors: string[];
}

interface Result {
  res: string[][];
  error: boolean;
  total:number
}

const validate_error = {
  column_toomany:"จำนวนคอลัมน์เกินกำหนด",
  column_toolittle:"จำนวนคอลัมน์น้อยกว่ากำหนด",
  missing_bank:"ไม่ได้ระบุธนาคาร",
  missing_name:"ไม่ได้ระบุชื่อเจ้าของบัญชี",
  missing_acc:"ไม่ได้ระบุเลขบัญชี",
  missing_bal:"ไม่ได้ระบุจำนวนเงิน",
  bank_false:"ชื่อย่อธนาคารไม่ถูกต้อง",
  acc_false:"รูปแบบเลขบัญชีไม่ถูกต้อง",
  bal_false:"รูปแบบยอดเงินไม่ถูกต้อง",
}

export default function Papaparse() {
  const [result, setResult] = useState<Result>({ res: [] ,error:false ,total:0})
  const [upload, setUpload] = useState(false)

  const check_data_null = (data:any) => {
    if(data[0]=="",data[1] == "",data[2] == "",data[3]==""){
      return false
    }
    return true
  }
  const linevalidate = (data:string[] , line:number) => {
    let error = []
    if(data.length != 4){
      if(data.length<4){
        error.push(validate_error.column_toolittle)
      }
      else{
        error.push(validate_error.column_toomany)
      }
      const res = {line:line,errors:error}
      return res
    }
    if(data[0] ==""){
      error.push(validate_error.missing_bank)
    }
    if(data[1] ==""){
      error.push(validate_error.missing_name)
    }
    if(data[2] ==""){
      error.push(validate_error.missing_acc)
    }
    if(data[3] ==""){
      error.push(validate_error.missing_bal)
    }
    if(! getBankFromAbbr(data[0])){
      error.push(validate_error.bank_false)
    }
    if(! data[2].match(/[0-9]{10}/)){
      error.push(validate_error.acc_false)
    }
    if( ! data[3].match(/^[0-9,]+\.\d{0,2}$/) && ! data[3].match(/^[0-9]+$/) ){
      error.push(validate_error.bal_false)
    }
    if(error.length != 0){
      const res = {line:line,errors:error}
      return res
    }
    return data
  }

  const validate = (transactionlist:any) => {
    const res_error:any[] = []
    const res:any[] = []
    let total = 0
    for(let i = 1;i<transactionlist.length;i++){
      let check_null = false
      if(check_data_null(transactionlist[i])){
        res.push(transactionlist[i])
        total += parseFloat(transactionlist[i][3]) 
        var vali = linevalidate(transactionlist[i],i+1)
        if(vali != transactionlist[i]){
          res_error.push(vali)
        }
      }
    }
    if(res_error.length != 0){
      return {res:res_error,error:true ,total:0}
    }
    return {res:res,error:false ,total:total}
  }

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles[0]);
    Papa.parse(acceptedFiles[0], {
      complete: function(results:any) {
        console.log(results)
        const res = validate(results.data)
        console.log(res.res)
        if(res.error){
          console.log("error")
          setResult(res)
          setUpload(true)
        }
        else{
          console.log("pass")
          setResult(res)
          setUpload(true)
        }
      }
    });
  }, []);

  async function onUpload() {
    const packet = await axios.post(
      'http://localhost:5000/transfer/test',
      {
        data:result.res,
        userID:'d95cd33f-865a-4f70-9d92-7e9609581b0b',
        source_system_name:"ssn_test",
      },
      {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }
    ).then(function (response) {
      console.log(response);
      console.log(packet)
    });
    setResult({ res: [] ,error:false ,total:0})
    setUpload(false)
  }

  const showdata = (data:any[]) =>{
    return(
      <div className="grid grid-cols-4 gap-4 pt-2 pb-2">
        <div className="pt-2 text-xs">{data[0]}</div>
        <div className="pt-2 text-xs">{data[1]}</div>
        <div className="pt-2 text-xs">{data[2]}</div>
        <div className="pt-2 text-xs">{data[3]}</div>
      </div>
    )
  }

  const showerror = (data:any) =>{
    return(
      <div>
        <div>line {data.line}</div>
        <div className="pl-6">{data.errors.map(error => <div>- {error}</div>)}</div>
      </div>
    )
  }

  const resetUpload = () => {
    setResult({ res: [] ,error:false ,total:0})
    setUpload(false)
  }

  return (
    <div className="">
      <p className="text-blue-600 font-black text-2xl">Upload a Transaction</p>
      {upload ? 
      <div>
        {result.error ? 
        <div >
          <div className="flex items-center justify-center gap-2 pt-4">
            <img src="https://image.freepik.com/free-icon/forbidden-simbol_318-9698.jpg" className="w-20 h-20"/>
          </div>
          <div className="pt-4 text-lg font-bold pb-4 text-center">
            Reading Failed
          </div>
          <div className="pt-4 pb-4 text-center">โปรดตรวจสอบไฟล์ CSV ของท่านดังต่อไปนี้</div>
          {result.res.map((data)=>showerror(data))}
        </div> : 
        <div>
          <div className="flex items-center justify-center gap-2 pt-4">
            <img src="https://image.flaticon.com/icons/png/512/20/20406.png" className="w-20 h-20"/>
          </div>
          <div className="pt-4 text-lg font-bold">
            Upload Confirm
          </div>
          <div className="grid grid-cols-4 pt-4 gap-4">
            <div className="col-span-2">Total {result.res.length} Transactions</div>
            <div className="col-span-2">Total {result.total} Bath</div>
          </div>
          <div className="grid grid-cols-4 pt-4 gap-4">
            <div className="font-bold">ชื่อธนาคาร</div>
            <div className="font-bold">ชื่อ นามสกุล</div>
            <div className="font-bold">เลขบัญชี</div>
            <div className="font-bold">จำนวนเงิน</div>
          </div>
          {result.res.map((data)=>showdata(data))}
        </div> }
        <div  className="flex items-center justify-center gap-2 pt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(e)=>onUpload()}>Upload</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(e)=>resetUpload()}>Cancel</button>
        </div>
      </div>
       :
     <div>
       <div className="flex items-center justify-center gap-2 pt-4">
          <Dropzone onDrop={onDrop} accept={".csv"} />
       </div>
       <div className="pt-4 text-lg font-extrabold">CSV Template Format</div>
       <div>Row 1: Header</div>
       <div>Row 2+: Transaction</div>
       <div className="pt-4 text-lg font-extrabold">ตัวอย่าง</div>
       <div className="grid grid-cols-4 pt-4 gap-4">
            <div className="font-bold">ชื่อธนาคาร</div>
            <div className="font-bold">ชื่อ นามสกุล</div>
            <div className="font-bold">เลขบัญชี</div>
            <div className="font-bold">จำนวนเงิน</div>
            <div>KBNK</div>
            <div>Jane Doe</div>
            <div>0123456789</div>
            <div>15000</div>
        </div>
     </div> }
      
      
    </div>
  );
}