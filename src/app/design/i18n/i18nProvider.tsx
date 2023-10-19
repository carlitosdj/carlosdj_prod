import React, {FC} from 'react'
import {useLang} from './Metronici18n'
import {IntlProvider} from 'react-intl'

import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/pt'

import '@formatjs/intl-relativetimeformat/locale-data/en'
import '@formatjs/intl-relativetimeformat/locale-data/de'
import '@formatjs/intl-relativetimeformat/locale-data/es'
import '@formatjs/intl-relativetimeformat/locale-data/fr'
import '@formatjs/intl-relativetimeformat/locale-data/ja'
import '@formatjs/intl-relativetimeformat/locale-data/zh'

// import deMessages from './messages/de.json'
import enMessages from './messages/en.json'
import esMessages from './messages/es.json'
// import frMessages from './messages/fr.json'
// import jaMessages from './messages/ja.json'
// import zhMessages from './messages/zh.json'
import ptMessages from './messages/pt.json'

const allMessages = {
  pt: ptMessages,
  es: esMessages,
  en: enMessages,
  // de: deMessages,
  // fr: frMessages,
  // ja: jaMessages,
  // zh: zhMessages,
}

const I18nProvider: FC<React.PropsWithChildren<unknown>> = ({children}) => {
  const locale = useLang()
  const messages = allMessages[locale]
  // return (
  //   <div>
  //     {children}
  //   </div>
  // )
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export {I18nProvider}
