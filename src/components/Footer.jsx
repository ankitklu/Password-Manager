import React from 'react';

const Footer = () => {
  return (
    <>
      <div className='bg-slate-800 w-full h-40 flex flex-col justify-center items-center bottom-0'>
        <div className='logo font-bold text-2xl text-white'>
          <span className="text-green-800">&lt;</span>
          Pass
          <span className="text-green-500">MANAGER /&gt;</span>
        </div>
        <div className='text-white'>Created by Ankit Kumar Mishra</div>
      </div>
    </>
  );
};

export default Footer;
