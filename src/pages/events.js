import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function Login(props) {
  const classes = useStyles();
  console.log(props)
  console.log(props.eventsProp.events)
  let eventArray = props.eventsProp.events || [{event:''}]
  console.log(eventArray[0])
  return <div>
      {props.homeProp.email}
      {props.homeProp.username}
      
      {eventArray.map(el => <li>{el.event}</li>)}
      test

      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventArray.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.event}
              </TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">TBD</TableCell>
              <TableCell align="right">{row.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>;
}
