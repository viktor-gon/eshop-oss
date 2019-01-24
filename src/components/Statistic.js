import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import RoundCents from './RoundCents'
import {connect} from 'react-redux'

class Statistic extends Component{

	render(){
    //console.log('render statistic:', this.props.store );
		//const stat = this.props.statistic;
		const totalPrice = Math.round(this.props.store.totalPrice*100)/100;
    const totalCount = this.props.store.totalCount;
		return (
			<div>
	        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Total count: {totalCount}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">         
          Total price: $<RoundCents value={totalPrice} />           
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">  

          Average price: $<RoundCents value={totalCount?totalPrice/totalCount: 0} /> 
        </Typography>
        </div>
			)
	}

}

export default connect( 
   state => ({store: state}),
   dispatch => ({})
  )(Statistic);