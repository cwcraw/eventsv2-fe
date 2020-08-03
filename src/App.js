import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   useHistory,
// } from "react-router-dom";
import Login from "./pages/login";
// import SignUp from "./pages/signup";
// import Home from "./pages/home";
import Events from "./pages/events";
// import Account from "./pages/account";
import { authMiddleWare } from "./util/auth";

import axios from "axios";
axios.defaults.baseURL = "https://us-central1-eventsv2-3097d.cloudfunctions.net/api"
export default function App() {
  // const history = useHistory;

  const [loginState, updateLogin] = useState({
    email: "",
    password: "",
  });

  // const [signUpState, updateSignUp] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const [renderState, updateRender] = useState({
  //   render: false,
  // });

  const [homeState, updateHome] = useState({
    username: "",
    email: "",
  });

  const [eventList, updateEventList] = useState({
    eventList: []
  });

  // function loadAccountPage(event) {
  //   updateRender({ render: true });
  // }

  // function loadEventPage(event) {
  //   updateRender({ render: false });
  // }

  function logoutHandler() {
    console.log("logging out");
    localStorage.removeItem("AuthToken");
  }

  function handleChangeHome(event) {
    updateHome(event);
  }
  function handleChangeEvents(event) {
    updateEventList(event);
  }

  function componentWillMountHome() {
    // authMiddleWare(history);
    authMiddleWare();
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get("/user")
      .then((response) => {
        console.log(response);
        handleChangeHome({
          email: response.data.userCredentials.email,
          username: response.data.userCredentials.username,
        });
      })
      .then(() => {
        console.log("homestate2", homeState);
      })
      .catch((error) => {
        // if (error.response.status === 403) {
        //   history.push("/login");
        // }
        console.log(error);
        // this.setState({ errorMsg: "Error in retrieving the data" });
      });
  }

  function componentWillMountEvents() {
    // authMiddleWare(history);
    authMiddleWare();
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get("/events")
      .then((response) => {
        console.log(response.data);
        handleChangeEvents({
          events: response.data
        });
      })
      .then(() => {
        console.log("homestate2", homeState);
      })
      .catch((error) => {
        // if (error.response.status === 403) {
        //   history.push("/login");
        // }
        console.log(error);
        // this.setState({ errorMsg: "Error in retrieving the data" });
      });
  }

  // function componenentWillRecievePropsLogin(arg) {
  //   if (arg.UI.errors) {
  //     updateLogin({ errors: arg.UI.errors });
  //   }
  // }

  function handleChangeLogin(event) {
    let updateObj = loginState;
    updateObj[event.target.name] = event.target.value;
    updateLogin(updateObj);
  }

  // function handleChangeSignUp(event) {
  //   let updateObj = signUpState;
  //   updateObj[event.target.name] = event.target.value;
  //   updateSignUp(updateObj);
  // }

  function handleSubmitLogin(event) {
    console.log("submitting");
    event.preventDefault();
    const userData = {
      email: loginState.email,
      password: loginState.password,
    };
    
    axios
      .post("/login", userData)
      .then((response) => {
        console.log(response.config.data);
        let userData = JSON.parse(response.config.data);
        localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
        console.log("after Local");
        // handleChangeHome({email: userData.email})
        // console.log("after change home")
        // console.log(homeState)
        // history.push("/");
        componentWillMountHome();
        componentWillMountEvents()
      })
      .catch((error) => {});
  }

  // function handleSubmitSignUp(event) {
  //   console.log("New User");
  //   event.preventDefault();
  //   const userData = {
  //     email: signUpState.email,
  //     password: signUpState.password,
  //     confirmPassword: signUpState.confirmPassword,
  //     username: signUpState.username,
  //   };
  //   console.log(userData);
  //   axios
  //     .post("/signup", userData)
  //     .then((response) => {
  //       localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
  //       history.push("/");
  //     })
  //     .catch((error) => {});
  // }

  return (
    <div>
      <Login
        logProp={loginState}
        handleChangeLogin={handleChangeLogin}
        handleChangeHome={handleChangeHome}
        handleSubmitLogin={handleSubmitLogin}
        logoutHandler={logoutHandler}
      />
      {/* <Home
                homeProp={homeState}
                renderProp = {renderState}
                // history = {history}
                componentWillMountHome={componentWillMountHome}
                loadAccountPage={loadAccountPage}
                loadEventPage={loadEventPage}
                logoutHandler={logoutHandler}
              /> */}
      <Events homeProp={homeState} eventsProp = {eventList}/>
    </div>
  );
  // return (
  //   <Router>
  //     <div>
  //       Testing
  //       <Switch>
  //         <Route
  //           exact
  //           path="/login"
  //           component={() => (
  //             <Login
  //               logProp={loginState}
  //               handleChangeLogin={handleChangeLogin}
  //               handleSubmitLogin={handleSubmitLogin}
  //             />
  //           )}
  //         />
  //         <Route
  //           exact
  //           path="/signup"
  //           component={() => (
  //             <SignUp
  //               signProp={signUpState}
  //               handleChangeSignUp={handleChangeSignUp}
  //               handleSubmitSignUp={handleSubmitSignUp}
  //             />
  //           )}
  //         />
  //         <Route
  //           exact
  //           path="/"
  //           component={() => (
  //             <Home
  //               homeProp={homeState}
  //               renderProp = {renderState}
  //               history = {history}
  //               componentWillMountHome={componentWillMountHome}
  //               loadAccountPage={loadAccountPage}
  //               loadEventPage={loadEventPage}
  //               logoutHandler={logoutHandler}

  //             />
  //           )}
  //         />
  //       </Switch>
  //     </div>
  //   </Router>
  // );
}
