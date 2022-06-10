import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getBanners,addBanners} from '../../features/bannersSlice'
function Banners() {
    const dispatch = useDispatch()
    const dataBanners = useSelector(state=>state.banners)
    const [images,setimages] = useState()
    const [banners,setbanners] = useState({
        alt:dataBanners.banners?.[0]?.alt,
        link:dataBanners.banners?.[0]?.link,
        bg:dataBanners.banners?.[0]?.bg,
        text:dataBanners.banners?.[0]?.text,
        posisi:dataBanners.banners?.[0]?.position,
    })
    const [picture,setpicture] = useState(dataBanners.banners?.[0]?.name)
    useEffect(()=>{
        dispatch(getBanners())
    },[])
  return (
    <div className='flex-col flex justify-center'>
        <div>Upload Banners</div>
        <div className='flex justify-between space-x-5'>
        <div className='flex flex-col space-y-2 lg:justify-between space-x-1 w-full'>
          <div className='flex p-1 items-center'>
            <input type="file" accept='image/*' onChange={(e)=> {
            // let tmp=[]
            setimages(e.target.files[0])
            // for(let i=0; i<e.target.files.length;i++) tmp.push(URL.createObjectURL(e.target.files[i]))
            setpicture(URL.createObjectURL(e.target.files[0]))
            }} />
          </div>
          <div className='flex flex-col'>
            <p>Link</p>
            <div className='w-full lg:w-60 border border-gray-400 px-1'><input onChange={(e)=> setbanners({...banners, link: e.target.value})} placeholder='http://www.contohlink.com' type="text" className='outline-none w-full' value={banners.link} /></div>
          </div>
          <div className='flex flex-col'>
            <p>Alt</p>
            <div className='w-full lg:w-60 border border-gray-400 px-1'><input onChange={(e)=> setbanners({...banners, alt: e.target.value})} placeholder='Klik link disini' type="text" className='outline-none w-full' value={banners.alt} /></div>
          </div>
        </div>
        <div className='flex flex-col space-y-2 lg:justify-between space-x-1 w-full'>
          <div className='flex flex-col'>
            <p>Background</p>
            <div className='w-full lg:w-60 border border-gray-400 px-1'><input onChange={(e)=> setbanners({...banners, bg: e.target.value})} type="color" className='outline-none w-full' value={banners.bg} /></div>
          </div>
          <div className='flex flex-col'>
            <p>Text</p>
            <div className='w-full lg:w-60 border border-gray-400 px-1'><input onChange={(e)=> setbanners({...banners, text: e.target.value})} type="color" className='outline-none w-full' value={banners.text} /></div>
          </div>
          <div className='flex flex-col'>
            <p>Posisi</p>
            <div className='rounded-md px-2 py-1 border border-gray-400'>
              <select className='w-full' onChange={(e)=> setbanners({...banners, posisi: e.target.value})} >
                <option value="">--/--</option>
                <option value="left">Kiri</option>
                <option value="center">Tengah</option>
                <option value="right">Kanan</option>
              </select>
            </div>
          </div>
        </div>
        </div>
        <button className='self-center text-white bg-green-500 px-5 rounded-md mt-5' onClick={()=>{
          dispatch(addBanners({images:images,banners:banners}))
        }}>Save</button>
        <div className={`mt-5 rounded-md px-1 py-1 flex items-center flex-col border border-gray-400 w-full h-auto`}>
            {/* {
                
                picture?.map(val => ( */}
                <div className={`w-full h-80 mx-1 my-1 relative`}>
                  <img src={images?picture:`https://beautyshop.yashacode.com/banner/img/${picture}`} className="w-full h-full" />
                  <div style={{backgroundColor:banners.bg, color:banners.text}} className={`z-10 px-1 rounded-sm  ${(banners.posisi==='left')?'absolute bottom-10 left-10':(banners.posisi==='center')?'absolute left-52 bottom-10':(banners.posisi==='right')?'absolute right-10 bottom-10':'hidden'}`}>{banners.alt}</div>
                </div>
                {/* ))
        
            } */}
        </div>
      </div>
  )
}

export default Banners