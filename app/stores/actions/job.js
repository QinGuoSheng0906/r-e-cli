import { JOB } from './actionTypes'

function newJob (data) {
   return {
      type: JOB,
      data
   }
}


export default{
   newJob
}