import { useEffect,useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import AllSellers from '../commponents/sellers/AllSellers'
import NewSellers from '../commponents/sellers/NewSellers'
import {getSellers} from '../features/sellers/sellersSlice'
function Sellers() {
  const [selected,setselected] = useState('All')
  const [option,setoption] = useState('')
  const dispatch = useDispatch()
  const {sellers,sellersLoading} = useSelector(state => state.sellers)
  // useEffect(()=>{},[selected])
  useEffect(()=>{
      dispatch(getSellers())
  },[])
  return (
    <div className='flex flex-col lg:justify-center lg:items-center lg:border lg:border-gray-200 lg:rounded-sm w-full h-[80vh] space-y-2'>
      <div className='flex flex-wrap space-x-1 lg:space-x-2 mt-2 lg:mt-0'>
        <div className='lg:px-2 lg:py-1 p-1 border border-gray-400 rounded-sm flex space-x-1 lg:space-x-2' >
          <div onClick={()=>setselected('All')} className={`p-1 text-sm lg:text-base rounded-sm hover:bg-gray-400 hover:text-white cursor-pointer ${(selected==='All')?'bg-gray-500 text-white':'bg-none'}`} >All Sellers</div>
          <div onClick={()=>setselected('New')} className={`p-1 text-sm lg:text-base rounded-sm hover:bg-gray-400 hover:text-white cursor-pointer ${(selected==='New')?'bg-gray-500 text-white':'bg-none'}`} >New Sellers</div>
        </div>
        <div className='flex items-center justify-center border border-gray-400 rounded-sm p-1'>
          <select onChange={(e)=>setoption(e.target.value)} value={option} className="outline-none w-full text-sm lg:text-base">
            <option value="" disabled selected>Filter by Status</option>
            <option value="DVIP" >Distributor VIP</option>
            <option value="DS" >Distributor</option>
            <option value="ANV" >Agen</option>
            <option value="RNV" >Reseller</option>
          </select>
        </div>
        {option&&<button onClick={()=>setoption('')} className='lg:bg-orange-200 lg:border text-sm lg:text-base lg:border-orange-400 text-orange-500 lg:p-1 rounded-sm'>Reset Filter</button>}
      </div>
      {(selected==='All')?<AllSellers sellers={sellers} option={option} sellersLoading={sellersLoading} />:<NewSellers sellers={sellers} option={option} sellersLoading={sellersLoading}/>}
    </div>
  )
}

export default Sellers