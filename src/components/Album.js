import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
//import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
//import CameraIcon from '@material-ui/icons/PhotoCamera';
//import Logo from './Logo'
//import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
//import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
//import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import CardItem from './CardItem'
//import Statistic from './Statistic'
import {connect} from 'react-redux'
//import HeaderMenu from './HeaderMenu'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});


class Album extends Component{

constructor(props) {
    super(props);

    /*this.state = {
      goods: [],      // items from static JSON
      localGoods:[]   // items for dinamyc data from localStorage
    } */ 

    this.deleteAllItems = this.deleteAllItems.bind(this);
    this.callBackStatistic = this.callBackStatistic.bind(this);
  } 

deleteAllItems()
{
  //this.setState({goods: [], localGoods: []});
  this.props.onClickDeleteAll();
  // clear local storage
  localStorage.setItem('eshop_local_data',JSON.stringify([]));
}


callBackStatistic(operation,data)
{
   // delete items from localStorage

   if ( operation === "del" )
   {
      if ( data.local ) // delete from localStorage
      {
         // create new object and rewrite local storage!
         const allGoods = this.props.store.arrayOfGoods;
         var newStorage = [];

         //console.log(allGoods,allGoods.length,data.id);

         // search for index to delete
         var i = 0;
         for ( i = 0; i < allGoods.length; i++ )
            if ( allGoods[i].local && allGoods[i].id !== data.id )
              newStorage.push(allGoods[i]);

        //console.log(newStorage);
                     
         //console.log(i, newStorage);
         //newStorage.splice(i,1);         
         //console.log(newStorage);         
         localStorage.setItem('eshop_local_data',JSON.stringify(newStorage));
      }
   }
   
   // force update
   //this.setState({});
}

  
  render(){

    //console.log('render', this.state.goods.length);
    const { classes } = this.props;

    return (
    <React.Fragment>
  
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              Catalog of items v2
            </Typography>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>
            {                     
              this.props.store.arrayOfGoods ?                 
              this.props.store.arrayOfGoods.map(itemToSell => (
              <CardItem item={itemToSell} key={itemToSell.id} classes={classes} callBackStatistic={this.callBackStatistic}/>
            )) : <h1>The catalog is empty...</h1>
                 
            
           }            
          </Grid>    
        </div>
      </main>
      {/* Footer */}
     

              {
                this.props.store.isAdminUser?
                <div style={{textAlign: 'center'}}>
                  <Button variant="contained" size="large" color="primary" onClick={this.deleteAllItems}>
                    Delete all items
                  </Button>
                </div>:<span></span>
              }        
      {/* End footer */}
    </React.Fragment>
  )};
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};


  export default connect( 
   state => ({store: state}),
   dispatch => ({ onClickDeleteAll: () => {
    dispatch({ type: 'DEL_ALL' })
   }

   })
  )(withStyles(styles)(Album));
