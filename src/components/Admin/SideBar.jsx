import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Link } from 'react-router-dom';

const SideButtons = ({svg, title,href}) => {
    return(
    <li>
      {/* className="active" when clicked */}
      <Link to={href} aria-current="page" className =""> 
        <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" type="button">
          {svg}
          <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">{title}</p>
        </button>
      </Link>
    </li>
    )
  }
  
const SideBar = () => {
  return (
    <div className='hidden h-screen md:flex flex-col gap-10 w-1/5 border-slate-200 bg-white'>
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 w-1/5 rounded-xl transition-transform duration-300 xl:translate-x-0 h-full fixed bg-white">
        <div className="relative border-b border-white/20">
          <a className="flex items-center gap-4 py-6 px-8" href="#/">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">Dashboard</h6>
          </a>
        </div>

        {/* side buttons */}
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-5">
            <SideButtons svg={<HomeIcon />} title="Products" href="/admin/Products" />
            <SideButtons svg={<AccountCircleIcon />} title="Customers" href="/admin/Customers" />
            <SideButtons svg={<TableRowsIcon />} title="Orders" href="/admin/Orders"/>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar