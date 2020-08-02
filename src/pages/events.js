import React from "react";

export default function Login(props) {
    console.log(props)
  return <div>
      {props.homeProp.email}
      {props.homeProp.username}
      test
      </div>;
}
