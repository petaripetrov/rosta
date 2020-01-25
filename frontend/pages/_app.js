import { configureStore } from "../components/Store"
import { Provider, useSelector } from "react-redux"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faPollH } from '@fortawesome/free-solid-svg-icons'

import Header from "../components/Header/header"
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import { useEffect } from "react"

library.add(faBars, faPollH)

const store = configureStore()


const MyApp = ({ Component, pageProps }) => {

    useEffect(() => {
        store.dispatch({ type: 'LOAD_FROM_COOKIES' })
    })

    return (
        <Provider store={store}>
            <Header />
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp