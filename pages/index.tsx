import Head from 'next/head'
import Image from 'next/image'
import Temp from '../components/Temp'
import styles from '../styles/Home.module.css'

export default function Home() {

  const data = {
    name: "asd",
    age: 3
  }

  return (
    <>
      <Temp data={data} />
    </>
  )
}
