import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from 'react-router-dom'

import ViewCatalog from './ViewCatalog';
import HeaderMenu from './components/HeaderMenu';
//import CardItem from './components/CardItem';
import Statistic from './components/Statistic';
import Logo from './components/Logo';
import AddItem from './components/AddItem';
import LoadStatistic from './components/LoadStatistics'

import AppBar from '@material-ui/core/AppBar';
//import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
//import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import { withStyles } from '@material-ui/core/styles';

const iViewCatalog = () => <ViewCatalog />;
const iAddItem = () => <AddItem/>;
//const iAbout = () => <h2>About</h2>;

class App extends Component{

  render(){
  return(
  <Router>
    <div>

      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
         <HeaderMenu />
          <Logo alt='company logo'/>
          <Typography variant="h6" color="inherit" noWrap>
            Company logo
          </Typography>
        </Toolbar>
      </AppBar>    
       
      <LoadStatistic />

      <Switch>
        <Route path="/" component={iViewCatalog} />        
        <Route path="/additem/" component={iAddItem} /> 
      </Switch>

      <Statistic/>
    </div>
  </Router>

)}
}

export default App;
