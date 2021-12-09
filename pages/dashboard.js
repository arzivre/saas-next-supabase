import { useRouter } from 'next/router'

import { supabase } from '../utils/supabase'
import { useUser } from '../context/user'

const Dashboard = () => {
  const { user, isLoading } = useUser()
  const router = useRouter()

  const loadPortal = async () => {
    await fetch('/api/portal')
      .then((response) => response.json())
      .then((data) => router.push(data.url))
  }

  return (
    <div className='w-full max-w-3xl mx-auto py-16 px-8'>
      <h1 className='text-3xl mb-6'>Dashboard</h1>
      {!isLoading && (
        <>
          <p className='mb-6'>
            {user?.is_subscribed
              ? `Subscribed: ${user.interval}`
              : 'Not subscribed'}
          </p>
          <button onClick={loadPortal}>Manage subscription</button>
        </>
      )}
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }

  return {
    props: {},
  }
}

export default Dashboard
