import { CloseOutline,EllipsisVerticalOutline } from 'react-ionicons'
function Sub({selected,categories,deleteSubCategory,editSubCategory}) {
  const sb = categories?.filter(val=>val.category===selected)
  const sub = sb?.[0]?.['sub_categories']
  return (
    <>
      {
        sub?.map((val,index)=>(
          <div key={index} className={`select-none rounded-lg text-white ${(selected===val.category)?'bg-blue-700 ':'bg-blue-500  hover:bg-blue-600'} px-2 py-1 mx-1 my-1 flex justify-center items-center space-x-1 w-auto`}>
            <p>{val.sub}</p>
            {/* <div className='cursor-pointer' onClick={()=>editSubCategory(val.id,val.sub)}><EllipsisVerticalOutline color={'white'} /></div> */}
            <div className='cursor-pointer' onClick={()=>deleteSubCategory(val.sub)}><CloseOutline color={'white'} /></div>
          </div>
        ))
      }
    </>
  )
}

export default Sub