import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import Video from 'react-player'

export const getStaticPaths = async () => {
  const { data: lessons } = await supabase.from('lessons').select('id')
  const paths = lessons.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params: { id } }) => {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single()

  return {
    props: {
      lesson,
    },
  }
}

const LessonDetails = ({ lesson }) => {
  const [videoUrl, setVideoUrl] = useState()

  const getPremiumContent = async () => {
    const { data } = await supabase
      .from('premium_content')
      .select('video_url')
      .eq('id', lesson.id)
      .single()

    setVideoUrl(data?.video_url)
  }

  useEffect(() => {
    getPremiumContent()
  }, [])

  return (
    <main className='w-full max-w-3xl mx-auto py-16 px-8'>
      <h1 className='text-3xl mb-6'>🌲 {lesson.title}</h1>
      <p>{lesson.description}</p>
      {!!videoUrl && <Video url={videoUrl} width='100%' />}
    </main>
  )
}

export default LessonDetails
