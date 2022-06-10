import { CloseOutline,EllipsisVerticalOutline } from 'react-ionicons'
function Category({categories,handleSelected,selected,deleteCategory,editCategory}) {
  return (
    <>
      {
        categories?.map((val,index)=>(
          <div key={index} className={`select-none rounded-lg ${(selected===val.category)?'bg-purple-700 text-white':'bg-gray-300 text-black hover:bg-gray-400'} px-2 py-1 mx-1 my-1 h-auto flex justify-center items-center font-semibold`} onClick={()=>{
            handleSelected(val.id,val.category)
            }}>
            <p className='mr-2'>{val.category}</p>
            <div className='cursor-pointer' onClick={()=>editCategory(val.id,val.category)}><EllipsisVerticalOutline color={'white'}/></div>
            <div className='cursor-pointer' onClick={()=>deleteCategory(val.id)}><CloseOutline color={'white'}  /></div>
          </div>
        ))
      }
    </>
  )
}

export default Category