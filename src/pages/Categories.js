import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getCategories,addCategories,addSubCategories,deleteCategories,deleteSubCategories,editCategories,editSubCategories} from '../features/products/categoriesSlice'
import Sub from '../commponents/categories/Sub'
import Category from '../commponents/categories/Category'
function Categories() {
  const dispatch = useDispatch()

  const [category,setcategory] = useState('')
  const [editcategory,seteditcategory] = useState({
    id:null,
    cat:''
  })
  const [editsub,seteditsub] = useState({
    id:'',
    sub:''
  })
  const [selected,setselected] = useState({
    id:null,
    selected:''
  })
  const [sub,setsub] = useState('')
  const handleSelected = (id,val)=> setselected({id:id,selected:val})
  function handleSubmitCategory(e){
    e.preventDefault()
    dispatch(addCategories(category))
    setcategory('')
  }
  function handleSubmitSubCategory(e){
    e.preventDefault()
    dispatch(addSubCategories({id:selected.id,sub:sub}))
    setsub('')
  }
  const handleEditCategory=()=> {
    dispatch(editCategories(editcategory))
    seteditcategory({
      id:null,
      cat:''
    })
  }

  // const handleEditSub=(id)=> dispatch(editCategories({id:id,sub_category:editSubCategories}))

  const editCategory = (id,e)=> seteditcategory({id:id,cat:e})
  const editSubCategory = (id,e)=> seteditsub({id:id,sub:e})

  const deleteCategory = (id)=> dispatch(deleteCategories(id))
  const deleteSubCategory = (id)=> dispatch(deleteSubCategories(id))
  const {categories,categoriesLoading} = useSelector(state=>state.categories)
  useEffect(()=>{
    dispatch(getCategories())
  },[])
    
  return (
    <div className='flex flex-col  lg:items-center lg:border lg:border-gray-200 lg:rounded-sm w-full h-[80vh] space-y-2'>
      
      <div className='flex mt-2 font-semibold font-sans text-2xl text-gray-500'>Categories and Sub Categories</div>
      <div>
      <div className='flex w-full lg:w-[50vw] h-auto'>
        <div className='w-[50vw] lg:w-[25vw] border border-purple-300 p-4 flex flex-col space-y-1 relative'>
          {categoriesLoading&&<div>Loading...</div>}
          {/* edit category */}
          {editcategory.cat&&<div className='absolute w-full h-full bg-transparent backdrop-blur-sm left-0 top-0 flex flex-col space-y-1 justify-center items-center'>
            <div className='rounded-md border border-gray-400 px-2 py-1 w-40 bg-white'><input className='outline-none w-full' value={editcategory.cat} onChange={(e)=> seteditcategory({...editcategory, cat:e.target.value})} type="text" /></div>
            <div className='flex space-x-1'>
              <button className='bg-rose-600 rounded-md px-1 text-white' onClick={()=>seteditcategory({id:'', cat:''})}>Cancel</button>
              <button className='bg-green-600 rounded-md px-1 text-white' onClick={handleEditCategory}>Save</button>
            </div>
          </div>}
          {/* add category */}
          <form onSubmit={handleSubmitCategory}>
            <div className='rounded-md border border-gray-400 px-2 py-1'><input className='outline-none w-full' value={category} onChange={(e)=> setcategory(e.target.value)} type="text" placeholder='Add Category' /></div>
          </form>
          <div className='w-full flex flex-wrap'>
            <Category categories={categories} handleSelected={handleSelected} selected={selected.selected} deleteCategory={deleteCategory} editCategory={editCategory}/>
          </div>
        </div>
        <div className='w-[50vw] lg:w-[25vw] border border-purple-300 p-4 flex flex-col space-y-1 relative'>
          {/* edit sub */}
          {/* {editsub.sub&&<div className='absolute w-full h-full bg-transparent backdrop-blur-sm left-0 top-0 flex flex-col space-y-1 justify-center items-center'>
            <div className='rounded-md border border-gray-400 px-2 py-1 w-40 bg-white'><input className='outline-none w-full' value={editsub.sub} onChange={(e)=> seteditsub({...editsub, sub:e.target.value})} type="text" /></div>
            <div className='flex space-x-1'>
              <button className='bg-rose-600 rounded-md px-1 text-white' onClick={()=>seteditsub({id:'', sub:''})}>Cancel</button>
              <button className='bg-green-600 rounded-md px-1 text-white' onClick={handleEditSub}>Save</button>
            </div>
          </div>} */}
          {/* add sub */}
          {selected.selected?<form onSubmit={handleSubmitSubCategory}>
            <div className='rounded-md border border-gray-400 px-2 py-1'><input className='outline-none w-full' value={sub} onChange={(e)=> setsub(e.target.value)} type="text" placeholder='Add Sub Category' /></div>
          </form>:<></>}
          <div className='w-full flex flex-wrap'>
            <Sub categories={categories} selected={selected.selected} deleteSubCategory={deleteSubCategory} editSubCategory={editSubCategory} />
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Categories