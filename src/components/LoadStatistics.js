import {Component} from 'react';
import {connect} from 'react-redux'

class LoadStatistic extends Component{

    componentDidMount()
    {
 		fetch("data/goods.json",{mode: 'no-cors'})
        .then(res => res.json())
        .then(
          (result) => {
            //console.log('didmount', result.goods)
            const locaStorageGoods = JSON.parse(localStorage.getItem('eshop_local_data'));
 

            //console.log(locaStorageGoods);
            //console.log('didmount', result.goods)
            //console.log('didmount', locaStorageGoods)
            var arrayTotal = [...result.goods];

            if ( locaStorageGoods !== null )
				arrayTotal = [...result.goods,...locaStorageGoods];
            //console.log(arrayTotal);

            // add all statistic to 'store' and data!

            for ( var i = 0; i < arrayTotal.length; i++ )
            	this.props.onAddItem(arrayTotal[i]);
        	


            //console.log(this.state.contacts[0]);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log("error loading items data");
            /*this.setState({
              isLoaded: true,
              error
            });*/
          }
        )           	
    }

	render()
	{
		return('')
	}
}

export default connect( 
   state => ({store: state}),
   dispatch => ({ onAddItem: (item) => {
    dispatch({ type: 'ADD_ITEM', item: item })
   }

   })
  )(LoadStatistic);