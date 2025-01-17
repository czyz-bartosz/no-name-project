import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavbarMainPage from "./NavbarMainPage";
import Footer from "./Footer";

const Layout: FC = () => {
    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <NavbarMainPage />
                <Outlet />
                <Footer />
            </div>
        </>
    );
}

export default Layout;