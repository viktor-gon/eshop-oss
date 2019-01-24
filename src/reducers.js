const initialState = {
	  totalCount: 0,
      totalPrice: 0,
      averagePrice: 0,
      arrayOfGoods: [],
      isAdminUser: true   // set to true or false to test admin & simple mode
}

const todos = (state = initialState, action) => {
  if ( action.type === "ADD_ITEM" )
  {

  	 //console.log(state, action);
  	 var stateNew = Object.assign({},state);
  	 stateNew.totalCount +=1;
  	 stateNew.totalPrice += action.item.price*1;
  	 stateNew.arrayOfGoods = [...stateNew.arrayOfGoods,action.item];
  	 return stateNew;
  }
  else
  if ( action.type === "DEL_ITEM" )
  {
  	 //console.log(state, action);

  	 stateNew = Object.assign({},state);
  	 stateNew.totalCount -=1;
  	 stateNew.totalPrice -= action.item.price*1;  

  	 // have also delete from localStorage
  	 // by calling callBackStatistic
  	 // from CardItem.js

 	 const allGoods = stateNew.arrayOfGoods;
     var newStorage = [];
        

      // search for index to delete
      var i = 0;
       for ( i = 0; i < allGoods.length; i++ )
            if ( allGoods[i].id !== action.item.id )
              newStorage.push(allGoods[i]);

       //console.log('new all goods',newStorage);
        
       stateNew.arrayOfGoods = newStorage;             
         //console.log(i, newStorage);
         //newStorage.splice(i,1);         
         //console.log(newStorage);           	 

  	 return stateNew; 
  }
  else
  if ( action.type === "DEL_ALL" )
  {
  	stateNew = Object.assign({},initialState);
  	return stateNew;
  }

  return state;
}

export default todos
