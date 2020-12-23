import { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import CovidDash from './covidDash/covidDash';

document.body.style.backgroundColor = "#282c34";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path={["/", "/covid"]} component={CovidDash} />
          </Switch>
        </Router>
        </>
    )
  }
}

export default App;