import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getProducts} from '../features/products/productsSlice'
import EditProducts from '../commponents/products/EditProducts'
import AddProduct from '../commponents/products/AddProduct'
function Products() {
  const dispatch = useDispatch()
  const {products,productsLoading} = useSelector(state=>state.products)
  const [edit,setedit] = useState('')
  const [addProduct,setaddProduct] = useState(false)
  const handleDelete = (id)=> console.log(id)
  const handleAddBack = ()=>setaddProduct(!addProduct)
  const handleEditBack = ()=> setedit('')
  useEffect(()=>{
    dispatch(getProducts())
  },[])
  return (
    <div className='flex flex-col overflow-y-auto lg:items-center lg:border lg:border-gray-200 lg:rounded-sm w-full h-auto lg:h-[75vh] mb-[4.5rem] lg:mb-5 space-y-2 items-center'>
      {
        edit?<div className='flex mt-2 font-semibold font-sans text-2xl text-gray-500'>Update Products</div>:addProduct?<></>:<div className='rounded-md bg-green-500 text-white px-2 py-1 mt-2 cursor-pointer hover:bg-green-600 font-semibold' onClick={()=>setaddProduct(!addProduct)}>Add Product</div>
      }
        
      
      {productsLoading&&<div>Loading</div>}
      {
        edit?<EditProducts id={edit} handleEditBack={handleEditBack} handleDelete={handleDelete}/>:addProduct?<AddProduct handleAddBack={handleAddBack}  />:
        <div className='flex flex-wrap w-full h-auto justify-center'>
          {products&&products.map(product=>(
          <div key={product.id} className='rounded-lg shadow-md bg-gray-200 hover:bg-gray-400 w-60 h-24 flex flex-col p-1 lg:p-2 mx-1 my-1 cursor-pointer' onClick={()=>setedit(product.id)} >
            <div className='text-base line-clamp-1 font-semibold'>{product.product_name}</div>
            <div className='text-sm text-gray-700'>{product.category}/{product.sub}</div>
            <div className='text-sm font-semibold'>Rp.{product.price}</div>
          </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Products