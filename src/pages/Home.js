import { useState } from "react"
import Banners from "../commponents/Dashboard/Banners"
import Testimony from "../commponents/Dashboard/Testimony"
function Home() {
  const [tab,settab]=useState('banners')
  
  return (
    <div className='flex overflow-y-auto flex-col lg:items-center lg:border lg:border-gray-200 lg:rounded-sm w-full h-auto lg:h-[75vh] mb-[4.5rem] lg:mb-5 space-y-2 items-center'>
      <div className="mt-2 flex w-auto p-1 border-rose-200 border space-x-2 justify-center items-center">
        <div className={(tab==='banners')?'text-white bg-rose-500 cursor-pointer px-1':'text-rose-500 bg-white hover:bg-rose-200 cursor-pointer px-1'} onClick={()=>settab('banners')}>Banners</div>
        <div className={(tab==='testimony')?'text-white bg-rose-500 cursor-pointer px-1':'text-rose-500 bg-white hover:bg-rose-200 cursor-pointer px-1'} onClick={()=>settab('testimony')}>Testimony</div>
      </div>
      {tab==='banners'&&<Banners/>}
      {tab==='testimony'&&<Testimony/>}
    </div>
  )
}

export default Home