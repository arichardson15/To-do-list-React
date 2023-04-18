export default function Test() {

   function ajaxTest()
   {
      axios.get('/ajax-test?name=John')
         .then(response => {
            console.log(response.data);
         })
         .catch(error => {
            console.log(error);
         });
   }

   return (
      <div className="py-12">
         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
               <div className="p-6 text-gray-900">Welcome to the test page</div>
               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={ajaxTest}>Ajax Test</button>
            </div>
         </div>
      </div>
   );
}