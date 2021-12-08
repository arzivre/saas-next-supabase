import Head from "next/head"
import Navbar from "../components/navbar"

const Main = ({children}) => {
  return (
    <>
      <Head>
        <title>Supabase Saas</title>
      </Head>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  )
}

export default Main
