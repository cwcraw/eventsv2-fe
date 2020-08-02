import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import NotesIcon from "@material-ui/icons/Notes";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import Events from "./events";
// import Account from "./account";

export default function Home(props) {
  console.log(props);
  return (
    <div>
      <List>
        <ListItem
          button
          key="Event"
          onClick={(e) => {
            props.loadEventPage(e);
          }}
        >
          <ListItemIcon>
            {" "}
            <NotesIcon />{" "}
          </ListItemIcon>
          <ListItemText primary="Event" />
        </ListItem>

        <ListItem
          button
          key="Account"
          onClick={(e) => {
            props.loadAccountPage(e);
          }}
        >
          <ListItemIcon>
            {" "}
            <AccountBoxIcon />{" "}
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>

        <ListItem
          button
          key="Logout"
          onClick={() => {
            props.logoutHandler(props.history);
          }}
        >
          <ListItemIcon>
            {" "}
            <ExitToAppIcon />{" "}
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>

      {/* <div>{props.renderProp.render ? <Account account = {props.homeProp} /> : <Events />}</div> */}
    </div>
  );
}
