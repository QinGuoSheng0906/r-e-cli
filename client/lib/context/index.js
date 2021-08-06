/*
   全局 context 多级props传递
*/
import { createContext } from 'react'

const { Provider, Consumer } = createContext();

export default{
   Provider,
   Consumer
}