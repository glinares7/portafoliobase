import { React } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Home = (props) => {
  // const initialState = {
  //   username: "",
  //   old: "",
  // };
  // const [state, setState] = useState(initialState);

  // const dispatch = useDispatch();

  // *use selector
  // console.log(
  //   "redux-state",
  //   useSelector((state) => state)
  // );

  console.log("***this.props***", props);
  const handleRedux = () => {
    props.pathr(props.location.pathname);
    props.history.push("/");
  };
  return (
    <div style={{ paddingLeft: "20px" }}>
      <h1>lista redux</h1>
      <ul>
        {props.pathredux.map((path, key) => (
          <li key={key}>{path}</li>
        ))}
      </ul>
      <h1>lasrutas navegadas</h1>
      <button onClick={handleRedux}>INICIO</button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log("state-home", state);

  console.log("owlprops", ownProps);

  // const usersWithFoo = state.usuario.filter((user) =>
  //   user.includes(ownProps.searchText)
  // );
  // usersWithFoo,
  return {
    pathredux: state.pathredux,
  };
};

//* TDD
const pathr = (pathrename) => {
  return {
    type: "PATH_REDUX",
    payload: pathrename,
  };
};

const mapDispatchToProps = {
  pathr,
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
// const mapDispatchToProps = {
//   increment,
//   addUser,
// };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
