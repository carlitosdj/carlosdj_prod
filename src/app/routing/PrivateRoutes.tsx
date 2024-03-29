import React from 'react'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import {Trainning} from "../pages/Trainning"
import {Modules} from "../pages/onlinecourse/modules/Modules"
import {Class} from "../pages/onlinecourse/class/Class"
import {Annotation} from "../pages/onlinecourse/annotation/Annotation"
import {Agenda} from "../pages/onlinecourse/agenda/Agenda"
import Suporte from "../pages/onlinecourse/support"
import Search from '../pages/search'
//import { AuthPage } from '../modules/auth'
import ChangePassInternal from '../pages/changepassinternal'
import { EditProfile } from '../pages/profile/edit/EditProfile'

import { MyProfile } from '../pages/profile/view/MyProfile'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../store'
import { Replay } from '../pages/onlinecourse/replay/Replay'
import Renovation from '../pages/renovation/Renovation'
const MOMENT = require('moment')
// import ChangePass from '../../app/modules/'

export function PrivateRoutes() {
  //console.log("Bateu aqui..")
  const me = useSelector((state: ApplicationState) => state.me)
  console.log("ME*************", me)
  //const navigate = useNavigate()

  //TRAVA PESSOA QUE NAO TEM PERFIL COMPLETO:
  if (
      !me.me.name ||
      !me.me.whatsapp ||
      !me.me.cpf ||
      !me.me.address ||
      !me.me.addressNumber ||
      !me.me.addressDistrict ||
      // !me.me.addressCountry ||
      !me.me.cityId ||
      !me.me.stateId ||
      !me.me.postalCode
  )
  
  {
    return (
      <Routes>
        <Route path="*" element={<EditProfile/>} />
      </Routes>
    )
  }

  var createdAt = MOMENT(Number(me.me.createdAt) * 1000) //.format('DD/MM/YYYY HH:mm')
  var now = MOMENT(Date()) //.format('DD/MM/YYYY HH:mm')
  let progress = parseInt((now.diff(createdAt, 'years', true)*100).toFixed(2));
  
  if (progress > 100)
    progress = 100;
  
  if(progress === 100) {
    return (
      <Routes>
        <Route path="*" element={<Renovation/>} />
      </Routes>
    )
  }
    //navigate('/edit')

  return (
      <Routes>
        <Route path="onlinecourses" element={<Trainning/>} />

        <Route path="modules">
          <Route path=":id" element={<Modules/>}/>
        </Route>
        <Route path="replay" element={<Replay/>} />
        {/* <Route path="/class/:id/:module_id/:class_id" element={<Class/>} /> */}
        <Route path="class">
          {/* <Route index element={<Class/>} /> */}
          <Route path=":id" element={<Class/>} >
            <Route path=":module_id" element={<Class/>} >
              <Route path=":class_id" element={<Class/>} >
              </Route>
            </Route>
          </Route>
          
        </Route>
        <Route path="annotation" element={<Annotation/>} />
        <Route path="changePass" element={<ChangePassInternal/>} />
        
        {/* <Route path="/agenda/:id?" element={<Agenda/>} /> */}
        <Route path="agenda">
          <Route path=":id" element={<Agenda/>}/>
        </Route>
        <Route path="mysupport" element={<Suporte/>} />
        <Route path="search" element={<Search/>} />

        <Route path='/edit' element={<EditProfile/>} />
        {/* <Route path="profile">
          <Route path=":id" element={<ViewProfile/>}/>
        </Route> */}
        <Route path="myprofile" element={<MyProfile/>} />

        
        
        {/* <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/onlinecourses' />
        <Redirect to='error/404' /> */}
        <Route path ="/auth/login" element={<Navigate to="/onlinecourses"/>} />
        <Route path="index.html" element={<Navigate to="/onlinecourses"/>} />
        <Route path="/index.html" element={<Navigate to="/onlinecourses"/>} />
        <Route index element={<Navigate to="/onlinecourses"/>} />
        {/* <Route path="*" element={<Navigate to="error"/>} /> */}
      </Routes>
    
  )
}
