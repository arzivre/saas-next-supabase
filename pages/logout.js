import { useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { useRouter } from 'next/router'

const Logout = () => {
  const router = useRouter()
  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut()
      router.push('/')
    }
    logout()
  }, [])
  return <div>Loging out</div>
}

export default Logout
