import 'tailwindcss/tailwind.css'

import UserProvider from '../context/user'
import Main from '../layouts/main'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Main>
        <Component {...pageProps} />
      </Main>
    </UserProvider>
  )
}

export default MyApp
