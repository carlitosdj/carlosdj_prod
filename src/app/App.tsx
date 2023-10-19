import React, {Suspense} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {I18nProvider} from './design/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from './design/layout/core'
import {AppRoutes} from './routing/Routes'

type Props = {
  basename: string
}

const App: React.FC<React.PropsWithChildren<Props>> = ({basename}) => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <BrowserRouter basename={basename}>
        <I18nProvider>
          <LayoutProvider>
            <AppRoutes />
          </LayoutProvider>
        </I18nProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export {App}
