import React from 'react'
import {useDispatch} from 'react-redux'
import {changeActiveSeller} from '../../features/sellers/sellersSlice'
function AllSellers({sellers,sellersLoading,option}) {
    const dispatch = useDispatch()
    
  return (
    <div className={`'flex '`}>
        <table className='w-full text-left overflow-x-scroll'>
            <thead className='flex lg:w-[90vw] w-full bg-slate-400'>
                <tr className='flex w-full justify-center  '>
                    <th className='text-black w-[15vw]  lg:w-[10%]'>No</th>
                    <th className='text-black w-[50vw] lg:w-[20%]'>Nama</th>
                    <th className='text-black w-[85vw] lg:w-[25%]'>Email</th>
                    <th className='text-black w-[40vw] lg:w-[20%]'>WhatsApp</th>
                    <th className='text-black w-[20vw] lg:w-[10%]'>Status</th>
                    <th className='text-black w-[20vw] lg:w-[10%]'>Reff</th>
                    <th className='text-black w-[30vw] lg:w-[10%]'>Action</th>
                </tr>
            </thead>
            <tbody className='overflow-x-auto lg:overflow-x-auto lg:overflow-y-scroll w-full h-[65vh] flex flex-col'>
                {
                    sellersLoading?<tr><td colSpan='5' className='text-center'>Loading...</td></tr>:
                    sellers.filter(val=> val.status.toUpperCase().includes(option.toUpperCase())).map((seller,index)=>{
                        return seller.length===0?<tr><td colSpan='5' className='text-center'>Tidak ada data</td></tr>:
                         <tr key={index} className="flex w-full lg:w-full justify-center ">
                            <td className='h-auto w-[15vw] lg:w-[10%] '>{index+1}</td>
                            <td className='h-auto w-[50vw] lg:w-[20%]'>{seller.nama_lengkap}</td>
                            <td className='h-auto w-[85vw] lg:w-[25%]'>{seller.email}</td>
                            <td className='h-auto w-[40vw] lg:w-[20%]'>{seller.wa}</td>
                            <td className='h-auto w-[20vw] lg:w-[10%]'>{seller.status}</td>
                            <td className='h-auto w-[20vw] lg:w-[10%]'>{seller.kode_ref}</td>
                            <td className='h-auto w-[30vw] lg:w-[10%]'>{(seller.verification===1)?<button className='bg-gray-200 text-gray-600 border border-gray-500 rounded-sm px-2 py-1' onClick={()=> dispatch(changeActiveSeller({email:seller.email,verification:seller.verification}))}>Nonaktifkan</button>:<button className='bg-green-200 text-green-600 border border-green-500 rounded-sm px-2 py-1' onClick={()=> dispatch(changeActiveSeller({email:seller.email,verification:seller.verification}))}>Aktifkan</button>}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default AllSellers