import React from 'react'
import {useDispatch} from 'react-redux'
import {acceptSeller,deleteSellers} from '../../features/sellers/sellersSlice'
function NewSellers({sellers,sellersLoading,query}) {
    const dispatch = useDispatch()
  return (
    <div className={`'flex'`}>
        <table className='w-full text-left overflow-x-scroll'>
            <thead className='flex lg:w-[90vw] w-full bg-slate-400'>
                <tr className='flex w-full justify-center  '>
                    <th className='text-black w-[15vw]  lg:w-[10%]'>No</th>
                    <th className='text-black w-[50vw] lg:w-[20%]'>Nama</th>
                    <th className='text-black w-[85vw] lg:w-[30%]'>Email</th>
                    <th className='text-black w-[40vw] lg:w-[30%]'>WhatsApp</th>
                    {/* <th className='text-black w-[20vw] lg:w-[10%]'>Status</th> */}
                    <th className='text-black w-[30vw] lg:w-[10%]'>Action</th>
                </tr>
            </thead>
            <tbody className='overflow-x-auto lg:overflow-x-auto lg:overflow-y-scroll w-full h-[65vh] flex flex-col'>
                {
                    sellersLoading?<tr><td colSpan='5' className='text-center'>Loading...</td></tr>:
                    sellers.filter(val => val.nama_lengkap.toLowerCase().includes(query.toLowerCase())).filter(val => val.verification==0).filter(val => (val.status.includes('DVIP'))|(val.status.includes('DS'))).map((seller,index)=>{
                        return seller.length===0?<tr><td colSpan='6' className='text-center'>Tidak ada data</td></tr>:
                         <tr key={index} className="flex text-left w-full">
                            <td className='h-auto w-[15vw] lg:w-[10%] '>{index+1}</td>
                            <td className='h-auto w-[50vw] lg:w-[20%]'>{seller.nama_lengkap}</td>
                            <td className='h-auto w-[85vw] lg:w-[30%]'>{seller.email}</td>
                            <td className='h-auto w-[40vw] lg:w-[30%]'>{seller.wa}</td>
                            {/* <td className='h-auto w-[20vw] lg:w-[10%]'>{seller.status}</td> */}
                            <td className='h-auto w-[30vw] lg:w-[10%] flex space-x-1'>
                                <button className='bg-green-200 border border-green-500 text-green-500 rounded-sm p-1' onClick={()=> dispatch(acceptSeller({id:seller.id, status:seller.status}))}>Accept</button>
                                <button className='bg-rose-200 border border-rose-500 text-rose-500 rounded-sm p-1' onClick={()=> dispatch(deleteSellers({id:seller.id}))}>Delete</button>
                            </td>
                            
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default NewSellers