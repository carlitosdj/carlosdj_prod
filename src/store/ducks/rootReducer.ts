import {combineReducers} from 'redux'
// import repositories from './repositories';
import carts from './carts'
import users from './users'
import me from './me'
import component from './component'
import extras from './extras'
import lead from './lead'
import leads from './leads'
import course from './course'
import lists from './lists'
import emailToList from './email'
import annotation from './annotation'
import annotations from './annotations'
import supports from './support'
import wppcamp from './wppcamp'
import wppgroup from './wppgroup'
import city from './city'
import state from './state'

export default combineReducers({
  carts,
  users,
  me,
  component,
  extras,
  lead,
  leads,
  course,
  lists,
  emailToList,
  annotation,
  annotations,
  supports,
  wppcamp,
  wppgroup,
  city,
  state,
})
