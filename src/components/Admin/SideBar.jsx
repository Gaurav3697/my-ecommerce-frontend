import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TableRowsIcon from '@mui/icons-material/TableRows';
import NotificationsIcon from '@mui/icons-material/Notifications';

const SideBar = () => {
  const SideButtons = (svg,title,hre) => {
    <li>
      <a aria-current="page" className="active" href="#">
        <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" type="button">
          < ${...svg} />
          <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">${title}</p>
        </button>
      </a>
    </li>
  }

  return (
    <div className='hidden h-screen md:flex flex-col gap-10 w-1/5 border-slate-200'>
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 ml-4 w-full rounded-xl transition-transform duration-300 xl:translate-x-0 h-full">
        <div className="relative border-b border-white/20">
          <a className="flex items-center gap-4 py-6 px-8" href="#/">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">Dashboard</h6>
          </a>
          {/* <button className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </span>
            </button> */}
        </div>

        {/* side buttons */}
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
            <li>
              <a aria-current="page" className="active" href="#">
                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" type="button">
                  <HomeIcon/>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">dashboard</p>
                </button>
              </a>
            </li>
            <li>
              <a className="" href="#">
                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                  <AccountCircleIcon/>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">profile</p>
                </button>
              </a>
            </li>
            <li>
              <a className="" href="#">
                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                  <TableRowsIcon/>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">tables</p>
                </button>
              </a>
            </li>
            <li>
              <a className="" href="#">
                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                  <NotificationsIcon/>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">notifactions</p>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar