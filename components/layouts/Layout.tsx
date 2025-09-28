import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import { LayoutProps } from "@/interfaces"
import ErrorBoundary from "@/components/errorBoundary/ErrorBoundary"
import GlobalErrorFallback from "@/components/errorBoundary/GlobalErrorFallback"


const Layout: React.FC<LayoutProps> = ({children}) => {


    return(
        <ErrorBoundary fallback={GlobalErrorFallback}>
            <Header/>
            <main className="min-h-screen bg-backColor">{children}</main>
            <Footer/>
        </ErrorBoundary>
    )
}

export default Layout;
