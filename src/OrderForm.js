import React from 'react';

export default function PizzaForm(props) {
    const {
        values,
        onInputChange,
        onSubmit,
        disabled,
        errors,
        onCheckboxChange,
    } = props;

    return (
        <div className="pizzaForm">
            <h2>Build Your Own Pizza</h2>
            <div className="pizzaPic" />
            <form onSubmit={onSubmit}>
                <h3>Build Your Own Pizza</h3>
                <div className="name-input">
                    <label>Name:&nbsp;
                        <input
                            name="name"
                            type="text"
                            onChange={onInputChange}
                            value={values.name}
                        />
                    </label>
                </div>
                <div label="pizza-size">
                    <label>Choice of Size (Required):&nbsp;
                        <select name="size" value={values.size} onChange={onInputChange}>
                            <option value="">Select a Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="extra-large">Extra Large</option>
                        </select>
                    </label>
                </div>
                <div>Add Toppings
                    <div className="toppings">
                        <div>
                            <label>Pepperoni:&nbsp;
                                <input
                                    type="checkbox"
                                    name="pepperoni"
                                    checked={values.toppings.pepperoni}
                                    onChange={onCheckboxChange}
                                />
                            </label>
                            <label>Sausage:&nbsp;
                                <input
                                    type="checkbox"
                                    name="sausage"
                                    checked={values.toppings.sausage}
                                    onChange={onCheckboxChange}
                                />
                            </label>
                            <label>Olives:&nbsp;
                                <input
                                    type="checkbox"
                                    name="olives"
                                    checked={values.toppings.olives}
                                    onChange={onCheckboxChange}
                                />
                            </label>
                            <label>Chicken:&nbsp;
                                <input
                                    type="checkbox"
                                    name="chicken"
                                    checked={values.toppings.chicken}
                                    onChange={onCheckboxChange}
                                />
                            </label>
                            <label>Peppers:&nbsp;
                                <input
                                    type="checkbox"
                                    name="peppers"
                                    checked={values.toppings.peppers}
                                    onChange={onCheckboxChange}
                                />
                            </label>
                            <label>Pineapple:&nbsp;
                                <input
                                    type="checkbox"
                                    name="pineapple"
                                    checked={values.toppings.pineapple}
                                    onChange={onCheckboxChange}
                                />
                            </label>
                            <label>Onions:&nbsp;
                                <input
                                    type="checkbox"
                                    name="onions"
                                    checked={values.toppings.onions}
                                    onChange={onCheckboxChange}
                                />
                            </label>
                            <label>Canadian Bacon:&nbsp;
                                <input
                                    type="checkbox"
                                    name="canadianBacon"
                                    checked={values.toppings.canadianBacon}
                                    onChange={onCheckboxChange}
                                />
                            </label>
                            <label>Diced Tomatoes:&nbsp;
                                <input
                                    type="checkbox"
                                    name="dicedTomatoes"
                                    checked={values.toppings.dicedTomatoes}
                                    onChange={onCheckboxChange}
                                />
                            </label>
                            <label>Extra Cheese:&nbsp;
                                <input
                                    type="checkbox"
                                    name="extraCheese"
                                    checked={values.toppings.extraCheese}
                                    onChange={onCheckboxChange}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="instructions">
                    <label>Special Instructions:&nbsp;
                        <input
                            name="instructions"
                            type="text"
                            onChange={onInputChange}
                            value={values.instructions}
                        />
                    </label>
                </div>
                <button disabled={disabled}>Submit</button>
                <div className="errors">
                    <div>{errors.name}</div>
                    <div>{errors.size}</div>
                </div>
            </form>
        </div>
    );
}