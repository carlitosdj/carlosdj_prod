/**
 * Action types
 */
export enum CartsTypes {
  //Load
  LOAD_CART_REQUEST = '@cart/LOAD_CART_REQUEST',
  LOAD_CART_SUCCESS = '@cart/LOAD_CART_SUCCESS',
  LOAD_CART_FAILURE = '@cart/LOAD_CART_FAILURE',

  //Create
  CREATE_CART_REQUEST = '@cart/CREATE_CART_REQUEST',
  CREATE_CART_SUCCESS = '@cart/CREATE_CART_SUCCESS',
  CREATE_CART_FAILURE = '@cart/CREATE_CART_FAILURE',
}

/**
 * Data types
 */
export interface Cart {
  id?: number
  parentComponent?: number
  parentUser?: number
  unityprice?: number
  quantity?: number
  discount?: number
  total?: number
  tax?: number
  createdAt?: number
  status?: number
  description?: string
  numcartao?: string
  nomecartao?: string
  validade?: string
  codcartao?: string
  parcelas?: number
  origin?: string
}

/**
 * State type
 */
export interface CartsState {
  readonly data: Cart
  readonly loading: boolean
  readonly error: boolean
}
