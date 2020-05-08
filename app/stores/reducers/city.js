/*
   定义Home reducer
*/
import { CITYS } from '../actions/actionTypes';
import { citys } from '../states/index';
const Citys =  function (state = citys, action){
   switch (action.type) {
   case CITYS :
      return [
         ...state,
         ...action.data
      ]
   default :
      return state;
   }
};

export default Citys;