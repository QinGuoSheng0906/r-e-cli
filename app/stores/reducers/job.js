/*
   定义job reducer
*/
import { JOB } from '../actions/actionTypes';
import { jobs } from '../states/index';
const Jobs =  function (state = jobs, action){
   switch (action.type) {
   case JOB :
      return [
         ...action.data
      ]
   default :
      return state;
   }
};

export default Jobs;