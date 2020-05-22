import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserHistory } from 'react-router-dom'
import * as yup from 'yup'

export default function OrderForm({ order, setOrder }) {
    const initialState = {
        customer: '',
        size: '',
        sauces: [
            { name: 'Original Red', id: 'original-red', isChecked: false },
            { name: 'Spinach Alfredo', id: 'spinach-alfredo', isChecked: false },
            { name: 'Garlic Ranch', id: 'garlic-ranch', isChecked: false },
            { name: 'BBQ Sauce', id: 'bbq-sauce', isChecked: false }
        ],
        toppingsChecked: [
            { name: 'Pepperoni', id: 'pepperoni', isChecked: false, cypressTest: 'pepperoniTest' },
            { name: 'Sausage', id: 'sausage', isChecked: false, cypressTest: 'sausageTest' },
            { name: 'Canadian Bacon', id: 'canadian-bacon', isChecked: false },
            { name: 'Spicy Italian Sausage', id: 'spicy-italian-sausage', isChecked: false },
            { name: 'Grilled Chicken', id: 'grilled-chicken', isChecked: false },
            { name: 'Onions', id: 'onions', isChecked: false },
            { name: 'Green Pepper', id: 'green-pepper', isChecked: false },
            { name: 'Diced Tomatos', id: 'diced-tomatos', isChecked: false },
            { name: 'Black Olives', id: 'black-olives', isChecked: false },
            { name: 'Roasted Garlic', id: 'roasted-garlic', isChecked: false },
            { name: 'Artichoke Hearts', id: 'artichoke-hearts', isChecked: false },
            { name: 'Three Cheese', id: 'three-cheese', isChecked: false },
            { name: 'Pineapple', id: 'pineapple', isChecked: false },
            { name: 'Extra Cheese', id: 'extra-cheese', isChecked: false },
        ],
        substitute: '',
        instructions: '',
        quantity: ''
    }
    const [formState, setFormState] = useState(initialState);
    const [serverError, setServerError] = useState('')
    const [formValid, setFormValid] = useState(false)
    const [isButtonDisabled, setButtonDisabled] = useState(true)
    const [formErrors, setFormErrors] = useState(initialState)

    const formSchema = yup.object().shape({
        customer: yup.string().min(3, "Your name is required").required("Your name is required"),
        size: yup.string().required("Please choose a size"),
        sauces: yup.array()
            .of(yup.object().shape({
                name: yup.string(),
                id: yup.string(),
                isChecked: yup.boolean()
            })),
        toppingsChecked: yup.array()
            .of(yup.object().shape({
                name: yup.string(),
                id: yup.string(),
                isChecked: yup.boolean()
            })),
        instructions: yup.string()
    })

    const validateChange = e => {
        const name = e.target.name;
        yup
            .reach(formSchema, e.target.name, e.target.type)
            .validate(e.target.value)
            .then(valid => {
                setFormErrors({ ...formErrors, [e.target.name]: "" })
            })
            .catch(err => {
                console.log("OrderForm -> err", err)
                setFormErrors({ ...formErrors, [name]: err.errors })
            })
    }

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid)
            setFormValid(valid)
            console.log("OrderForm -> valid", valid)
        })
    }, [formState])

    const onSubmit = e => {
        e.preventDefault();
        axios.post('https://reqres.in/api/users', formState)
            .then(res => {
                console.log(res.data)
                const data = {
                    ...res.data,
                    sauces: res.data.sauces.filter(sauce => sauce.isChecked === true),
                    toppingsChecked: res.data.toppingsChecked.filter(toppings => toppings.isChecked === true),
                }
                setOrder([...order, data])
                setFormState(initialState)
            }
            )
            .catch(err => console.log(err))
    }
    
    const onInputChange = e => {
        const { name } = e.target
        const { value } = e.target

        yup
            .reach(formSchema, name)
            // we can then run validate using the value
            .validate(value)
            .then(valid => {
                // happy path, we can clear the error message
                setFormErrors({
                    ...formErrors,
                    [name]: ''
                })
            })
            .catch(err => {
                // sad path, does not validate so we set the error message to the message 
                // returned from yup (that we created in our schema)
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0]
                })
            })

        // Wether or not our validation was successful, we will still set the state to the new value as the user is typing
        setFormState({
            ...formState,
            [name]: value // NOT AN ARRAY
        })



    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <h3>Build Your Own Pizza</h3>
            <div>
                <h5>Choice of Size</h5>
                <div>{formErrors.size}</div>
                <label>Size
                <select
                        onChange={onInputChange}
                        name='size'
                    >
                        <option value=''>- Select a size -</option>
                        <option value='Small'>Small</option>
                        <option value='Medium'>Medium</option>
                        <option value='Large'>Large</option>
                        <option value='Extra-Large'>Extra-Large</option>
                    </select>
                </label>
            </div>

            <div>
                <h5>Choice of Sauce</h5>
                <label>Original Red
                    <input
                        type='radio'
                        name='sauces'
                        value='Original Red'
                        onChange={onInputChange}
                    />
                </label>
                <label>Garlic Ranch
                    <input
                        type='radio'
                        name='sauces'
                        value='Garlic Ranch'
                        onChange={onInputChange}
                    />
                </label>
                <label>BBQ Sauce
                    <input
                        type='radio'
                        name='sauces'
                        value='BBQ Sauce'
                        onChange={onInputChange}
                    />
                </label>
                <label>Spinach Alfredo
                    <input
                        type='radio'
                        name='sauces'
                        value='Spinach Alfredo'
                        onChange={onInputChange}
                    />
                </label>
            </div>
            <div>
                <h5>Choose your Sides</h5>
                <div>
                    {formState.toppingsChecked.map(toppings => {
                        return (
                            <label htmlFor={toppings.id}>
                                <input
                                    type="checkbox"
                                    checked={toppings.isChecked} name="toppingsChecked"
                                    id={toppings.id}
                                    data-cy={toppings.cypressTest}
                                    onChange={e => onInputChange(e)}
                                />
                                {toppings.name}
                            </label>
                        )
                    })
                    }
                </div>
            </div>
        </form>
    )
}