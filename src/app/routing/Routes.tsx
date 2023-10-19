/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, {FC} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {
  // shallowEqual,
  useDispatch,
  useSelector,
} from 'react-redux'
import {MasterLayout} from '../design/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout, AuthPage} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
// import {RootState} from '../../setupOLD'
import {ApplicationState} from '../../store'
import {useCookies} from 'react-cookie'
import {User} from '../../store/ducks/users/types'
import {authfromcookie} from '../../store/ducks/me/actions'

// import ChangePass from '../modules/auth/components/changePass';

const AppRoutes: FC<React.PropsWithChildren<unknown>> = () => {
  // const isAuthorized = useSelector<RootState>(({auth}) => auth.user, shallowEqual)
  // const isAuthorized = false
  const me = useSelector((state: ApplicationState) => state.me)
  //Cookies:
  const [cookies, setCookie] = useCookies(['user_associacao'])
  const cookieUser: User = cookies.user_associacao
  const dispatch = useDispatch()

  // Para o refresh da página:
  if (!me.logged && cookieUser) {
    //console.log("tem cookie user!", cookieUser)
    console.log('Cookie user found routes...', cookieUser)
    dispatch(authfromcookie(cookieUser))
  }
  if (me.logged && !cookieUser) {
    console.log('Está conectado mas sem cookieUser, cadastrando cookie:')
    var date = new Date()
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000) //Days *
    //Seta cookie:
    setCookie('user_associacao', me.me, {
      path: '/',
      expires: date, //maxAge?
    }) 
    // return <div>eai</div>
  }
  console.log("Checando Cookie", cookieUser)
  console.log("Eu", me)

  return (
    <Routes>
      {/* <PublicRoutes/> */}
      {!me.logged && !cookieUser ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route path="/auth/*" element={<AuthPage/>} />
        
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        // <Redirect from='/auth' to='/' />
        <Route path="/auth" element={<Navigate to="/"/>} />
      )}

      <Route path='/error' element={<ErrorsPage />} />
      <Route path='/logout' element={<Logout />} />

      {!me.logged && !cookieUser ? (
        /*Redirect to `/auth` when user is not authorized*/
        /* <Redirect to='/auth/login' /> */
        // <Route element={<Navigate to="/auth/login"/>} />
        <Route index element={<Navigate to="/auth/login"/>} />
      ) : (
        <Route path="/*" 
          element={
          <MasterLayout>
            <PrivateRoutes />
          </MasterLayout>}
        />
      )}
      
      <Route path="index.html" element={<Navigate to="/auth/login"/>} />
      {/* <Route path="*" element={<Navigate to="error"/>} /> */}
    </Routes>
  )
}

export {AppRoutes}
