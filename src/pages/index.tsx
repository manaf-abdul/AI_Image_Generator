import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Loader from '../components/Loader'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [first, setfirst] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const fetchHandler = async () => {
    try {
      if (query) {
        setLoading(true)
        const params = { query: query }
        console.log("query", query)

        const data = await fetch("/api/hello", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        })
        const json = await data.json();
        // console.log("data",data)
        console.log("daata", json)
        setfirst(`data:image/jpeg;base64,${json.photo}`)
        setLoading(false)
      } else {
        alert("Enter something")
      }
    } catch (error) {
      console.log("errror", error)
      setLoading(false)
    }
  }
  return (
    <>
      <div className='container'>
        <h3>OUTFITS AI</h3>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} style={{ padding: "0.2rem", marginBottom: "2px" }}></input>
        <button onClick={fetchHandler} style={{ padding: "0.5rem", marginBottom: "2px" }}>Generate</button>
        {loading ?
          <Loader /> :
          <img src={first} alt={query} height="750px"></img>
        }

      </div>
    </>
  )
}
