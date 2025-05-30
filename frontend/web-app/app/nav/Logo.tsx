'use client'

import { useParamsStore } from '@/hooks/useParamsStore'
import { useRouter,usePathname } from 'next/navigation';
import React from 'react'
import { AiOutlineCar } from 'react-icons/ai'

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();

  function doReset(){
    if(pathname !== '/') router.push('/');
    reset();
  }
    const reset = useParamsStore(state => state.reset);
  return (
    <div onClick={doReset} className='cursor-pointer flex items-center gap-2 text-2xl md:text-3xl font-semibold text-red-500'>
        <AiOutlineCar className='size-10'/>
            Bid A Ride Auctions
    </div>
  )
}
