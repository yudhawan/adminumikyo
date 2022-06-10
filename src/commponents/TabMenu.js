import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { HomeOutline,Home,PeopleOutline,People,CompassOutline,Compass,ExtensionPuzzleOutline,ExtensionPuzzle,BagOutline,Bag } from 'react-ionicons'
function TabMenu() {
    const navigate = useNavigate()
    const {pathname} = useLocation()
  return (
    <>
        {/* mobile */}
        <div className={`fixed z-50 flex bottom-0 left-0 w-full h-16 lg:hidden bg-[#0069FF] border-t border-gray-500 justify-between items-center px-4`}>
            
            <div className='flex flex-col justify-center items-center text-white' onClick={()=> navigate('/')}>
                {(pathname==='/')?<Home color={'white'} width="2rem" height="2rem" />:<HomeOutline color={'white'} width="2rem" height="2rem" />}
                <p className={`${(pathname==='/')?'font-semibold':''}`}>Home</p>
            </div>
            <div className='flex flex-col justify-center items-center text-white' onClick={()=> navigate('/products')}>
                {(pathname==='/products')?<Compass color={'white'} width="2rem" height="2rem" />:<CompassOutline color={'white'} width="2rem" height="2rem" />}
                <p className={`${(pathname==='/products')?'font-semibold':''}`}>Products</p>
            </div>
            <div className='flex flex-col justify-center items-center text-white' onClick={()=> navigate('/categories')}>
                {(pathname==='/categories')?<ExtensionPuzzle color={'white'} width="2rem" height="2rem" />:<ExtensionPuzzleOutline color={'white'} width="2rem" height="2rem" />}
                <p className={`${(pathname==='/categories')?'font-semibold':''}`}>Categories</p>
            </div>
            <div className='flex flex-col justify-center items-center text-white relative' onClick={()=> navigate('/orders')}>
                {/* <div className='absolute text-xs rounded-full bg-rose-700 px-1 -mr-6 top-0'>3</div> */}
                {(pathname==='/orders')?<Bag color={'white'} width="2rem" height="2rem" />:<BagOutline color={'white'} width="2rem" height="2rem" />}
                <p className={`${(pathname==='/orders')?'font-semibold':''}`}>Orders</p>
            </div>
            <div className='flex flex-col justify-center items-center text-white relative' onClick={()=> navigate('/sellers')}>
                {/* <div className='absolute text-xs rounded-full bg-rose-700 px-1 -mr-6 top-0'>3</div> */}
                {(pathname==='/sellers')?<People color={'white'} width="2rem" height="2rem" />:<PeopleOutline color={'white'} width="2rem" height="2rem" />}
                <p className={`${(pathname==='/sellers')?'font-semibold':''}`}>Sellers</p>
            </div>
        </div>
        {/* --/-- */}
        {/* desktop */}
        <div className='hidden fixed left-0 top-[4.2rem] lg:flex w-full h-14 justify-center items-center '>
            <div className='flex rounded-sm bg-[#FF7F51] py-1 px-4 space-x-5'>
                <div className='cursor-pointer flex space-x-1 justify-center items-center text-white' onClick={()=> navigate('/')}>
                    {(pathname==='/')?<Home color={'white'} width="30px" height="30px" />:<HomeOutline color={'white'} width="30px" height="30px" />}
                    <p className={`${(pathname==='/')?'font-semibold':''}`}>Home</p>
                </div>
                <div className='cursor-pointer flex space-x-1 justify-center items-center text-white' onClick={()=> navigate('/products')}>
                    {(pathname==='/products')?<Compass color={'white'} width="30px" height="30px" />:<CompassOutline color={'white'} width="30px" height="30px" />}
                    <p className={`${(pathname==='/products')?'font-semibold':''}`}>Products</p>
                </div>
                <div className='cursor-pointer flex space-x-1 justify-center items-center text-white' onClick={()=> navigate('/categories')}>
                    {(pathname==='/categories')?<ExtensionPuzzle color={'white'} width="30px" height="30px" />:<ExtensionPuzzleOutline color={'white'} width="30px" height="30px" />}
                    <p className={`${(pathname==='/categories')?'font-semibold':''}`}>Categories</p>
                </div>
                <div className='cursor-pointer flex space-x-1 justify-center items-center text-white relative' onClick={()=> navigate('/orders')}>
                    {/* <div className='absolute text-xs rounded-full bg-rose-700 px-1 -mr-24 top-0'>3</div> */}
                    {(pathname==='/orders')?<Bag color={'white'} width="2rem" height="2rem" />:<BagOutline color={'white'} width="2rem" height="2rem" />}
                    <p className={`${(pathname==='/orders')?'font-semibold':''}`}>Orders</p>
                </div>
                <div className='cursor-pointer flex space-x-1 justify-center items-center text-white relative' onClick={()=> navigate('/sellers')}>
                    {/* <div className='absolute text-xs rounded-full bg-rose-700 px-1 -mr-24 top-0'>3</div> */}
                    {(pathname==='/sellers')?<People color={'white'} width="30px" height="30px" />:<PeopleOutline color={'white'} width="30px" height="30px" />}
                    <p className={`${(pathname==='/sellers')?'font-semibold':''}`}>Sellers</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default TabMenu