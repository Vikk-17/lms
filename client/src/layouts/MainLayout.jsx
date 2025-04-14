import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/footer"

export default function MainLayout({children}){
    return(
        <>
            <Header/>
            <main className="h-screen container">
               <Outlet/>
            </main>
            <Footer/>
        </>
    )
}