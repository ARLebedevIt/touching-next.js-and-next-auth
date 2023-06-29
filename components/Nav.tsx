'use client';

import Link from 'next/link'
import { useState, useEffect, SetStateAction } from 'react'
import Image from 'next/image'
import logo from '@public/assets/images/logo.svg'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav: React.FC = () => {
  const { data: session} = useSession();  
  const [providers, setProviders] = useState<SetStateAction<object | null>>(null)
  const [toggleMenu, setToggleMenu] = useState<SetStateAction<boolean>>(false)
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    fetchProviders()
  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={'/'} className='flex gap-2 flex-center'>
        <Image src={logo} alt='logo' width={30} height={30} className='object-contain' />
        <p className='logo_text'>Promptopia</p>
      </Link>


      {/*Desktop Nav*/}
      <div className='sm:flex hidden'>
        {session?.user ? ( <div className='flex gap-3 md:gap-5'>
          <Link href={'/create-prompt'} className='black_btn'>
            Create Post
          </Link>
          <button type='button'
            onClick={() => signOut()} className='outline_btn'>
            Sign Out
          </button>
          <Link href={'/profile'}>
            <Image src={session?.user.image as string} width={37} height={37} className='rounded-full' alt='profile picture' />
          </Link>
        </div>) : (<>
          {providers && Object.values(providers).map(item => (
            <button type='button' key={item.name} onClick={() => signIn(item.id)}
              className='black_btn'>Sign In</button>
          ))}
        </>)}
      </div>

      {/*Mobile Nav*/}
      <div className='sm:hidden flex relative'>
        {session?.user ? <div className='flex'>
          <Image src={session?.user.image as string} width={37} height={37} className='rounded-full' alt='profile picture' onClick={() => setToggleMenu((prev: boolean) => !prev)} />
          {toggleMenu && <div className='dropdown'>
            <Link href={'/profile'}
            className='dropdown_link'
            onClick={() => setToggleMenu(false)}
            >
              My Profile
            </Link>
            <Link href={'/create-prompt'} 
            className='dropdown_link'
            onClick={() => setToggleMenu(false)}
            >
              Create Prompt
            </Link>
            <button type='button' onClick={() => {setToggleMenu(false); signOut()}}
            className='mt-5 w-full black_btn'
            >
              Sign Out
            </button>
            </div>}
        </div> : <>
          {providers && Object.values(providers).map(item => {
            <button type='button' key={item.name} onClick={() => signIn(item.id)}
              className='black_btn'>Sign In</button>
          })}
        </>}
      </div>
    </nav>
  )
}

export default Nav