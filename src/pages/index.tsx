import Papa from "papaparse";

export default function Home() {
  var data;
  Papa.parse('test.csv', {
    delimiter: "",
  header: true,
  dynamicTyping: true,
  complete: function(results:any) {
    console.log(results);
    data = results.data;
  }
});
  return (
    <div className='p-4'>
      <h1>Hello</h1>
      <div className='text-red-600'>Welcome!</div>
    </div>
  );
}