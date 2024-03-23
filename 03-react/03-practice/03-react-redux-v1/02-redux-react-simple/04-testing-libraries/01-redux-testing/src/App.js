import React, { useState } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

const App = (props) => {
    const initialState = {
        username: "",
    };

    const [state, setState] = useState(initialState);

    const handleIncrement = () => {
        props.increment();
    };
    const handleDecrement = () => {
        props.decrement();
    };
    const handleReset = () => {
        props.reset();
    };

    const handleUser = (e) => {
        setState({ username: e.target.value });
    };
    const handleAddUser = () => {
        console.log(state.username);
        props.addUser(state.username);
    };

    console.log("***this.props***", props);
    return (
        <div style={{ paddingLeft: "20px" }}>
            <h1>Redux ahora te cgubgaste</h1>
            <h1> el valor externo count - {props.contador}</h1>
            <h1> el valor externo users - {state.username}</h1>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button onClick={handleReset}>RESET</button>
            <hr />
            <input type="text" value={state.username} onChange={handleUser} />
            <button onClick={handleAddUser}>ADD USER</button>

            <h1> el valor interno users</h1>
            <ul>
                {props.usuario.map((users, index) => (
                    <li key={index}>{users}</li>
                ))}
            </ul>
        </div>
    );
};
// <Link to="somes">useReducers</Link>

// const mapStateToProps = (state) => {
//   console.log("state", state.count);
//   return {
//     count: state.count,
//   };
// };
const mapStateToProps = (state, ownProps) => {
    console.log("state", state);

    console.log("owlprops", ownProps);

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
