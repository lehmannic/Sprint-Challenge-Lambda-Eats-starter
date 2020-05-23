import React from 'react';

export default function Pizza(props) {
    if (!props) {
        return <h3>Waiting for your pizza order...</h3>;
    }
    const { name, size, toppings, instructions } = props.pizza;

    let toppingList = Object.keys(toppings);
    let chosenToppings = toppingList.filter(function (picked) {
        return toppings[picked];
    });

    return (
        <div className="order">
            <h2>Your Pizza Order:</h2>
            <h3>Name: {name}</h3>
            <h3>Size: {size}</h3>
            <ul>
                Toppings:{chosenToppings.map((topping, index) => {
                    return <li key={index}>{topping}</li>;
            })}
            </ul>
            <h3>Delivery Instructions: {instructions}</h3>
            <h3>Thanks!</h3>
        </div>
    );
}