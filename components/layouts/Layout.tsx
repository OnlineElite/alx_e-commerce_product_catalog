import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import { LayoutProps } from "@/interfaces"
import { Provider } from 'react-redux'
import store from "@/store/index"

const Layout: React.FC<LayoutProps> = ({children}) => {


    return(
        <Provider store={store} >
            <Header/>
            <main className="min-h-screen bg-backColor">{children}</main>
            <Footer/>
        </Provider>
    )
}

export default Layout;
