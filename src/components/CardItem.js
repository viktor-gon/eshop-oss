import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux'

class CardItem extends Component{

constructor(props) {
    super(props);
    this.state = {
    	isOpened: true
    }

    this.deleteItem = this.deleteItem.bind(this);
  }	

deleteItem()
{
	this.setState( {isOpened: false})	 	

 	this.props.callBackStatistic('del',this.props.item);
  this.props.onClickItem(this.props.item);
}

roundPrice(price)
{
	return Math.round(price*100)/100;
}

 render() {
 	//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

 	const classes = this.props.classes;

 	if ( this.state.isOpened )
 	{
 		
 	return(
 		
 		         <Grid item sm={6} md={4} lg={3} >

                <Card className={classes.card}>
                {
                  this.props.store.isAdminUser?
          		    <Button variant="outlined" size="medium" color="primary" onClick={this.deleteItem}>
                      X
                  </Button>:<span></span>
                }

                  <CardMedia
                    className={classes.cardMedia}
                    image = { '/eshop-oss/images/item-icons/'+this.props.item.icon}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                     {this.props.item.name}
                    </Typography>
                    <Typography>
                      {this.props.item.description}
                    </Typography>
      				      <Typography variant="h6">
                      Price: ${this.roundPrice(this.props.item.price)}
                    </Typography>                    
                  </CardContent>
                  <CardActions>        
        
                  </CardActions>
                </Card>
              </Grid>
 )
 }
 else
 { 
 	return ('');
 }
}

}

//export default CardItem

export default connect( 
   state => ({store: state}),
   dispatch => ({ onClickItem: (item) => {
    dispatch({ type: 'DEL_ITEM', item: item })
   }

   })
  )(CardItem);