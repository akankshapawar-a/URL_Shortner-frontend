import React, { useState } from 'react';
import axios from 'axios';
// import { navigate } from '@reach/router';
import isURL from 'validator/lib/isURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const Home = () => {
    const [longUrl, setLongUrl] = useState('');
    const [error, setError] = useState(null);
    const[shorturl,setShortUrl]=useState('');
    const [hoveredIcon , setHoveredIcon]=useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!longUrl) {
            toast.error('Please Enter a Long URL');
            setError('Please Enter a Long URL');
            setShortUrl('');
            return;
        }

        if(!isURL(longUrl)){
            toast.error('Invalid URL');

            setError('Invalid URL');
            setShortUrl('');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/shorten', { longUrl });
            setShortUrl(response.data.shortUrl);
            setError(null);
            toast.success('URL shortened successfully!');

            // navigate(`/result/${response.data.shortUrl}`);
        } catch (err) {
            setError('Error generating short URL');
            setShortUrl('');
            toast.error('Error generating short URL');

        }
    };

    return (
        <>
<div className=" min-h-screen bg-[#737485] text-gray-900 flex justify-center">
  <div className=" max-w-screen-sm m-0 sm:m-10   bg-gray-400 sm:rounded-lg flex justify-center flex-1">
  <div className='w-10/12'>
            <h1 className='text-white font-bold text-3xl mt-20 text-center '>URL Shortener</h1>
            <form onSubmit={handleSubmit} className='mt-5 '>
                <label className=' text-md font-bold text-white '>Enter Long URL:</label>
                <input
                    type="text"
                    className='rounded-md w-full py-2  text-black  bg-gray-100 shadow-md outline-blue-700 mt-1 placeholder-gray-400 '
                    value={longUrl}
                    placeholder=' http://www.google.com'
                  
                    onChange={(e) => setLongUrl(e.target.value)}
                    
                />
                <div className='flex justify-center mt-4'>
    <button type="submit" className='bg-blue-600 hover:bg-blue-800 font-bold py-2 px-12 rounded-md text-white'>Shorten URL</button>
</div>

            </form>
        {/* <div className='flex justify-center'>
      <p className='mt-6 text-white font-bold text-center mr-3'>Short URL :</p>  <p className='mt-6 text-lime-400 font-bold text-center'><a href={shorturl} target='_blank'> {shorturl}</a> </p>
            {error && <p className='font-bold text-red-600'>{error}</p>}
        </div> */}
        {shorturl && (<>
             <div >
             {/* <p className='mt-8 text-white  font-bold text-center mr-3'>Short URL :</p>  <p className='mt-6 text-black border-2 py-2 px-1 rounded-md bg-white border-white font-bold text-center'><a href={shorturl} target='_blank'> {shorturl}</a> </p> */}
             <p className='mt-4 text-white  font-bold'>Short URL :</p> 
        
              <p className='mt-1  text-black border-2 py-1  px-2 flex space-x-10 rounded-md bg-white border-white  w-full  '><a href={shorturl} target='_blank'> {shorturl}</a> 
              <div className='w-full '>
             <CopyToClipboard text={shorturl} onCopy={()=>toast.success('URL copied to clipboard')}  >
                <div  className=' cursor-pointer float-right '
                onMouseEnter={()=>setHoveredIcon('copy to clipboard')}
                onMouseLeave={()=>setHoveredIcon(null)}
                >

                    <span className={`absolute ml-4 mt-8 bg-white rounded-md border border-black p-2 text-xs text-black ${hoveredIcon==='copy to clipboard' ? 'scale-100' :'hidden'}`}>copy to clipboard </span>
                    <svg  xmlns="http://www.w3.org/2000/svg"  className=" float-right cursor-pointer" width="28"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
                </div></CopyToClipboard>
                </div>
             </p> 
         
            {/* <CopyToClipboard text={shorturl} onCopy={()=>toast.success('URL copied to clipboard')} >
                <div  className='mt-8 ml-2 cursor-pointer '
                onMouseEnter={()=>setHoveredIcon('copy to clipboard')}
                onMouseLeave={()=>setHoveredIcon(null)}
                >
                    <span className={`absolute  ml-2 mt-8 bg-white rounded-md border border-black p-2 text-xs text-black ${hoveredIcon==='copy to clipboard' ? 'scale-100' :'hidden'}`}>copy to clipboard </span><svg  xmlns="http://www.w3.org/2000/svg"  width="28"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
                </div></CopyToClipboard>
            */}

                   {error && <p className='font-bold text-red-600'>{error}</p>}
               </div>
                        <div className='text-center mt-3'>
                            <button 
                           className='bg-blue-600 hover:bg-blue-800 font-bold py-2 px-4 rounded-md text-white'                
                                onClick={() => {
                                    setLongUrl('');
                                    setShortUrl('');
                                    setError(null);
                                }}
                            >
                                Shorten Another URL
                            </button>
                            </div>
                            </>
                    )}
                     <ToastContainer autoClose={1000} position='top-center' />
        </div>
      
  </div>
</div>
</>
    );
};

export default Home;



