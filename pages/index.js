import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter  } from 'next/router'
import IndexCheck from './components/index-check'


export default function Home() {

  return(
    <>
      <IndexCheck/>
    </>
  );
}
