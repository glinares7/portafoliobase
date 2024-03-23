import { React, useState } from "react";
import { connect } from "react-redux";

const App = (props) => {
  const initialState = {
    username: "",
    old: "",
  };
  const [state, setState] = useState(initialState);

  const handleIncrement = () => {
    props.increment();
  };
  const handleDecrement = () => {
    props.decrement();
  };
  const handleReset = (e) => {
    props.reset();
    props.oldReset(props.contador);
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
      <h1>Redux</h1>
      <h1>el state oldReset {props.old}</h1>
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

const mapStateToProps = (state, ownProps) => {
  console.log("state", state);

  console.log("owlprops", ownProps);

  const usersWithFoo = state.usuario.filter((user) =>
    user.includes(ownProps.searchText)
  );
  return {
    old: state.old,
    contador: state.contador.count,
    usuario: state.usuario,
    usersWithFoo,
  };
};

export const increment = () => {
  return { type: "INCREMENT" };
};
const decrement = () => {
  return { type: "DECREMENT" };
};
export const reset = () => {
  return { type: "RESET", payload: { count: 0 } };
};
export const addUser = (username) => {
  return { type: "ADD_USER", payload: username };
};

//* TDD
export const oldReset = (oldReset) => {
  return { type: "OLD_RESET", error: true, payload: oldReset };
};

// export function doFetchUserList(){
//   try{
//     yield put({type: "FETCH_USER_START"});
//     const data=yield call(userService.getList());
//     yield put({type: "FETCH_USER_SUCCESS",data})
//   }catch(err){
//     yield put(fetchUserFail(err))
//   }
// }
const mapDispatchToProps = {
  increment,
  decrement,
  reset,
  addUser,
  oldReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
