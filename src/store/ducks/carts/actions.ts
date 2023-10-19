import {action} from 'typesafe-actions'
import {CartsTypes, Cart} from './types'

//Load
export const loadCartRequest = () => action(CartsTypes.LOAD_CART_REQUEST)
export const loadCartSuccess = (data: Cart[]) => action(CartsTypes.LOAD_CART_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadCartFailure = () => action(CartsTypes.LOAD_CART_FAILURE)

//Create
export const createCartRequest = (newCart: Cart) => action(CartsTypes.CREATE_CART_REQUEST, newCart)
export const createCartSuccess = (cart: Cart) => action(CartsTypes.CREATE_CART_SUCCESS, cart)
export const createCartFailure = (error: {}) => action(CartsTypes.CREATE_CART_SUCCESS, error)
