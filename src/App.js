import React, { useState } from "react";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import EventsDisplay from "./pages/events";
import AddEventDisplay from "./pages/addEvent";
import EditEventDisplay from "./pages/editEvent";
import DeleteEventDisplay from "./pages/deleteEvent";
import { makeStyles } from "@material-ui/core/styles";
import { authMiddleWare } from "./util/auth";

import axios from "axios";
import { Link } from "@material-ui/core";
axios.defaults.baseURL =
  "https://us-central1-eventsv2-3097d.cloudfunctions.net/api";

  const useStyles = makeStyles((theme) => ({
    app: {
      margin: theme.spacing(1),
      minWidth: 320,
    },
  }));

export default function App() {
  const classes = useStyles();

  //First we will define all the states

  const [renderState, updateRender] = useState("loggedOut");

  const [loginState, updateLogin] = useState({
    email: "",
    password: "",
  });

  const [signUpState, updateSignUp] = useState({
    email: "",
    password: "",
  });

  const [homeState, updateHome] = useState({
    username: "",
    email: "",
  });

  const [editEventState, updateEditEvent] = useState({
    event: "",
    eventId: "Please Select Event",
  });

  const [deleteEventState, updateDeleteEvent] = useState({
    eventId: " ",
  });

  const [eventList, updateEventList] = useState({
    eventlist: [],
  });

  //Utility functions and state handlers
  function logoutHandler() {
    localStorage.removeItem("AuthToken");
    handleRender("loggedOut");
  }

  function handleChangeHome(event) {
    updateHome(event);
  }

  function handleChangeEditEvent(event) {
    let editObj = editEventState;
    let origObj = {};
    if (eventList.events) {
      console.log("in if");
      eventList.events.forEach((el) => {
        if (el.eventId === editObj.eventId) {
          origObj = el;
        }
      });
    }
    let newEvent = origObj[event.target.name];
    if (event.target.value) {
      newEvent = event.target.value;
    }
    editObj[event.target.name] = newEvent;
    updateEditEvent(editObj);
  }

  function handleChangeDeleteEvent(event) {
    updateDeleteEvent(event.target.value);
  }

  function handleChangeEvents(event) {
    updateEventList(event);
  }

  function handleRender(state) {
    updateRender(state);
  }

  function handleChangeLogin(event) {
    let updateObj = loginState;
    updateObj[event.target.name] = event.target.value;
    updateLogin(updateObj);
  }

  function handleChangeSignUp(event) {
    let updateObj = signUpState;
    updateObj[event.target.name] = event.target.value;
    updateSignUp(updateObj);
  }

  function componentWillMountHome() {
    authMiddleWare();
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get("/user")
      .then((response) => {
        handleChangeHome({
          email: response.data.userCredentials.email,
          username: response.data.userCredentials.username,
        });
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }

  function componentWillMountEvents() {
    authMiddleWare();
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get("/events")
      .then((response) => {
        handleChangeEvents({
          events: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmitLogin(event) {
    event.preventDefault();
    const userData = {
      email: loginState.email,
      password: loginState.password,
    };

    axios
      .post("/login", userData)
      .then((response) => {
        localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
        componentWillMountHome();
        componentWillMountEvents();
        handleRender("loggedIn");
      })
      .catch((error) => {});
  }

  function handleSubmitAddEvent(event) {
    authMiddleWare();
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    event.preventDefault();
    const userData = {
      username: homeState.username,
      event: editEventState.event,
      location: editEventState.location,
      time: editEventState.time,
      note: editEventState.note,
    };
    console.log(userData);
    axios
      .post("/event", userData)
      .then((response) => {
        componentWillMountEvents();
      })
      .catch((error) => {});
  }

  function handleSubmitEditEvent(event) {
    authMiddleWare();
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    event.preventDefault();
    const userData = {
      eventId: editEventState.eventId,
      username: homeState.username,
      event: editEventState.event,
      location: editEventState.location,
      time: editEventState.time,
      note: editEventState.note,
    };
    console.log(userData.eventId);
    axios
      .put(`/event/${userData.eventId}`, userData)

      .then((response) => {
        componentWillMountEvents();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmitDeleteEvent(event) {
    authMiddleWare();
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    event.preventDefault();
    console.log(deleteEventState);
    axios
      .delete(`/event/${deleteEventState}`)
      .then((response) => {
        console.log("Mounting");
        componentWillMountEvents();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmitSignUp(event) {
    console.log("New User");
    event.preventDefault();
    const userData = {
      email: signUpState.email,
      password: signUpState.password,
      confirmPassword: signUpState.confirmPassword,
      username: signUpState.username,
    };
    axios
      .post("/signup", userData)
      .then((response) => {
        localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
        componentWillMountHome();
        componentWillMountEvents();
        updateRender("loggedIn");
      })
      .catch((error) => {});
  }

  if (renderState === "loggedOut") {
    return (
      <div className={classes.app}>
        <Login
          logProp={loginState}
          handleChangeLogin={handleChangeLogin}
          handleChangeHome={handleChangeHome}
          handleSubmitLogin={handleSubmitLogin}
        />
        <Link
          onClick={(e) => {
            updateRender("signUp");
          }}
        >
          Don't have an account? Sign up here!
        </Link>
      </div>
    );
  } else if (renderState === "loggedIn") {
    return (
      <div className={classes.app}> 
        <EventsDisplay
          logoutHandler={logoutHandler}
          homeProp={homeState}
          eventsProp={eventList}
        />
        <AddEventDisplay
          handleChangeEditEvent={handleChangeEditEvent}
          handleSubmitAddEvent={handleSubmitAddEvent}
        />
        <EditEventDisplay
          eventsProp={eventList}
          editEventProp={editEventState}
          handleChangeEditEvent={handleChangeEditEvent}
          handleSubmitEditEvent={handleSubmitEditEvent}
        />
        <DeleteEventDisplay
          eventsProp={eventList}
          editEventProp={editEventState}
          handleChangeDeleteEvent={handleChangeDeleteEvent}
          handleSubmitDeleteEvent={handleSubmitDeleteEvent}
        />
      </div>
    );
  } else if (renderState === "signUp") {
    return (
      <div >
        <SignUp
          signProp={signUpState}
          handleChangeSignUp={handleChangeSignUp}
          handleSubmitSignUp={handleSubmitSignUp}
        /> <br/>
        <Link
          onClick={(e) => {
            updateRender("loggedOut");
          }}
        >
          Already have an account? Log in here!
        </Link>
      </div>
    );
  }

  //   return (
  //     <div>
  //       <Login
  //         renderState={"login"}
  //         logProp={loginState}
  //         handleChangeLogin={handleChangeLogin}
  //         handleChangeHome={handleChangeHome}
  //         handleSubmitLogin={handleSubmitLogin}
  //         logoutHandler={logoutHandler}
  //       />
  //       <EventsDisplay homeProp={homeState} eventsProp={eventList} />
  //       <AddEventDisplay
  //         handleChangeEditEvent={handleChangeEditEvent}
  //         handleSubmitAddEvent={handleSubmitAddEvent}
  //       />
  //       <EditEventDisplay
  //         eventsProp={eventList}
  //         editEventProp={editEventState}
  //         handleChangeEditEvent={handleChangeEditEvent}
  //         handleSubmitEditEvent={handleSubmitEditEvent}
  //       />
  //       <DeleteEventDisplay
  //         eventsProp={eventList}
  //         editEventProp={editEventState}
  //         handleChangeDeleteEvent={handleChangeDeleteEvent}
  //         handleSubmitDeleteEvent={handleSubmitDeleteEvent}
  //       />
  //     </div>
  //   );
}
