import React,{useEffect,useState} from 'react'
import axios from 'axios';

function Table() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    const pageNumbers = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
      <div className="flex justify-center my-4 text-sm">
        {currentPage > 1 && (
          <button
            className="px-3 py-1 bg-[#092468] text-white rounded"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
        )}
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(page => (
          <button
            key={page}
            className={`rounded px-3 py-1 ${currentPage === page ? 'bg-[#092468] text-white' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        {currentPage < pageNumbers && (
          <button
            className="rounded px-3 py-1 bg-[#092468] text-white"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
        <div className='flex justify-between items-center'>
            <p className='text-gray-500 text-sm font-semibold'>History of Registered cars and their owners</p>
            <button className='bg-[#092468] text-white py-2 px-6 rounded text-sm'>New Car</button>
        </div>
        <div className="container mx-auto mt-2">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-[#EDEEF3] h-12">
                        <th className="text-[#092468] px-4 py-2">ID</th>
                        <th className="text-[#092468] px-4 py-2">Title</th>
                        <th className="text-[#092468] px-4 py-2">Body</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems.map(item => (
                            <tr className="bg-[#434343] bg-opacity-[3%] border border-gray-100" key={item.id}>
                                <td className="px-4 py-2">{item.id}</td>
                                <td className="px-4 py-2">{item.title}</td>
                                <td className="px-4 py-2">{item.body}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {renderPagination()}
        </div>
    </div>
  )
}

export default Table