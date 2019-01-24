import React, {Component} from 'react';

import PropTypes from 'prop-types';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
//import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import Snackbar from '@material-ui/core/Snackbar';

import AccessDenied from './AccessDenied'

import {connect} from 'react-redux'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});



class AddItem extends Component {

  constructor(props) {
     super(props);

     this.state = {
      name: "Product Name",
      description: "This is some nice description",
      price: 1,
      warning: '',
      success: ''      
     }

     this.onChangeName = this.onChangeName.bind(this);
     this.onChangeDescription = this.onChangeDescription.bind(this);
     this.onChangePrice = this.onChangePrice.bind(this);
     this.onClickAddButton = this.onClickAddButton.bind(this);
     this.hashCode = this.hashCode.bind(this);

     this.itemsLocal = [{}];
  }
  

  onChangeName(e){
      this.setState( {name: e.target.value});
  }

  onChangeDescription(e){
      this.setState( {description: e.target.value});
  }

  onChangePrice(e){
      this.setState( {price: e.target.value});
  }

  hashCode(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
  }

  componentDidMount()
  {
    // load catalog before adding new items
    this.itemsLocal = JSON.parse(localStorage.getItem('eshop_local_data'));

    if ( this.itemsLocal === null )
      this.itemsLocal = [{}];
  }

  onClickAddButton()
  {
    //console.log(this.itemsLocal);
    //console.log(this.hashCode(this.state.name+state.description)); 
    const hash = this.hashCode(this.state.name+this.state.description);

    //console.log('Lenght:', this.itemsLocal.length);    
    for ( var i = 0; i < this.itemsLocal.length; i++ )
    {
       if ( this.itemsLocal[i].id === hash )
       {
          console.log('dubl');
          this.setState({success:"",warning: "This item allready exists in database"});
          return; // allready have this item. no dublications allowed
       }
    } 

    this.setState({warning: "",success: "New item has been successfully added"});   

    const newItem = {
      "id": hash,
       "icon": 'local.png',
       "name": this.state.name,
       "description": this.state.description,
       "price": this.state.price,
       "local": true
    }
    //console.log(this.state.name,this.state.description,this.state.price);

    this.itemsLocal.push(newItem);
    //console.log(newItem);
    localStorage.setItem('eshop_local_data',JSON.stringify(this.itemsLocal));

    //store.dispatch( { type: 'ADD_ITEM' } );
    this.props.onAddItem(newItem);
  }

  render() {
    const { classes } = this.props;
    if ( this.props.store.isAdminUser )
    return (
      <div>
      <h2>Add new item to the catalog:</h2>
      <h3 style={{color: 'red'}}>{this.state.warning}</h3>
      <h3 style={{color: 'green'}}>{this.state.success}</h3>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required          
          label="Product name"
          className={classes.textField}
          placeholder={this.state.name}       
          margin="normal"

          onChange={this.onChangeName}
        />
        <TextField
          required          
          label="Description"
          placeholder={this.state.description}       
          className={classes.textField}
          margin="normal"

          onChange={this.onChangeDescription}
        />
        <TextField
          required         
          label="Price"
          type="number"
          defaultValue={this.state.price}       
          className={classes.textField}
          margin="normal"
          style={{width: '50px'}}

          onChange={this.onChangePrice}
        />        
      </form>

      <Button onClick={this.onClickAddButton} variant="contained" size="large" color="primary">Add</Button>
      </div>
    )
  else
    return (<AccessDenied/>)
  }
}

AddItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect( 
   state => ({store: state}),
   dispatch => ({ onAddItem: (item) => {
    dispatch({ type: 'ADD_ITEM', item: item })
   }

   })
  )(withStyles(styles)(AddItem));