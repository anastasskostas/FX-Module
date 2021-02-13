import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const Purchase = React.lazy(() => import('./components/Purchase/Purchase'))
const History = React.lazy(() => import('./components/History/History'))


class App extends Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home" name="Home" render={() => <div className="text-center"><h2 className="mt-5">Welcome</h2></div>} />
            <Route exact path="/purchase" name="Purchase" render={props => <Purchase {...props} />} />
            <Route exact path="/history" name="History" render={props => <History {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
