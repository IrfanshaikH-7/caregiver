import React from 'react'

export default function Title({children}:{children:React.ReactNode}) {

  return (
    <div className='mt-2 w-full p-1 hidden md:block'>
        {children}
    </div>
  )
}
