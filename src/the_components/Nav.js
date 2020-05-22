import React from 'react'
import { BrowserRouter, NavLink, Link } from "react-router-dom"

export default function Nav(){
    return (
        <div>
            <h1>Lambda Eats</h1>
            <BrowserRouter>
                <Link to="/">
                    <button className='navBtn'>Home</button>
                </Link>
                <Link to="/">
                    <button className='navBtn'>Help</button>
                </Link>
            </BrowserRouter>
        </div>
    )
}