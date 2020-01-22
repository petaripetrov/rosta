import App from 'next/app'
import { FunctionComponent } from 'react'
import { NextPage } from 'next'

interface appProps {
    Component: FunctionComponent,
    pageProps: any

}
function MyApp: NextPage<{ initial?: appProps }> = ({ initial }) => {

}