import { supabase } from '../utils/supabase'
import NextLink from 'next/link'

export const getStaticProps = async () => {
  const { data: lessons } = await supabase.from('lessons').select('*')

  return {
    props: {
      lessons,
    },
  }
}

export default function Home({ lessons }) {
  console.log(supabase.auth.user())
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      {lessons.map((lesson) => (
        <NextLink key={lesson.id} href={`/${lesson.id}`} passHref>
          <a className='p-8 h-40 rounded shadow text-xl flex'>{lesson.title}</a>
        </NextLink>
      ))}
    </div>
  )
}
