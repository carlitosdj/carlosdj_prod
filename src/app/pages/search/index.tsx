import React, { useState } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap-v5'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ApplicationState } from '../../../store'
import { searchRequest } from '../../../store/ducks/component/actions'
import { ComponentState } from '../../../store/ducks/component/types'
import { PageTitle } from '../../design/layout/core'
import Loading from '../../design/loading'
import { SearchWidget } from './SearchWidget'
//const MOMENT = require('moment')
require("moment-duration-format");

type Props = {
  component: ComponentState
}
const ModulesPage: React.FC<React.PropsWithChildren<Props>> = ({component}) => (
  <>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <SearchWidget component={component} className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div>
    {/* end::Row */}
  </>
)

const Search = () => {
  const intl = useIntl()
  const [searchText, setSearch] = useState('')
  const component = useSelector((state: ApplicationState) => state.component)
  const dispatch = useDispatch()
  //console.log("Search", component)
//   useEffect(() => {
//     if(searchText)
//         dispatch(searchRequest(searchText))
//   }, [searchText])

  const searchInput = (text: string) => {
    //console.log("Text to search", text)
    var new_str = text.replace(/\//g, '!!');
    //console.log("new_str", new_str)
    setSearch(new_str)
  }


  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    //console.log("Searching...", searchText)
    dispatch(searchRequest(searchText))

  }
  // const me = useSelector((state: ApplicationState) => state.me)
  // var created_at = MOMENT(new Date(Number(me.me.created_at) * 1000)) //.format('DD/MM/YYYY HH:mm')
  // var now = MOMENT(new Date()) //.format('DD/MM/YYYY HH:mm')
  //let blockAreas = (now.diff(created_at, 'years', true).toFixed(2) > 1);

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.SEARCH'})}</PageTitle>

      <form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
            <FormControl
            placeholder="Digite um tema. Exemplo: Lábio Palatino"
            aria-label="Digite um tema"
            aria-describedby="basic-addon2"
            autoFocus={true}
            onChange={(e:any) => searchInput(e.target.value)}
            />
            <button id="button-addon2" className="btn btn-secondary">Pesquisar</button>
        </InputGroup>
        </form>

        

        {component.loading?
        <Loading />
        :
        <ModulesPage component={component} />
        }

    </>
  )
}

export default Search