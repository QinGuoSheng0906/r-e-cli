import { CITYS } from './actionTypes'

function newCity (data) {
   return {
      type: CITYS,
      data
   }
}


export default{
   newCity
}