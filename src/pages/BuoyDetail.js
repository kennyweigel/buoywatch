import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

class BuoyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buoyId: props.match.params.buoyId,
      rows: []
    };
  }

  componentDidMount() {
    const self = this;
    // get data
    // 
    axios.get(`https://e4qmjukqw8.execute-api.us-east-1.amazonaws.com/dev/buoy/${this.state.buoyId}`)
      .then(function (response) {
        // handle success
        console.log(response);
        self.setState({
          rows: response.data.data.map(row => {
            row.key = `${row.Year}_${row.Month}_${row.Day}_${row.Hour}_${row.Minute}`;
            return row;
          })
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  render() {
    return (
      <Container>
        Buoy Detail - {this.props.match.params.buoyId}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align="right">Wind Direction</TableCell>
              <TableCell align="right">Wind Speed</TableCell>
              <TableCell align="right">Wave Height</TableCell>
              <TableCell align="right">Wave Period</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => (
              <TableRow key={row.key}>
                <TableCell component="th" scope="row">
                  {`${row.Hour}:${row.Minute < 10 ? '0' + row.Minute : row.Minute}`}
                </TableCell>
                <TableCell align="right">{row.WindDirection} degress</TableCell>
                <TableCell align="right">{row.WindSpeed} mph</TableCell>
                <TableCell align="right">{row.WaveHeight} m</TableCell>
                <TableCell align="right">{row.WaveDominantPeriod} s</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    );
  }
}

export default BuoyDetail;
