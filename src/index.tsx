import React from 'react'
import ReactDOM from "react-dom/client";
import 'react-image-crop/dist/ReactCrop.css'
// Redux
// https://github.com/rt2zz/redux-persist
// import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'

import store from './store'

// Axios
// import axios from 'axios'
// import {Chart, registerables} from 'chart.js'

// Apps
import {App} from './app/App'
import {MetronicI18nProvider} from './app/design/i18n/Metronici18n'
/**
 * TIP: Replace this style import with dark styles to enable dark mode
 *
 * import './_metronic/assets/sass/style.dark.scss'
 *
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './app/design/assets/sass/style.scss'
// import './app/design/assets/sass/style.dark.scss'
import './app/design/assets/sass/style.react.scss'
// import './_metronic/assets/sass/core/components/_carousel.scss'

import './mycss.css'
import reportWebVitals from './reportWebVitals';
/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */

/* const mock = */ // _redux.mockAxios(axios)
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
// _redux.setupAxios(axios, store)

// Chart.register(...registerables)
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <MetronicI18nProvider>
    <Provider store={store}>
      <App basename={PUBLIC_URL} />
    </Provider>
  </MetronicI18nProvider>
)
reportWebVitals();
