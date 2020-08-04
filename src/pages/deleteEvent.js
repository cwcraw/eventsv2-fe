import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export default function DeleteEvent(props) {
    const classes = useStyles();
    let eventArray = props.eventsProp.events || [{id:'',event:' '}]
  return (
    <> 
              <h2>Please delete an event here</h2>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Event Title</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name="eventId"
          id="demo-simple-select"
          value={props.editEventProp.id}
          onChange={(e) => {props.handleChangeDeleteEvent(e)}}
        > 
            {eventArray.map((el) => {
                return (<MenuItem value={el.eventId}>{el.event}</MenuItem>)
            })}
        </Select>
      </FormControl>
      <form>
        <Button
          type="delete"
          variant="contained"
          color="primary"
          onClick={(e) => {
            props.handleSubmitDeleteEvent(e);
          }}
        >
          Delete Event
        </Button>
      </form>
    </>
  );
}
