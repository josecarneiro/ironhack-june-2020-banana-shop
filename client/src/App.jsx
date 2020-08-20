import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import HomeView from './views/HomeView';
import CheckoutView from './views/CheckoutView';

import BasketInformation from './components/BasketInformation';

class App extends Component {
  constructor() {
    super();
    this.state = {
      basket: []
    };
  }

  handleChangeInQuantity = (product, value) => {
    const basketClone = [...this.state.basket];

    const existingItem = basketClone.find(item => item.product._id === product._id);
    if (existingItem) {
      const editedItem = { ...existingItem };
      editedItem.quantity += value;
      const index = basketClone.indexOf(existingItem);
      if (editedItem.quantity > 0) {
        basketClone.splice(index, 1, editedItem);
      } else {
        basketClone.splice(index, 1);
      }
    } else if (value > 0) {
      const newItem = {
        product,
        quantity: 1
      };
      basketClone.push(newItem);
    }

    this.setState({
      basket: basketClone
    });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            <Link to="/">Banana Shop</Link>
            <Link to="/checkout">
              <BasketInformation list={this.state.basket} />
            </Link>
          </nav>
          <Switch>
            <Route
              path="/"
              render={props => (
                <HomeView
                  {...props}
                  basket={this.state.basket}
                  onChangeQuantity={this.handleChangeInQuantity}
                />
              )}
              exact
            />
            <Route
              path="/checkout"
              render={props => (
                <CheckoutView
                  {...props}
                  basket={this.state.basket}
                  onChangeQuantity={this.handleChangeInQuantity}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
