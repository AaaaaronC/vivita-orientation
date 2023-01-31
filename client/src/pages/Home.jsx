import React from 'react'
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='homePage'>
      <Link className="homeWrapper" to='./makewish'>
        <h1 className="homeTitle"> Make A Wish</h1>
      </Link>
      <Link className="homeWrapper" to='./viewyourwishes'>
        <h1 className="homeTitle"> View your Wishes</h1>
      </Link>
      <Link className="homeWrapper" to='./viewwishes'>
        <h1 className="homeTitle"> See what others are wishing for</h1>
      </Link>
    </div>
  )
}
