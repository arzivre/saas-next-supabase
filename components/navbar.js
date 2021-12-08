import Link from 'next/link'
import { useUser } from '../context/user'

const Navbar = () => {
  const { user } = useUser()

  return (
    <nav className='flex py-4 px-6 border-b border-gray-200'>
      <Link href='/' passHref>
        <a>Home</a>
      </Link>
      <Link href='/pricing' passHref>
        <a className='ml-2'>Pricing</a>
      </Link>
      <Link href={user ? '/logout' : '/login'} passHref>
        <a className='ml-auto'>{user ? 'Logout' : 'Login'}</a>
      </Link>
    </nav>
  )
}

export default Navbar
