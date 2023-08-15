import Image from 'next/image'
import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex justify-between  mt-8 mx-10'>
      <div>
        <span className='border-2 p-3'>Dashboard</span>
      </div>
      <div className=' border-2 border-black p-3'>
       <Image src="/src/assets/image.jpg" width={10} height={10} alt='normal'>
       </Image>
      </div>
    </nav>
  )
}

export default NavBar