import {createStore, applyMiddleware, Store} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './ducks/rootReducer'
import rootSaga from './ducks/rootSaga'
import {persistStore} from 'redux-persist'

import {CartsState} from './ducks/carts/types'
import {UsersState} from './ducks/users/types'

import {ComponentState} from './ducks/component/types'
import {ExtrasState} from './ducks/extras/types'
import {LeadState} from './ducks/lead/types'
import {LeadsState} from './ducks/leads/types'
import {CourseState} from './ducks/course/types'
import {ListsState} from './ducks/lists/types'
import {EmailToListState} from './ducks/email/types'
import {AnnotationState} from './ducks/annotation/types'
import {AnnotationsState} from './ducks/annotations/types'
import {SupportState} from './ducks/support/types'
import {WppcampState} from './ducks/wppcamp/types'
import {WppgroupState} from './ducks/wppgroup/types'
import { CityState } from './ducks/city/types'
import { StateState } from './ducks/state/types'
import { MeState } from './ducks/me/types'
// import { AulaConcluidaState } from './ducks/completed/types';

export interface ApplicationState {
  //carts: CartsState
  
  users: UsersState
  me: MeState
  component: ComponentState
  extras: ExtrasState
  lead: LeadState
  leads: LeadsState
  course: CourseState
  lists: ListsState
  emailToList: EmailToListState
  annotation: AnnotationState
  annotations: AnnotationsState
  supports: SupportState
  wppcamp: WppcampState
  wppgroup: WppgroupState
  city: CityState
  state: StateState
  
}

const sagaMiddleware = createSagaMiddleware()
const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default store
