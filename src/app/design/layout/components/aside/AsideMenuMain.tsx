/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
// import {KTSVG} from '../../../helpers'
// import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
// import { useSelector, useDispatch } from 'react-redux';
// import { ApplicationState } from '../../../../store'

// type Props = {
//   changeMenu: React.Dispatch<React.SetStateAction<string>>
// };

export function AsideMenuMain() {
  const intl = useIntl()
  // const me = useSelector((state: ApplicationState) => state.me);

  return (
    <>
      <AsideMenuItem
        to='/search'
        icon='/media/icons/duotune/general/gen004.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.SEARCH'})}
      />
      <AsideMenuItem
        to='/onlinecourses'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.TRAINNINGS'})}
        
      />
      
      <AsideMenuItem
        to='/books'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.BOOKS'})}
        
      />
      <AsideMenuItem
        to='/articles'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.ARTICLES'})}
        
      />
      <AsideMenuItem
        to='/annotation'
        icon='/media/icons/duotune/general/gen055.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.MYANNOTATIONS'})}
      />
      {/* <AsideMenuItem
        to='/palestras'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-app-indicator'
        //title={intl.formatMessage({id: 'MENU.ONLINECOURSES'})}
        title="Palestras"
      />
      <AsideMenuItem
        to='/lives'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-app-indicator'
        //title={intl.formatMessage({id: 'MENU.ONLINECOURSES'})}
        title="Lives"
      /> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Pacientes</span>
        </div>
      </div>
      {/* <AsideMenuItem
        to='/partners'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-app-indicator'
        //title={intl.formatMessage({id: 'MENU.ONLINECOURSES'})}
        title="Parceiros"
      /> */}
      <AsideMenuItem
        to='/patients'
        icon='/media/icons/duotune/general/gen004.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.PATIENTS'})}
      />
      {/* <AsideMenuItem
        to='/agenda/71'
        icon='/media/icons/duotune/general/gen014.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.AGENDA'})}
      /> */}
      
      {/* <AsideMenuItem
        to='/suppliers'
        icon='/media/icons/duotune/general/gen004.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.SUPPLIERS'})}
      /> */}
      {/* <AsideMenuItem
        to='/ranking'
        icon='/media/icons/duotune/general/gen004.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.RANKING'})}
      /> */}
      {/* <AsideMenuItem
        to='/professores'
        icon='/media/icons/duotune/general/gen004.svg'
        fontIcon='bi-app-indicator'
        title="Professores"
      /> */}
      {/* <AsideMenuItem
        to='/professionals'
        icon='/media/icons/duotune/general/gen004.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.PROFESSIONALS'})}
      /> */}
      
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Links</span>
        </div>
      </div>
      
       */}
      {/* <AsideMenuItem
        to='/replay'
        icon='/media/icons/duotune/general/gen029.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.REPLAY'})}
      /> */}

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Suporte</span>
        </div>
      </div>
      <AsideMenuItem
        to='/mysupport'
        icon='/media/icons/duotune/art/art006.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.SUPPORT'})}
      />
    </>
  )
}
