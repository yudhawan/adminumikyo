import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getProducts} from '../../features/products/productsSlice'
import {getCategories} from '../../features/products/categoriesSlice'

function EditProducts({id,handleEditBack,handleDelete}) {
  const dispatch = useDispatch()
  const {products,productsLoading} = useSelector(state=>state.products)
  const { categories,categoriesLoading } = useSelector(state=>state.categories)
  const data = products&&products.filter(product=>product.id===id)[0]
  const [images,setimages] = useState(data&&data.images)
  const [picture,setpicture] = useState([])
  const [product,setproduct] = useState({
    id: data?.id,
    product_name: data?.product_name,
    category: data?.category,
    stock: data?.stock,
    sub: data?.sub,
    price: data?.price,
    description: data?.description,
    grosir_min: (data?.grosir_min)?data?.grosir_min:0,
    grosir_price: (data?.grosir_price)?data?.grosir_price:0,
  })
  useEffect(()=>{
    dispatch(getProducts())
    dispatch(getCategories())
  },[id])
  
  return (
    <div className='flex flex-col items-center w-full '>
        <div className='flex justify-between w-full px-2 lg:px-20'>
            <div onClick={handleEditBack} className='select-none cursor-pointer rounded-md bg-gray-500 px-1 lg:font-semibold lg:text-lg lg:px-2 text-white hover:bg-gray-700'>Back</div>
            <div onClick={()=>handleDelete(product.id)} className='select-none cursor-pointer rounded-md bg-rose-500 px-1 lg:font-semibold lg:text-lg lg:px-2 text-white hover:bg-rose-700'>Delete</div>
            <div onClick={handleEditBack} className='select-none cursor-pointer rounded-md bg-green-500 px-1 lg:font-semibold lg:text-lg lg:px-2 text-white hover:bg-green-700'>Save</div>
        </div>
        <div className='flex flex-col px-2 lg:flex-row justify-start lg:space-x-16 mt-5 w-full lg:px-10'>
          <div className='lg:flex-col lg:flex lg:space-y-2 space-y-1 w-1/2 '>
            <div className='flex-col'>
              <div>Nama Product</div>
              <div className='rounded-md px-2 py-1 border border-gray-400'><input className='outline-none' type="text" value={product.product_name} onChange={(e)=> setproduct({...product, product_name:e.target.value})} /></div>
            </div>
            <div className='flex-col'>
              <div>Stock</div>
              <div className='rounded-md px-2 py-1 border border-gray-400'><input className='outline-none' type="number" value={product.stock} onChange={(e)=> setproduct({...product, stock:e.target.value})} /></div>
            </div>
            <div className='flex-col'>
              <div>Price</div>
              <div className='rounded-md px-2 py-1 border border-gray-400'><input className='outline-none' type="number" value={product.price} onChange={(e)=> setproduct({...product, price:e.target.value})} /></div>
            </div>
            <div className='flex-col'>
              <div>Category</div>
              <div className='rounded-md px-2 py-1 border border-gray-400'>
                <select className='w-full' onChange={(e)=>setproduct({...product, category:e.target.value})}>
                  {
                    categories&&categories.map(category=>{
                      if(product.category){
                        return(
                          <option key={category.id} value={product.category} selected={category.category===product.category}>{category.category}</option>
                        )
                      }
                      return(
                        <option key={category.id} value={category.category}>{category.category}</option>
                      )
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
                      if(product.sub){
                        return(
                          <option value={product.sub} selected={sub.sub===product.sub}>{sub.sub}</option>
                        )
                      }
                      return(
                        <option key={index} value={sub.sub}>{sub.sub}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className='flex-col'>
              <div>Description</div>
              <textarea className='w-full h-40 border border-gray-400 p-1' value={product.description} onChange={(e)=> setproduct({...product, description:e.target.value})} />
            </div>
          </div>
          <div className='lg:flex-col lg:flex lg:space-y-2 space-y-1 w-1/2 '>
            <div className='flex-col'>
              <div>Minimal Grosir</div>
              <div className='rounded-md px-2 py-1 border border-gray-400'><input className='outline-none' type="number" value={product.grosir_min} onChange={(e)=> setproduct({...product, grosir_min:e.target.value})} /></div>
            </div>
            <div className='flex-col'>
              <div>Harga Grosir</div>
              <div className='rounded-md px-2 py-1 border border-gray-400'><input className='outline-none' type="number" value={product.grosir_price} onChange={(e)=> setproduct({...product, grosir_price:e.target.value})} /></div>
            </div>
            <div className='flex-col'>
              <div>Images</div>
              <div className='rounded-md px-1 py-1 border flex-col overflow-y-auto border-gray-400 w-52 h-44'>
                
                  {
                    (picture.length>0)?<>
                    {picture.map(val => <div className='w-40 h-40 mx-1 my-1'><img src={val} className="w-full h-full" /></div>)}
                    </>:<div className='flex'>{
                      images.split(',').map(val => <div className='w-40 h-40 mx-1 my-1'><img src={`https://beautyshop.yashacode.com/products/img/${val}`} className="w-full h-full" /></div>)
                      }</div>
                  }
                
              </div>
              <input type="file" multiple accept='image/*' onChange={(e)=> {
                let tmp=[]
                setimages(e.target.files)
                for(let i=0; i<e.target.files.length;i++) tmp.push(URL.createObjectURL(e.target.files[i]))
                setpicture(tmp)
                }} />
            </div>
          </div>
        </div>
    </div>
  )
}

export default EditProducts