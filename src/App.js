import './App.css';
import Home from './components/Home';
import Ideas from './components/Ideas';
import Register from './components/Register';
import Admin from './components/Admin';
import AdminPanel from './components/AdminPanel';
import TransactionsProvider from './context/TransactionContext';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {


  return (


    <Router>
      <Switch>
        <TransactionsProvider>
          <Route exact path="/" component={Home} />
          <Route exact path="/bid" component={Ideas} />
          <Route exact path="/registration" component={Register} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/adminpanel" component={AdminPanel} />
        </TransactionsProvider>
      </Switch>
    </Router>


  );
}

export default App;
