import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const handleChange = (e) => {
      this.setState({ newBuoyId: e.target.value })
    }

    const handleKeyUp = (e) => {
      if (e.key === 'Enter') {
        changeBuoy();
      }
    }

    const changeBuoy = () => {
      console.log(this.state.newBuoyId);
      this.props.history.push(`/buoy/${this.state.newBuoyId}`);
    }

    return (
      <Container>
        <div>
          <TextField
            id="standard-name"
            label="Name"
            className={'asdf'}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            margin="normal"
            onClick={changeBuoy}>
            Hello World
          </Button>
        </div>
      </Container>
    );
  }
}

export default Home;
