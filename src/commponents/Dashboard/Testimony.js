import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getTestimony,addTestimony,deleteTestimony} from '../../features/bannersSlice'
import { CloseOutline } from 'react-ionicons'
function Testimony() {
    const dispatch = useDispatch()
    const {testimony,isLoading} = useSelector(state => state.banners)
    const [images,setimages]=useState(null)
    useEffect(()=>{
        dispatch(getTestimony())
    },[])
  return (
    <div className='flex-col flex justify-center'>
        <div className='flex flex-col space-y-2 lg:justify-between space-x-1 w-full'>
            <div className='flex p-1 items-center'>
                <input type="file" accept='image/*' multiple onChange={(e)=> setimages(e.target.files)} />
                <button className='bg-green-400 text-white rounded-md px-2 font-semibold' onClick={()=>{
                    dispatch(addTestimony(images))
                    setimages(null)
                    }}>Save</button>
            </div>
            {
                isLoading&&<div className='flex justify-center'>Loading...</div>
            }
            <div className='flex flex-wrap w-[80vw] h-auto gap-4 p-4 border border-gray-400 rounded-md justify-center'>
                
                {testimony?.map(item=>(
                    <div className='relative w-48 h-48'>
                        <img src={'https://beautyshop.yashacode.com/banner/img/'+item.img} key={item.id} className="w-full h-full" />
                        <div className='absolute flex justify-center items-center cursor-pointer bg-gray-200 rounded-full top-0 right-0' onClick={()=> dispatch(deleteTestimony({id:item.id}))}>
                            <CloseOutline color={'red'} />
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    </div>
  )
}

export default Testimony