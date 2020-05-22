
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home">
            <div className="homeContainer">
                <h2>Your favorite food, delivered while coding</h2>
                <Link to="/pizza" id="pizza">
                    Pizza?
                </Link>
            </div>
        </div>
    );
}