import { Component } from 'react';

class RoundCents extends Component{

round(value)
{
	//if (Math.abs(value*1) < 0.0001 )
	//	return 0
	//else
		return Math.round(value*100)/100;
}

render(){
		return(
			 this.round(this.props.value)
			)
	}
}

export default RoundCents