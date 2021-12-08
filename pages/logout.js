import { useEffect } from 'react'
import { useUser } from '../context/user'

const Logout = () => {
  const { logout } = useUser()

  useEffect(logout(), [])

  return <div>Loging out</div>
}

export default Logout
