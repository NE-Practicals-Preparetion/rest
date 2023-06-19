import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, config } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Table() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);   //page number to start from 1
  const [itemsPerPage] = useState(2);    //number of items per page to be 3
  const [selectedItem, setSelectedItem] = useState(null);
  const [pageNumbers, setPageNumbers] = useState(1);  //number of pages to start from 1
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/vehicle/${currentPage}/${itemsPerPage}`, config);
      // console.log(response,"response")
      setData(response?.data?.data?.vehicles);   //populate the data array with the response data vehicles
      setPageNumbers(response?.data?.data?.totalPages);  //populate the pageNumbers array with the response data total pages
    } catch (error) {
      console.log(error);
    }
  };

  // Handle edit action for an item
  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  // Handle delete action for an item
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/vehicle/${itemId}`,config);
      setData(data.filter((item) => item.id !== itemId));
      toast.success('Item deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'An error occurred while deleting the item');
    }
  };

  // Close the editing modal
  const handleModalClose = () => {
    setSelectedItem(null);
  };

  // Save the changes made to an item
  const handleSave = async (updatedItem) => {
    try {
      // console.log(updatedItem,"updatedItem")
      const response = await axios.put(`${API_URL}/vehicle/${updatedItem._id}`, {
        vehiclePlateNumber: updatedItem.vehiclePlateNumber,
        manufactureCompany: updatedItem.manufactureCompany,
        manufactureYear: updatedItem.manufactureYear,
        price: updatedItem.price,
        chasisNumber: updatedItem.chasisNumber,
        modelName: updatedItem.modelName,
        owner: updatedItem.owner._id,
      }, config);
      // console.log(response,"responseupdate")
      const updatedData = data.map((item) => (item._id === updatedItem._id ? response.data.data.vehicle : item));
      // console.log(updatedData,"upddata")
      setData(updatedData);
      handleModalClose();
      toast.success('Item updated successfully');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'An error occurred while updating the item');
    }
  };

  // Open the new car popup
  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  // Close the new car popup
  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // Handle addition of a new car
  const handleCarAdded = (newCar) => {
    setData([...data, newCar]);
    handlePopupClose();
  };

  // Render the pagination buttons
  const renderPagination = () => {
    // const pageNumbers = Math.ceil(data.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
      <div className="flex justify-center my-4 text-sm">
        {currentPage > 1 && (
          <button
            className="px-3 py-1 bg-[#4370e1] text-white rounded"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
        )}
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map((page) => (
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
            className="rounded px-3 py-1 bg-[#4370e1] text-white"
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
        <ToastContainer />
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm font-semibold">
          History of Registered cars and their owners
        </p>
        <button
          className="bg-[#092468] text-white py-2 px-6 rounded text-sm"
          onClick={handlePopupOpen}
        >
          New Car
        </button>
      </div>
      <div className="overflow-x-auto max-w-full md:mx-auto mt-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#EDEEF3] h-12">
              <th className="text-[#092468] px-4 py-2 text-start">Model Name</th>
              <th className="text-[#092468] px-4 py-2 text-start">Price</th>
              <th className="text-[#092468] px-4 py-2 text-start">Owner</th>
              <th className="text-[#092468] px-4 py-2 text-start">Manufacture Year</th>
              <th className="text-[#092468] px-4 py-2 text-start">Manufacture Company</th>
              <th className="text-[#092468] px-4 py-2 text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              // .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((item) => (
                <tr className="bg-[#434343] bg-opacity-[3%] border border-gray-100" key={item._id}>
                  <td className="px-4 py-2">{item.modelName}</td>
                  <td className="px-4 py-2">{item.price}</td>
                  <td className="px-4 py-2">{item?.owner?.names}</td>
                  <td className="px-4 py-2">{item.manufactureYear}</td>
                  <td className="px-4 py-2">{item.manufactureCompany}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 underline mr-2" onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button className="text-red-500 underline" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>

        </table>
        {renderPagination()}
      </div>

      {/* Editing Modal */}
      {selectedItem && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-[35vw] h-[60vh] p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Edit Item</h2>
            <div className="space-y-4 flex flex-col mb-2">
              <input
                type="text"
                value={selectedItem.modelName}
                placeholder="Model Name"
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, modelName: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="text"
                value={selectedItem.price}
                placeholder="Price"
                onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="text"
                value={selectedItem?.owner?.names}
                placeholder="Owner"
                onChange={(e) => setSelectedItem({ ...selectedItem, owner: e.target.value })}
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="text"
                value={selectedItem.manufactureYear}
                placeholder="Manufacture Year"
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, manufactureYear: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="text"
                value={selectedItem.manufactureCompany}
                placeholder="Manufacture Company"
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, manufactureCompany: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                onClick={() => handleSave(selectedItem)}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Adding Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-[35vw] h-[60vh] p-8 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">New Car</h2>
            <div className="space-y-4 flex flex-col mb-2">
              <input
                type="text"
                placeholder="Model Name"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                placeholder="Price"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                placeholder="Owner"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                placeholder="Manufacture Year"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                placeholder="Manufacture Company"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                onClick={() => handleCarAdded({})}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={handlePopupClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
