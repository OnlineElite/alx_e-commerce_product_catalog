import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import { LayoutProps } from "@/interfaces"

const Layout: React.FC<LayoutProps> = ({children}) => {


    return(
        <>
            <Header/>
            <main className="min-h-screen bg-backColor">{children}</main>
            <Footer/>
        </>
    )
}

export default Layout;
