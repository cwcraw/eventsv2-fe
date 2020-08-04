import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function AddEvent(props) {
  return (
    <>
      <h2>Please add an event here:</h2>

      <form>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="event"
          label="Event Title"
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
          label="Location"
          type="Location"
          id="location"
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
          name="time"
          type="Datetime-local"
          id="time"
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
          label="Details"
          type="Details"
          id="note"
          autoComplete="Details"
          onBlur={(e) => {
            props.handleChangeEditEvent(e);
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(e) => {
            props.handleSubmitAddEvent(e);
          }}
        >
          Add Event
        </Button>
      </form>
    </>
  );
}
