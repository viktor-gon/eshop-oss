import React, { Component } from 'react';
import LogoImage from '../logo/logo.png';

class Logo extends Component{

	render(){
		return (
			 <img src={LogoImage} alt='company logo'/>
			)
	}
}

export default Logo