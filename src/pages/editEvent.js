import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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

export default function AddEvent(props) {
    const classes = useStyles();
    let eventArray = props.eventsProp.events || [{id:'',event:' '}]
  return (
    <> 
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Event Title</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name="eventId"
          id="demo-simple-select"
          value={props.editEventProp.id}
          onChange={(e) => {props.handleChangeEditEvent(e)}}
        > 
            {eventArray.map((el) => {
                return (<MenuItem value={el.eventId}>{el.event}</MenuItem>)
            })}
        </Select>
      </FormControl>
      <form>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="editEvent"
          label="Edit Event Title"
          name="event"
          autoFocus
          onBlur={(e) => {
            props.handleChangeEditEvent(e);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="location"
          label="Edit Location"
          type="Location"
          id="editlocation"
          autoComplete="Location"
          onBlur={(e) => {
            props.handleChangeEditEvent(e);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="Date and Time"
          type="Datetime-local"
          id="editTime"
          autoComplete="Date"
          onBlur={(e) => {
            props.handleChangeEditEvent(e);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="note"
          label="Edit Details"
          type="Details"
          id="editNote"
          autoComplete="Details"
          onBlur={(e) => {
            props.handleChangeEditEvent(e);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={(e) => {
            props.handleSubmitEditEvent(e);
          }}
        >
          Edit Event
        </Button>
      </form>
    </>
  );
}
