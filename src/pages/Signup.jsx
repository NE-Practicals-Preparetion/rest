import { useState } from 'react';
import axios from 'axios';
import {API_URL} from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  //form inputs states
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    //handling form submit
    const handleSubmit = async (e) => {
      e.preventDefault();
      //check if all fields are provided
      if (!fullName || !nationalId || !phone || !password || !email || !confirmPassword ) {
        toast("Provide all fields",{
          position: "top-right",
          hideProgressBar : false,
          // theme: "dark",
          type: "error",
          closeOnClick: true,
        })
        return;
      }
      //check if passwords match
      if (password !== confirmPassword) {
          toast("Passwords don't match",{
            position: "top-right",
            hideProgressBar : false,
            // theme: "dark",
            type: "error",
            closeOnClick: true,
          })
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post(API_URL+'/user/register', {
          names: fullName,
          phoneNumber: phone,
          email,
          password,
          reEnterPassword:confirmPassword,
          nationalID: nationalId,
        });
        if (response?.data?.message === 'user created successfully') {
          toast("Successfully created your account",{
            position: "top-right",
            hideProgressBar : false,
            // theme: "dark",
            type: "success",
            closeOnClick: true,
          })
          //clear form inputs
          setEmail('');
          setPassword('');
          setNationalId('');
          setFullName('');
          setConfirmPassword('');
          setPhone('');
    
          setLoading(false);
          //redirect to login
          navigate('/login');
        }
        else{
          toast(response?.data?.message,{
            position: "top-right",
            hideProgressBar : false,
            // theme: "dark",
            type: "error",
            closeOnClick: true,
          })
        }
      } catch (error) {
        console.log('catch error', error);
        setLoading(false);
        toast(error?.message || "An error occured",{
          position: "top-right",
          hideProgressBar : false,
          // theme: "dark",
          type: "error",
          closeOnClick: true,
        })
      }
    };

  return (
    <div className='pb-12'>
      <ToastContainer/>
      <h1 className='text-xl text-[#092468] font-black text-center my-12'>App Title</h1>
      <div className="flex flex-col items-center mt-8 border w-[35vw] mx-auto py-8 px-16">
        <h1 className='font-black text-black mb-4 text-xl'>Create account</h1>
        <p className='text-xs font-light text-gray-400 mb-8'>Lorem ipsum doret sit amet caret dovisindus il qeuoreimsi.</p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <input
              type="text"
              id="fullname"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Fullnames"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="fullname"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="National Id"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="tel"
              id="phone"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              id="password"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-[70%] mb-6 flex justify-center mx-auto text-sm px-4 py-3 text-white bg-blue-800 rounded-3xl hover:bg-blue-700"
            style={{ backgroundColor: '#092468' }}>{loading ? 'Creating account...' : 'Signup'}</button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account? <a className='text-[#092468] font-bold' href="/login">Signin</a>.
        </p>
      </div>
    </div>
  );
};

export default Signup;
