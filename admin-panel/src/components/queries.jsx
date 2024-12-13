import { useState,useEffect } from "react";
import axios from "axios"


function Queries() {


    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://backend-newton-capstone-eval.onrender.com/AskQuery/queries", {
                    headers: {
                        "ngrok-skip-browser-warning": true
                    }
                });
                console.log(response.data.msg);

                
                if (response.data && response.data.msg) {
                    setTableData(response.data.msg); 
                
                }
            } catch (error) {
                const errorMessage = error.response 
                    ? `Error ${error.response.status}: ${error.response.data}`
                    : "Failed to fetch data. Please check your network connection.";
                setError(errorMessage);
                setTableData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const [showTooltipId, setShowTooltipId] = useState(null);
    


    return(
        <>
         {!loading ?  
        
           ( <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-[60px] mx-[120px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    
                        <th scope="col" className="px-6 py-3">Student name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3 text-center">Query</th>
                        <th scope="col" className="px-6 py-3 text-center">Your Reply</th>
                        <th scope="col" className="px-6 py-3 text-center">Send Email</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map(item => (
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.name}
                        </th>
                        <td className="px-2 py-2">{item.email}</td>
                       
                        <td className="px-2 py-2">
                        <div className="flex justify-center items-center">
                        <div className="flex justify-center items-center">
                                        <div className="relative inline-block" >
                                            <div
                                                className="text-blue-600 border-b-2 border-dotted cursor-pointer"
                                                onMouseEnter={() => setShowTooltipId(item.id)}
                                                onMouseLeave={() => setShowTooltipId(null)}
                                            >
                                                Show Query
                                            </div>
                                            {showTooltipId === item.id && (
                                                <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-[350px] bg-black text-white text-center rounded p-2 z-10 mr-2">
                                                    <span className="absolute top-1/2 right-full transform -translate-y-1/2 border-transparent border-5 border-r-black"></span>
                                                    {item.query}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                            </div>
                        </td>
                        
                        <td className="px-2 py-2 text-center">{item.feedback ? <div>{item.feedback}</div> : <button>Reply</button>}</td>
                        
                            <td className="px-2 py-2">
                                <div className='flex items-center justify-center'>
                                    <button>Send</button>
                                    </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
    ) : ( <div className="flex items-center justify-center h-[600px]">Loading data, please wait...</div> )}
        {error && <div className="error flex items-center justify-center h-[600px]">{error}</div>}    
        </>
    );
}

export default Queries;