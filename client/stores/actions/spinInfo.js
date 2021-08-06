/*
* 全局通用loading
*/

import { UPDATE_LOADING } from '../action-type/spinInfo'

export function updateSpin (data) {
   return {
      type: UPDATE_LOADING,
      data
   };
}