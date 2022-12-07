import Head from 'next/head'
import Image from 'next/image'
import Temp from '../components/Temp'
import styles from '../styles/Home.module.css'

export default function Home() {

  const data: any = {
    first: "loremipsum",
    second: "asdqwe123",
    leckmi: { isImage: true, url: "frame1.png", width: 200, height: 200 },
    posts: [
      {
        author: "Alon Bar",
        text: "Very important\ntext here!",
        im: { isImage: true, url: "frame1.png", width: 10, height: 10 },
      },
      {
        author: "Alon Bar",
        text: "Forgot to mention that...",
        im: { isImage: true, url: "frame1.png", width: 10, height: 10 },
      },
    ],
  };

  return (
    <>
      <Temp data={data} render={()=>(<button>fdsfdsfds</button>)} />
    </>
  )
}
