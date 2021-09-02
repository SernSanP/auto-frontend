import Papa from "papaparse";
import { useState } from "react";
import { getBankFromAbbr } from "src/bank";

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

export default function papa() {
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
    if(! data[3].match(/^[0-9,]+\.\d{0,2}$/)){
      error.push(validate_error.bal_false)
    }
    if(error.length != 0){
      const res = {line:line,errors:error}
      return res
    }
    return data
  }

  const validate = (transactionlist:any) => {
    const res = []
    for(let i = 1;i<transactionlist.length;i++){
      let check_null = false
      if(check_data_null(transactionlist[i])){
        res.push(linevalidate(transactionlist[i],i+1))
      }
    }
    console.log(res)
  }

	const changeHandler = (event:any) => {
		setSelectedFile(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      complete: function(results:any) {
        console.log(results)
        validate(results.data)
      }
    });
	};
  return (
    <div className='p-4'>
      <input type="file" name="file" onChange={changeHandler} />
    </div>
  );
}