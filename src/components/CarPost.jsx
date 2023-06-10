import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CarPost = () => {
  const [modelName, setModelName] = useState('');
  const [price, setPrice] = useState('');
  const [owner, setOwner] = useState('');
  const [manufactureYear, setManufactureYear] = useState('');
  const [manufactureCompany, setManufactureCompany] = useState('');
  const [loading, setLoading] = useState(false);

  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!modelName || !price || !owner || !manufactureYear || !manufactureCompany) {
      toast.error('Please provide all the required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/vehicle`, {
        manufactureCompany,
        manufactureYear,
        price,
        modelName,
        owner,
      },config);

      if (response.data.success) {
        toast.success('Car registered successfully');
        setModelName('');
        setPrice('');
        setOwner('');
        setManufactureYear('');
        setManufactureCompany('');
      } else {
        toast.error('Car registration failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    }

    setLoading(false);
  };

  return (
    <div className="pb-12">
      <ToastContainer />
      <div className="flex flex-col items-center mt-8 border w-[35vw] mx-auto py-8 px-16">
        <h1 className="font-black text-black mb-4 text-xl">Car Registration</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <input
              type="text"
              id="modelName"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Model Name"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="number"
              id="price"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="owner"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="number"
              id="manufactureYear"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Manufacture Year"
              value={manufactureYear}
              onChange={(e) => setManufactureYear(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <input
              type="text"
              id="manufactureCompany"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Manufacture Company"
              value={manufactureCompany}
              onChange={(e) => setManufactureCompany(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-[70%] mb-6 flex justify-center mx-auto text-sm px-4 py-3 text-white bg-blue-800 rounded-3xl hover:bg-blue-700"
            style={{ backgroundColor: '#092468' }}
            disabled={loading}
          >
            {loading ? 'Registering Car...' : 'Register Car'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarPost;
