import React from 'react'
import Search from './Search'
import Logo from './Logo'
import LoginButton from './LoginButton'
import { getCurrentUser } from '../actions/authActions';
import UserActions from './UserActions';

export default async function Navbar() {
  const user = await getCurrentUser();
  return (
    <header className='sticky top-0 z-50 grid grid-cols-2 md:grid-cols-3 gap-4 justify-between  bg-white p-5 items-center text-gray-800 shadow-md'>
  
      <Logo />
      <Search />

    <div className='place-self-end  h-[80%]'>
      {user ? (<UserActions user={user} />) : (<LoginButton />)}
    </div>
    </header>
  )
}
 