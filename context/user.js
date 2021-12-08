//@ts-check
import { createContext, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import { supabase } from '../utils/supabase'
import post from '../utils/post'

const Context = createContext({})

const Provider = ({ children }) => {
  const [user, setUser] = useState(supabase.auth.user())
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user()

      if (sessionUser) {
        const { data: profile } = await supabase
          .from('profile')
          .select('*')
          .eq('id', sessionUser.id)
          .single()

        setUser({
          ...sessionUser,
          ...profile,
        })

        setIsLoading(false)
      }
    }

    getUserProfile()

    supabase.auth.onAuthStateChange(() => {
      getUserProfile()
    })
  }, [])

  useEffect(() => {
    post('/api/set-supabase-cookie', {
      event: user ? 'SIGNED_IN' : 'SIGNED_OUT',
      session: supabase.auth.session(),
    })
  }, [user])

  const login = async () => {
    await supabase.auth.signIn({
      provider: 'github',
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  const exposed = {
    user,
    login,
    logout,
    isLoading,
  }

  return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export const useUser = () => useContext(Context)

export default Provider
