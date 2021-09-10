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
  const [selectedFile, setSelectedFile] = useState<File>();

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
    for(let i = 1;i<transactionlist.length;i++){
      let check_null = false
      if(check_data_null(transactionlist[i])){
        res.push(transactionlist[i])
        var vali = linevalidate(transactionlist[i],i+1)
        if(vali != transactionlist[i]){
          res_error.push(vali)
        }
      }
    }
    if(res_error.length != 0){
      return {res:res_error,error:true}
    }
    return {res:res,error:false}
  }

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles[0]);
    setSelectedFile(acceptedFiles[0]);
    Papa.parse(acceptedFiles[0], {
      complete: function(results:any) {
        console.log(results)
        const res = validate(results.data)
        console.log(res.res)
        if(res.error){
          console.log("error")
        }
        else{
          console.log("pass")
          axios.post(
            'http://localhost:5000/transfer/create',
            {
              data:res.res,
              userID:'',
              source_system_name:'',
            }
          );
        }
      }
    });
  }, []);

  return (
    <div>
      <div className='w-full max-w-xs border-dashed border-4 border-light-blue-500'>
        <Dropzone onDrop={onDrop} accept={".csv"} />
      </div>
    </div>
  );
}