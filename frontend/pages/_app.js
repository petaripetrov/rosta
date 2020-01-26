import { configureStore } from "../components/Store"
import { Provider, useSelector } from "react-redux"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faPollH } from '@fortawesome/free-solid-svg-icons'

import Header from "../components/Header/header"
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import { useEffect } from "react"
import Toaster from "../components/toaster"
import { useRouter } from "next/router"

library.add(faBars, faPollH)

const store = configureStore()


const MyApp = ({ Component, pageProps }) => {

    return (
        <Provider store={store}>
            <Toaster />
            <Header />
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp