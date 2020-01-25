import { configureStore } from "../components/Store"
import { Provider } from "react-redux"

const store = configureStore()

const MyApp = ({ Component, pageProps }) => {

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp