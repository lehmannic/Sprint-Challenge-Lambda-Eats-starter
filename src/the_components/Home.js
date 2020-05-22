import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
    return (
        <div>
            <h1>Your favorite food, delivered while coding</h1>
            <Link to='pizza'>
                <button>pizza</button>
            </Link>
        </div>

    )
}