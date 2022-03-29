import { useEffect, useState } from 'react'

function Home() {
  const [images,setimages] = useState()
  const [banners,setbanners] = useState({
    alt:'',
    link:'',
    posisi:''
  })
  const [picture,setpicture] = useState([])
  return (
    <div className='flex flex-col lg:items-center lg:border lg:border-gray-200 lg:rounded-sm w-full h-auto lg:h-[80vh] mb-[4.5rem] lg:mb-5 space-y-2 items-center'>
      <div className='flex mt-2 font-semibold font-sans text-2xl text-gray-500'>Dashboard</div>
      <div className='flex-col'>
        <div>Upload Banners</div>
        <div className='flex flex-col space-y-2 lg:flex-row lg:justify-between space-x-1 w-full'>
          <div className='flex p-1 items-center bg-slate-400'>
            <input type="file" multiple accept='image/*' onChange={(e)=> {
            let tmp=[]
            setimages(e.target.files)
            for(let i=0; i<e.target.files.length;i++) tmp.push(URL.createObjectURL(e.target.files[i]))
            setpicture(tmp)
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
          <div className='flex flex-col'>
            <p>Posisi</p>
            <div className='rounded-md px-2 py-1 border border-gray-400'>
              <select className='w-full' onChange={(e)=> setbanners({...banners, posisi: e.target.value})} >
                <option value="left">Kiri</option>
                <option value="center">Tengah</option>
                <option value="right">Kanan</option>
              </select>
            </div>
          </div>
        </div>
        <div className={`mt-5 rounded-md px-1 py-1 flex items-center flex-col  ${(picture.length>0)?'border border-gray-400 w-full h-auto':''}`}>
            {
                
                picture?.map(val => (
                <div className={`w-full h-80 mx-1 my-1 ${(banners==='center')?'flex':'relative'}`}>
                  <img src={val} className="w-full h-full" />
                  <div className={`z-10 bg-orange-400 ${(banners.alt==='left')?'absolute bottom-10 left-10':(banners.alt==='center')?'items-center':(banners.alt==='right')?'absolute right-10 bottom-10':'hidden'}`}>{banners.alt}</div>
                </div>))
        
            }
        </div>
      </div>
    </div>
  )
}

export default Home