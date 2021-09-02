/**
 * banks.js
 * List of banks and useful get specific bank functions
 */

 export const banks = [
    { code: 2, abbr: 'BBLA', name: 'กรุงเทพ' },
    { code: 4, abbr: 'KBNK', name: 'กสิกรไทย' },
    { code: 6, abbr: 'KTBA', name: 'กรุงไทย' },
    { code: 11, abbr: 'TMBA', name: 'ทหารไทย' },
    { code: 14, abbr: 'SCB', name: 'ไทยพาณิชย์' },
    { code: 22, abbr: 'CIMBT', name: 'ซีไอเอ็มบีไทย' },
    { code: 24, abbr: 'UOBT', name: 'ยูโอบี' },
    { code: 25, abbr: 'BAYA', name: 'กรุงศรีอยุธยา' },
    { code: 30, abbr: 'GSBA', name: 'ออมสิน' },
    { code: 33, abbr: 'GHBA', name: 'อาคารสงเคราะห์' },
    { code: 34, abbr: 'BAAC', name: 'ธกส' },
    { code: 35, abbr: 'EXIM', name: 'สกต.' },
    { code: 65, abbr: 'TBNK', name: 'ธนชาต' },
    { code: 66, abbr: 'ISBTA', name: 'อิสลามแห่งประเทศไทย' },
    { code: 67, abbr: 'TISCO', name: 'ทิสโก้' },
    { code: 69, abbr: 'KKPA', name: 'เกียรตินาคิน' },
    { code: 70, abbr: 'ICBCTA', name: 'ไอซีบีซี (ไทย)' },
    { code: 71, abbr: 'TCDA', name: 'ไทยเครดิตเพื่อรายย่อย' },
    { code: 73, abbr: 'LHFGA', name: 'แลนด์ แอนด์ เฮาส์' },
    { code: 98, abbr: 'SMEA', name: 'ธพว.' },
    { code: 99, abbr: 'OTHER', name: 'อื่นๆ' },
  ];
  
  /**
   * Returns the specific bank information from bank code
   * @param {number} code - The bank code
   * @returns {Object} - The bank information
   */
  export const getBankFromCode = (code:any) => banks.find((bank) => bank.code === code);
  
  /**
   * Returns the specific bank information from bank abbreviation
   * @param {string} abbr - The bank abbreviation
   * @returns {Object} - The bank information
   */
  export const getBankFromAbbr = (abbr:any) => banks.find((bank) => bank.abbr === abbr.toUpperCase());