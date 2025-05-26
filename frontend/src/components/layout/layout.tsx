import { Outlet } from "react-router-dom"
import { Header } from "../header/header"
import { Footer } from "../footer/footer"
import "./layout.scss"

// layout component that includes header and footer components plus main container
// that that will include pages later through routing
export const Layout = () => {
    return (
        <div id="layout-container">
            <Header />
            <main id="layout-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}