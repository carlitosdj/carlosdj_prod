import React, {useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {useDispatch} from 'react-redux'
import {Navigate, Route, Routes} from 'react-router-dom'
import {logoutUser} from '../../../store/ducks/me/actions'
import { User } from '../../../store/ducks/users/types'

// import * as auth from './redux/AuthRedux'

export function Logout() {
  const dispatch = useDispatch()

  const [cookies, setCookie, removeCookie] = useCookies(['user_associacao'])
  const cookieUser: User = cookies.user_associacao
  //console.log('########### cookies', cookies)
  removeCookie('user_associacao', {path: '/'})
  useEffect(() => {
    dispatch(logoutUser())
    document.location.reload()
  }, [cookieUser])
  
    return (
      <Routes>
        <Route index element={<Navigate to='/'/>} />
      </Routes>
    )
  
  
}
