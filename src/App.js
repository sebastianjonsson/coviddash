import { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import CovidDash from './covidDash';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={["/", "/covid"]} component={CovidDash} />
        </Switch>
      </Router>
    );
  }
}

export default App;