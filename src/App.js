import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import {BrowserRouter as Router } from 'react-router-dom'
import * as yup from 'yup';
import axios from 'axios';
import './App.css';
import Pizza from './Order';
import Home from './Home';
import OrderForm from './OrderForm';
import formSchema from './formSchema';

const initialFormValues = {
  name: '',
  size: '',
  toppings: {
    pepperoni: false,
    sausage: false,
    olives: false,
    chicken: false,
    peppers: false,
    pineapple: false,
    onions: false,
    canadianBacon: false,
    dicedTomatoes: false,
    extraCheese: false,
  },
  instructions: '',
};

const initialFormErrors = {
  name: '',
  size: '',
};

const initialDisabled = true;

const App = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [currentPizza, setCurrentPizza] = useState([]);

  const postPizza = (pizza) => {
    axios
      .post('https://reqres.in/api/users', pizza)
      .then((res) => {
        setCurrentPizza([res.data, ...currentPizza]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const onInputChange = (evt) => {
    const { name } = evt.target;
    const { value } = evt.target;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onCheckboxChange = (evt) => {
    const { name } = evt.target;
    const { checked } = evt.target;

    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]: checked,
      },
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    const pizza = {
      name: formValues.name.trim(),
      size: formValues.size,
      toppings: formValues.toppings,
      instructions: formValues.instructions.trim(),
    };
    postPizza(pizza);
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <Router>
      <div className="App">
        <nav>
          <h1>Lambda Eats</h1>
          <div className="navButtons">
            <Link to="/" id="home">
              Home
          </Link>
            <Link to="/" id="help">
              Help
          </Link>
          </div>
        </nav>
        <Switch>

          <Route path="/pizza">
            <OrderForm
              onInputChange={onInputChange}
              onSubmit={onSubmit}
              onCheckboxChange={onCheckboxChange}
              disabled={disabled}
              errors={formErrors}
              values={formValues}
            />
            {currentPizza.map((pizza, index) => {
              return <Pizza key={index} pizza={pizza} />;
            })}
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
};
export default App;