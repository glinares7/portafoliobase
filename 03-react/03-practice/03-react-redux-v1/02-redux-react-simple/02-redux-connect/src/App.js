import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class App extends Component {
  state = {
    username: "",
  };

  handleIncrement = () => {
    this.props.increment();
  };
  handleDecrement = () => {
    this.props.decrement();
  };
  handleReset = () => {
    this.props.reset();
  };

  handleUser = (e) => {
    this.setState({ username: e.target.value });
  };
  handleAddUser = () => {
    console.log(this.state.username);
    this.props.addUser(this.state.username);
  };
  render() {
    console.log(this);
    return (
      <div style={{ paddingLeft: "20px" }}>
        <h1>Redux</h1>
        <h1> el valor externo count - {this.props.contador}</h1>
        <h1> el valor externo users - {this.state.username}</h1>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
        <button onClick={this.handleReset}>RESET</button>
        <hr />
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleUser}
        />
        <button onClick={this.handleAddUser}>ADD USER</button>

        <h1> el valor interno users</h1>
        <ul>
          {this.props.usuario.map((users, index) => (
            <li key={index}>{users}</li>
          ))}
        </ul>

        <Link to="somes">useReducers</Link>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   console.log("state", state.count);
//   return {
//     count: state.count,
//   };
// };
const mapStateToProps = (state, ownProps, ownPro) => {
  console.log("state", state);

  console.log("owlprops", ownProps);
  console.log("owlprops", ownPro);

  const usersWithFoo = state.usuario.filter((user) =>
    user.includes(ownProps.searchText)
  );
  return {
    contador: state.contador.count,
    usuario: state.usuario,
    usersWithFoo,
  };
};

const increment = () => {
  return { type: "INCREMENT" };
};
const decrement = () => {
  return { type: "DECREMENT" };
};
const reset = () => {
  return { type: "RESET", payload: { count: 0 } };
};
const addUser = (username) => {
  return { type: "ADD_USER", payload: username };
};
const mapDispatchToProps = {
  increment,
  decrement,
  reset,
  addUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
