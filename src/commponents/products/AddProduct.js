import React, { useEffect, useState } from 'react'
import {getCategories} from '../../features/products/categoriesSlice'
import {useDispatch, useSelector} from 'react-redux'
function AddProduct({handleAddBack}) {
    const dispatch = useDispatch()
    const { categories,categoriesLoading } = useSelector(state=>state.categories)
    const [images,setimages] = useState()
    const [picture,setpicture] = useState([])
    const [product,setproduct] = useState({
        product_name: '',
        category: '',
        stock: '',
        sub: '',
        price: '',
        description: '',
        grosir_min: '',
        grosir_price: '',
    })
    useEffect(()=>{
        dispatch(getCategories())
      },[])
    return (
        <div className='flex flex-col items-center w-full '>
            <div className='flex mt-2 font-semibold font-sans text-2xl text-gray-500'>Add Product</div>
            <div className='flex justify-between w-full px-2 lg:px-20'>
                <div onClick={handleAddBack} className='cursor-pointer rounded-md bg-gray-500 px-1 lg:font-semibold lg:text-lg lg:px-2 text-white hover:bg-gray-700'>Back</div>
                <div onClick={handleAddBack} className='cursor-pointer rounded-md bg-green-500 px-1 lg:font-semibold lg:text-lg lg:px-2 text-white hover:bg-green-700'>Add</div>
            </div>
            <div className='flex flex-col px-2 lg:flex-row justify-start lg:space-x-16 mt-5 w-full lg:px-10'>
            <div className='lg:flex-col lg:flex lg:space-y-2 space-y-1 lg:w-1/2 w-3/4 '>
                <div className='rounded-md px-2 py-1 border border-gray-400'><input className='outline-none' placeholder='Nama Product' type="text" value={product.product_name} onChange={(e)=> setproduct({...product, product_name:e.target.value})} /></div>
                <div className='rounded-md px-2 py-1 border border-gray-400'><input className='outline-none' placeholder='Stock' type="number" value={product.stock} onChange={(e)=> setproduct({...product, stock:e.target.value})} /></div>
                <div className='rounded-md px-2 py-1 border border-gray-400'><input className='outline-none' placeholder='Harga' type="number" value={product.price} onChange={(e)=> setproduct({...product, price:e.target.value})} /></div>
                <div className='flex-col'>
                <div>Category</div>
                <div className='rounded-md px-2 py-1 border border-gray-400'>
                    <select className='w-full' onChange={(e)=>setproduct({...product, category:e.target.value})}>
                    {
                        categories&&categories.map(category=>{
                        return <option key={category.id} value={category.category}>{category.category}</option>
                        })
                    }
                    </select>
                </div>
                </div>
                <div className='flex-col'>
                <div>Sub Category</div>
                <div className='rounded-md px-2 py-1 border border-gray-400'>
                    <select className='w-full' onChange={(e)=>setproduct({...product, sub:e.target.value})}>
                    {
                        categories&&categories.filter(val => val.category===product.category)[0]?.['sub_categories']?.map((sub,index)=>{
                        return <option key={index} value={sub.sub}>{sub.sub}</option>
                        })
                    }
                    </select>
                </div>
                </div>
                <textarea className='w-full h-40 border border-gray-400 p-1' value={product.description} placeholder="Deskripsi" onChange={(e)=> setproduct({...product, description:e.target.value})} />
                
            </div>
            <div className='lg:flex-col lg:flex lg:space-y-2 space-y-1 lg:w-1/2 w-3/4 '>
                <div className='rounded-md px-2 py-1 border border-gray-400'><input className='outline-none' placeholder='Minimal Grosir' type="number" value={product.grosir_min} onChange={(e)=> setproduct({...product, grosir_min:e.target.value})} /></div>
                <div className='rounded-md px-2 py-1 border border-gray-400'><input className='outline-none' placeholder='Harga Grosir' type="number" value={product.grosir_price} onChange={(e)=> setproduct({...product, grosir_price:e.target.value})} /></div>
                <div className='flex-col'>
                <div>Images</div>
                <div className={`rounded-md px-1 py-1 flex-col overflow-y-auto ${(picture.length>0)?'border border-gray-400 w-52 h-44':''}`}>
                    
                    {
                        
                        picture?.map(val => <div className='w-40 h-40 mx-1 my-1'><img src={val} className="w-full h-full" /></div>)
                
                    }
                    
                </div>
                <input type="file" multiple accept='image/*' onChange={(e)=> {
                    let tmp=[]
                    setimages(e.target.files)
                    for(let i=0; i<e.target.files.length;i++) tmp.push(URL.createObjectURL(e.target.files[i]))
                    setpicture(tmp)
                    }} />
                </div>
                <button className='lg:hidden bg-green-500 text-white px-1 rounded-md text-lg font-semibold w-full mt-8'>Add Product</button>
            </div>
            </div>
        </div>
    )
}

export default AddProduct