import { useEffect } from 'react'
import { useUser } from '../context/user'

const Login = () => {
  const { login } = useUser()
  useEffect(login(), [])
  return <p>Login in</p>
}

export default Login
