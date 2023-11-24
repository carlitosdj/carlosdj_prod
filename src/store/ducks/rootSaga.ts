import {all, takeLatest} from 'redux-saga/effects'

import {CartsTypes} from './carts/types'
import {loadCarts, createCart} from './carts/sagas'

import {UsersTypes} from './users/types'
import {
  loadUsers,
  // findUserId,
  searchUser,
  createUser,
  updateUser,
  deleteUser,
} from './users/sagas'

import {MeTypes} from './me/types'
import {
  loginUser,
  createMe,
  updateMe,
  deleteMe,
  recoveryUser,
  loadMe,
  changePassMe,
} from './me/sagas'

import {ComponentTypes} from './component/types'
import {
  loadComponent,
  createComponent,
  updateComponent,
  deleteComponent,
  createExtra,
  updateExtra,
  deleteExtra,
  loadComponentByDescription,
  loadModules,
  loadClasses,
  createAulaConcluida,
  deleteAulaConcluida,
  createRate,
  searchComponent,
  loadLastLiveClass,
  loadLastClass,
  createTimeWatched,
  loadComponentWithAccess,
  // uploadExtra
} from './component/sagas'

import {LeadTypes} from './lead/types'
import {loadLead, createLead, confirmLead, notDisturbLead} from './lead/sagas'

import {LeadsTypes} from './leads/types'
import {loadLeads, searchLeads} from './leads/sagas'

import {CourseTypes} from './course/types'
import {loadCourse} from './course/sagas'

import {ListsTypes} from './lists/types'
import {loadLists} from './lists/sagas'

import {EmailToListTypes} from './email/types'
import {createEmailToList, loadEmailToList} from './email/sagas'

import {AnnotationTypes} from './annotation/types'
import {loadAnnotationsSingle, createAnnotation} from './annotation/sagas'
import {AnnotationsTypes} from './annotations/types'
import {deleteAnnotation, loadMyAnnotations} from './annotations/sagas'

import {SupportsTypes} from './support/types'
import {createSupport, loadAllsupports, loadSupports, updateSupport} from './support/sagas'

import {
  createWppcamp,
  deleteWppcamp,
  loadAllwppcamps,
  loadWppcamps,
  loadWppgroupavailable,
  updateWppcamp,
} from './wppcamp/sagas'
import {WppcampTypes} from './wppcamp/types'

import {WppgroupTypes} from './wppgroup/types'
import {createWppgroup, deleteWppgroup, loadWppgroups, updateWppgroup} from './wppgroup/sagas'

import {StateTypes} from './state/types'
import {CityTypes} from './city/types'
import {loadState} from './state/sagas'
import {loadCity} from './city/sagas'
import {CommentTypes} from './comments/types'
import {createComment, createCommentWithParent, deleteComment, deleteCommentWithParent, loadComments, updateComment, updateCommentWithParent} from './comments/sagas'

export default function* rootSaga() {
  yield all([
    takeLatest(CartsTypes.LOAD_CART_REQUEST, loadCarts),
    takeLatest(CartsTypes.CREATE_CART_REQUEST, createCart),
    //takeLatest(UsersTypes.CREATE_USER_REQUEST, createUser),

    //Me
    takeLatest(MeTypes.LOGIN_USER_REQUEST, loginUser),
    takeLatest(MeTypes.UPDATE_USER_REQUEST, updateMe),
    takeLatest(MeTypes.CHANGEPASS_USER_REQUEST, changePassMe),
    takeLatest(MeTypes.CREATE_USER_REQUEST, createMe),
    takeLatest(MeTypes.DELETE_USER_REQUEST, deleteMe),
    takeLatest(MeTypes.RECOVERY_USER_REQUEST, recoveryUser),
    takeLatest(MeTypes.LOAD_ME_REQUEST, loadMe),

    //Users
    takeLatest(UsersTypes.LOAD_USERS_REQUEST, loadUsers),
    takeLatest(UsersTypes.UPDATE_USER_REQUEST, updateUser),
    takeLatest(UsersTypes.CREATE_USER_REQUEST, createUser),
    takeLatest(UsersTypes.DELETE_USER_REQUEST, deleteUser),
    takeLatest(UsersTypes.SEARCH_USERS_REQUEST, searchUser),

    //Components
    takeLatest(ComponentTypes.LOAD_COMPONENT_REQUEST, loadComponent),
    takeLatest(ComponentTypes.LOAD_COMPONENT_WITH_ACCESS_REQUEST, loadComponentWithAccess),
    takeLatest(ComponentTypes.SEARCH_REQUEST, searchComponent),

    takeLatest(ComponentTypes.LOAD_COMPONENT_BY_DESC_REQUEST, loadComponentByDescription),
    takeLatest(ComponentTypes.CREATE_COMPONENT_REQUEST, createComponent),
    takeLatest(ComponentTypes.UPDATE_COMPONENT_REQUEST, updateComponent),
    takeLatest(ComponentTypes.DELETE_COMPONENT_REQUEST, deleteComponent),
    takeLatest(ComponentTypes.LOAD_MODULES_REQUEST, loadModules),
    takeLatest(ComponentTypes.LOAD_CLASSES_REQUEST, loadClasses),
    takeLatest(ComponentTypes.LOAD_LASTLIVECLASS_REQUEST, loadLastLiveClass),
    takeLatest(ComponentTypes.LOAD_LASTCLASS_REQUEST, loadLastClass),

    //Course
    takeLatest(CourseTypes.LOAD_COURSE_REQUEST, loadCourse),

    //Extras
    takeLatest(ComponentTypes.CREATE_EXTRA_REQUEST, createExtra),
    takeLatest(ComponentTypes.UPDATE_EXTRA_REQUEST, updateExtra),
    takeLatest(ComponentTypes.DELETE_EXTRA_REQUEST, deleteExtra),
    // takeLatest(ComponentTypes.UPLOAD_EXTRA_REQUEST,uploadExtra),

    //Lead
    takeLatest(LeadTypes.LOAD_LEAD_REQUEST, loadLead),
    takeLatest(LeadTypes.CREATE_LEAD_REQUEST, createLead),
    takeLatest(LeadTypes.CONFIRM_LEAD_REQUEST, confirmLead),
    takeLatest(LeadTypes.NOTDISTURB_LEAD_REQUEST, notDisturbLead),

    //EmailToList
    takeLatest(EmailToListTypes.LOAD_EMAIL_TO_LIST_REQUEST, loadEmailToList),
    takeLatest(EmailToListTypes.CREATE_EMAIL_TO_LIST_REQUEST, createEmailToList),

    //All leads
    takeLatest(LeadsTypes.LOAD_LEAD_REQUEST, loadLeads),
    takeLatest(LeadsTypes.SEARCH_LEADS_REQUEST, searchLeads),

    //All lists
    takeLatest(ListsTypes.LOAD_LISTS_REQUEST, loadLists),

    //Annotations
    takeLatest(AnnotationTypes.LOAD_ANNOTATION_SINGLE_REQUEST, loadAnnotationsSingle),
    takeLatest(AnnotationTypes.CREATE_ANNOTATION_REQUEST, createAnnotation),

    takeLatest(AnnotationsTypes.LOAD_MY_ANNOTATIONS_REQUEST, loadMyAnnotations),
    takeLatest(AnnotationsTypes.DELETE_ANNOTATION_REQUEST, deleteAnnotation),

    //AulaConcluida
    takeLatest(ComponentTypes.CREATE_AULACONCLUIDA_REQUEST, createAulaConcluida),
    takeLatest(ComponentTypes.DELETE_AULACONCLUIDA_REQUEST, deleteAulaConcluida),
    takeLatest(ComponentTypes.CREATE_RATE_REQUEST, createRate),
    takeLatest(ComponentTypes.CREATE_TIMEWATCHED_REQUEST, createTimeWatched),

    //Support
    takeLatest(SupportsTypes.LOAD_ALLSUPPORT_REQUEST, loadAllsupports),
    takeLatest(SupportsTypes.LOAD_SUPPORT_REQUEST, loadSupports),
    takeLatest(SupportsTypes.CREATE_SUPPORT_REQUEST, createSupport),
    takeLatest(SupportsTypes.UPDATE_SUPPORT_REQUEST, updateSupport),

    //Wppcamp
    takeLatest(WppcampTypes.LOAD_ALLCAMP_REQUEST, loadAllwppcamps),
    takeLatest(WppcampTypes.LOAD_CAMP_REQUEST, loadWppcamps),
    takeLatest(WppcampTypes.CREATE_CAMP_REQUEST, createWppcamp),
    takeLatest(WppcampTypes.UPDATE_CAMP_REQUEST, updateWppcamp),
    takeLatest(WppcampTypes.DELETE_CAMP_REQUEST, deleteWppcamp),
    takeLatest(WppcampTypes.LOAD_WPPGROUPAVAILABLE_REQUEST, loadWppgroupavailable),

    //Wppgroup
    takeLatest(WppgroupTypes.LOAD_WPPGROUPS_REQUEST, loadWppgroups),
    takeLatest(WppgroupTypes.CREATE_WPPGROUP_REQUEST, createWppgroup),
    takeLatest(WppgroupTypes.UPDATE_WPPGROUP_REQUEST, updateWppgroup),
    takeLatest(WppgroupTypes.DELETE_WPPGROUP_REQUEST, deleteWppgroup),

    takeLatest(StateTypes.LOAD_STATES_REQUEST, loadState),
    takeLatest(CityTypes.LOAD_CITIES_REQUEST, loadCity),
    // takeLatest(ExtraTypes.LOAD_EXTRAS_REQUEST,loadExtras),
    // takeLatest(ExtraTypes.CREATE_EXTRA_REQUEST,createExtra),
    // takeLatest(ExtraTypes.UPDATE_EXTRA_REQUEST,updateExtra),
    // takeLatest(ExtraTypes.DELETE_EXTRA_REQUEST,deleteExtra),

    //Comments
    takeLatest(CommentTypes.LOAD_COMMENTS_REQUEST, loadComments),
    takeLatest(CommentTypes.CREATE_COMMENT_REQUEST, createComment),
    takeLatest(CommentTypes.CREATE_COMMENT_WITH_PARENT_REQUEST, createCommentWithParent),
    takeLatest(CommentTypes.UPDATE_COMMENT_REQUEST, updateComment),
    takeLatest(CommentTypes.UPDATE_COMMENT_WITH_PARENT_REQUEST, updateCommentWithParent),
    takeLatest(CommentTypes.DELETE_COMMENT_REQUEST, deleteComment),
    takeLatest(CommentTypes.DELETE_COMMENT_WITH_PARENT_REQUEST, deleteCommentWithParent),
  ])
  // console.log('mounting saga...')
}
