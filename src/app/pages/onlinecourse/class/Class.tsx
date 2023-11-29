import React, {FC, useEffect} from 'react'
import {PageLink, PageTitle} from '../../../design/layout/core'
import {useIntl} from 'react-intl'
import {useNavigate, useParams, useSearchParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {VideoWidget} from './VideoWidget'
import {MenuClassWidget} from './MenuClassWidget'

import Loading from '../../../design/loading'

import {
  createAulaConcluidaRequest,
  loadClassesRequest,
  loadModulesRequest,
} from '../../../../store/ducks/component/actions'

import {ComponentState} from '../../../../store/ducks/component/types'
import {AnnotationWidget} from './AnnotationWidget'
import {LinksWidget} from './LinksWidget'
import {CommentWidget} from './CommentWidget'

type ParamTypes = {
  id: string
  module_id: string
  class_id: string
}

type Props = {
  comp: ComponentState
  selectedClass: any
  module_id: string
  id: string
  url?: string
  extra_files: any
  extras_links: any
}

const ClassPage: React.FC<React.PropsWithChildren<Props>> = ({
  comp,
  selectedClass,
  module_id,
  id,
  url,
  extra_files,
  extras_links,
}) => (
  <>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-8'>
      <div className='col-xxl-3 order-product-1'>
        <MenuClassWidget
          comp={comp}
          className='card-xxl-stretch mb-xl-3'
          selectedClass={selectedClass}
          module_id={module_id}
          id={id}
        />
      </div>

      <div className='col-xxl-9 order-product-2'>
        <VideoWidget className='mb-0 mb-xxl-0' selectedClass={selectedClass} url={url} />
        <div className='row g-5 gx-xxl-12'>
          <div className='col-xxl-12'>
            <LinksWidget
              className='card-xxl-stretch mb-0'
              extras_files={extra_files}
              extras_links={extras_links}
              url={url}
            />
          </div>
        </div>
      </div>
      <div className='col-xxl-12 order-3'>
        <div className='row g-5 gx-xxl-12'>
        <div className='col-xxl-3'>
            <AnnotationWidget
              className='card-xxl-stretch mb-5 mb-xxl-8'
              selectedClass={selectedClass}
              url={url}
            />
          </div>
          <div className='col-xxl-9'>
            <CommentWidget
              className='card-xxl-stretch mb-5 mb-xxl-8'
              selectedClass={selectedClass}
              url={url}
            />
          </div>
          
        </div>
        
      </div>
    </div>
    {/* end::Row */}
  </>
)

const Class: FC<React.PropsWithChildren<unknown>> = () => {
  const intl = useIntl()
  let {id, module_id, class_id} = useParams<ParamTypes>()
  const component = useSelector((state: ApplicationState) => state.component)
  const me = useSelector((state: ApplicationState) => state.me)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const breadCrumbs: Array<PageLink> = [
    {
      title: 'Todos os cursos',
      path: '/onlinecourses',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: component?.modules[0]
        ? component?.modules[0].parent
          ? '' + component?.modules[0].parent!.name!
          : ''
        : '',
      path: component?.modules[0]
        ? component?.modules[0].parent
          ? '/modules/' + component?.modules[0].parent!.id
          : '#'
        : '#',
      isSeparator: false,
      isActive: false,
    },
    // {
    //   title: '',
    //   path: '',
    //   isSeparator: true,
    //   isActive: false,
    // },
    // {
    //   title: component?.classes[0]? component?.classes[0].parent?.name! : '',
    //   path: '#',
    //   isSeparator: false,
    //   isActive: false,
    // },
  ]

  useEffect(() => {
    // console.log("############ Loading component hey...", { module_id, class_id, me })
    //console.log("COMP AQUI YYYYYYYYYY", component)
    if (component.modules.length === 0) {
      //console.log('Modules lenght = 0, puxando módulos', [module_id, me.me.id!, me.me.numTurma!])
      dispatch(loadModulesRequest(id!, me.me.id!, me.me.numTurma!, 'asc')) //Puxa componentes com seus filhos primários
    }

    if (!component.classes.length || Number(module_id) !== component.classes[0].parent?.id) {
      console.log('Carregando classes..')
      dispatch(loadClassesRequest(module_id!, me.me.id!, component.modules[0]?.orderby))
    }

    // if(!class_id){

    // }

    // console.log("COMP AQUI YYYYYYYYYY", component.classes[0].parent?.orderby)
  }, [me, module_id, class_id, component.modules[0]?.orderby]) //class_id
  //}, [class_id]);

  console.log('########COMPONENT###########', component)
  if (
    component.loading ||
    component.loadingModules ||
    component.loadingClasses

    // !component.modules.length ||
    // !component.classes.length ||
    //Number(module_id) !== component.classes[0].parent?.id
  ) {
    // console.log('Loading?', component.loading)

    // console.log('Modules lenght', component.modules.length)

    return <Loading />
  }

  // console.log('Component?', component)

  let url: string | undefined = ''
  let selectedClass: any = ''
  let extras_files: any = []
  let extras_links: any = []

  //console.log('eeei', class_id)

  if (class_id) {
    //console.log('Caiu aqui')
    //Se tiver aula na url:
    selectedClass = component.classes?.filter((aula: any) => aula.id === Number(class_id))[0]
    let check = selectedClass?.extras?.filter((extra: any) => extra.keyExtra === 'url')[0] //Checa se tem o 'extra' de url.

    if (check) url = check.valueExtra

    extras_files = selectedClass?.extras?.filter((extra: any) => extra.keyExtra === 'file')
    extras_links = selectedClass?.extras?.filter((extra: any) => extra.keyExtra === 'link')
    // console.log('EXTRA-files', extras_files)
  } else {
    //Nenhuma aula está selecionada:
    //console.log("Alguma aula selecionada?", selectedClass)
    //Seleciona a primeira aula não feita, se todas estiverem feitas, seleciona a primeira aula:
    let notDoneClass = component.classes.filter(
      (classfilter: any) =>
        classfilter.completed[0]?.status === null ||
        classfilter.completed[0]?.status === '0' ||
        classfilter.completed?.length === 0
    )[0]

    let allDoneClasses = component.classes.filter(
      (classfilter: any) => classfilter.completed[0]?.status === '1'
    )

    let allclassesInModule = component.classes.length

    console.log("notdone", notDoneClass)
    // console.log("allDone", allDoneClasses.length)
    // console.log("allclassesInModule", allclassesInModule)
    //Verifica se todas as aulas estão concluidas:

    if (!notDoneClass) notDoneClass = component.classes[0]

    if (allDoneClasses.length === allclassesInModule)
      notDoneClass = component.classes[component.classes.length - 1]

    class_id = notDoneClass.id?.toString()
    //navigate.
    //console.log('hey', searchParams)
    //setSearchParams({['class_id']: class_id!})
    //navigate('/class/'+id+'/'+module_id+'/'+class_id)

    // console.log("ver aqui", class_id)
    // console.log("ver aqui 2", component.classes[component.classes.length - 1].id)
    // if(class_id === component.classes[component.classes.length - 1].id) {
    //   notDoneClass = component.classes[component.classes.length - 1]
    // }

    //console.log('ver aqui:',component.classes)
    selectedClass = notDoneClass

    console.log('Selecionando a aula: ', selectedClass)
    let check = selectedClass?.extras?.filter((extra: any) => extra.keyExtra === 'url')[0] //Checa se tem o 'extra' de url.
    if (check) url = check.valueExtra

    extras_files = selectedClass?.extras?.filter((extra: any) => extra.keyExtra === 'file')
    extras_links = selectedClass?.extras?.filter((extra: any) => extra.keyExtra === 'link')
    // id = selectedClass.id
  }
  //console.log("###component", component)

  return (
    <>
      <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'MENU.CLASSES'})}</PageTitle>
      <ClassPage
        comp={component}
        module_id={module_id!}
        id={id!}
        selectedClass={selectedClass}
        url={url}
        extra_files={extras_files}
        extras_links={extras_links}
      />
    </>
  )
}
export {Class}
