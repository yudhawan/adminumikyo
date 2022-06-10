import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {changeActiveSeller,upgradeSeller} from '../../features/sellers/sellersSlice'
function AllSellers({sellers,sellersLoading,option,query}) {
    const [update,setupdate]= useState({
        currentstat:'',
        refferal:'',
        status:''
    })
    const [updateshow,setupdateshow]= useState(false)
    const [validation,setvalidation]= useState('')
    function cek(){
        if(update.refferal === '' || update.status === ''){
            setvalidation('Pastikan tidak ada data yang kosong')
        }else{
            setvalidation('')
            dispatch(upgradeSeller(update))
            setupdate({
                currentstat:'',
                refferal:'',
                status:''
            })
            setupdateshow(false)
        }
    }
    const dispatch = useDispatch()
  return (
    <div className={`'flex '`}>
        {
            updateshow&&<div className='lg:w-[90vw] lg:h-[60vh] w-full h-[90vh] bg-transparent backdrop-blur-lg absolute z-10 flex flex-col justify-center items-center '>
                <div className='flex flex-col'>
                    <p className='text-sm font-semibold'>Status Saat ini</p>
                    <div className='w-60 p-1 rounded-md border border-gray-400 bg-white'><input disabled type="text" value={update.currentstat} className="w-full outline-none" /></div>
                </div>
                <div className='flex flex-col'>
                    <p className='text-sm font-semibold'>Upgrade Ke : </p>
                    <div className='w-60 p-1 rounded-md border border-gray-400 bg-white'>
                        <select className='outline-none w-full' value={update.status} onChange={(e)=>setupdate({...update,status:e.target.value})}>
                            <option>--/--</option>
                            <option value="DVIP">Distributor VIP</option>
                            <option value="DS">Distributor</option>
                            <option value="ANV">Agen</option>
                            <option value="RNV">Reseller</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <p className='text-sm font-semibold'>Refferal</p>
                    <div className='w-60 p-1 rounded-md border border-gray-400 bg-white'><input type="text" value={update.refferal} className="w-full outline-none" onChange={(e)=> setupdate({...update, refferal:e.target.value})} /></div>
                </div>
                <div className='flex space-x-2 mt-4'>
                    <button className='bg-green-500 hover:bg-green-600 rounded-md text-white px-2 py-1' onClick={cek}>Upgrade</button>
                    <button className='bg-rose-500 hover:bg-rose-600 rounded-md text-white px-2 py-1' onClick={()=>{
                        setupdate({
                            currentstat:'',
                            refferal:'',
                            status:''
                        })
                        setupdateshow(false)
                    }}>Batal</button>
                </div>
            </div>
        }
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
                    sellers?.filter(val=> val.status.toUpperCase().includes(option.toUpperCase())).filter(val => val.nama_lengkap.toLowerCase().includes(query.toLowerCase()) || val.email.toLowerCase().includes(query.toLowerCase()) || val.wa.toLowerCase().includes(query.toLowerCase())).map((seller,index)=>{
                        return seller.length===0?<tr><td colSpan='5' className='text-center'>Tidak ada data</td></tr>:
                         <tr key={index} className="flex w-full lg:w-full justify-center ">
                            <td className='h-auto w-[15vw] lg:w-[10%] '>{index+1}</td>
                            <td className='h-auto w-[50vw] lg:w-[20%]'>{seller.nama_lengkap}</td>
                            <td className='h-auto w-[85vw] lg:w-[25%]'>{seller.email}</td>
                            <td className='h-auto w-[40vw] lg:w-[20%]'>{seller.wa}</td>
                            <td className='h-auto w-[20vw] lg:w-[10%]'>{seller.status}</td>
                            <td className='h-auto w-[20vw] lg:w-[10%]'>{seller.kode_ref}</td>
                            <td className='h-auto w-[30vw] lg:w-[10%]'><div className='flex-col space-x-1'>
                                <button className='text-xs px-1 py-1 bg-orange-500 text-white' onClick={()=>{
                                    setupdate({...update,
                                        currentstat:seller.status,
                                        refferal:seller.kode_ref,
                                    })
                                    setupdateshow(true)
                                }}>Upgrade</button>
                                {(seller.verification===1)?<button className='bg-gray-200 text-gray-600 border border-gray-500 rounded-sm px-1 py-1 text-xs' onClick={()=> dispatch(changeActiveSeller({email:seller.email,verification:seller.verification}))}>Bekukan</button>:<button className='bg-green-200 text-green-600 border border-green-500 rounded-sm px-1 py-1 text-xs' onClick={()=> dispatch(changeActiveSeller({email:seller.email,verification:seller.verification}))}>Aktifkan</button>}
                            </div></td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default AllSellers