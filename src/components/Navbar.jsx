import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
        <div className='logo font-bold text-2xl'>
            <span className="text-green-800">&lt;</span>
            Pass
            <span className="text-green-500">MANAGER /&gt;</span>
        </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className="hover:font-bold" href='#'>Home</a>
                <a className="hover:font-bold" href='#'>About</a>
                <a className="hover:font-bold" href='#'>Contact</a> 

            </li>
        </ul> */}
        <button className='text-white '>
          <img className='invert p-3 w-16' src='/icons/github.png' alt="github logo"/>
        </button>
        </div>
    </nav>
  )
}

export default Navbar