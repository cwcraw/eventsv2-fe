import React from "react";

export default function Account(props) {
  return (
    <>
      <div>Welcome to your event tracker, {props.account.username}</div>
      <div>You are logged in with the email: {props.account.email}</div>
    </>
  );
}
