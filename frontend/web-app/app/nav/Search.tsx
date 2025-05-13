'use client'

import { useParamsStore } from '@/hooks/useParamsStore'  
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import path from 'path'
import React, { useState } from 'react'
import {FaSearch} from 'react-icons/fa'

export default function Search() {
    const router = useRouter();
    const pathname = usePathname();
    const setParams = useParamsStore(state => state.setParams);
    const setSearchValue = useParamsStore(state => state.setSearchValue);
    const searchValue = useParamsStore(state => state.searchValue);

    function onChange(event: any) {
        setSearchValue(event.target.value);
    }

    function search() {
        if(pathname !== '/') router.push('/');
        setParams({searchTerm: searchValue});
    }

    return (
        <div className='max-md:order-3 max-md:col-span-2 flex  items-center  rounded-full md:py-2 py-1 shadow-sm '>
            <input 
                onChange={onChange}
                onKeyDown={(e: any) => {
                    if (e.key === 'Enter') search();
                }}
                type="text" 
                value={searchValue}
                placeholder='Search for cars by make, model or color'
                className='input-custom text-sm text-gray-600 '
            />
            <button>
                <FaSearch 
                    onClick={search} 
                    className='bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2 size-8 md:size-9' 
                />
            </button>
        </div>
    )
}
