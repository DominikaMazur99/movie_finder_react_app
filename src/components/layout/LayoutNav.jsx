import { Outlet } from "react-router-dom";
import MainNavbar from "../navbar/MainNavbar";

const LayoutNav = () => {
    return (
        <main>
            <MainNavbar />
            <Outlet />
        </main>
    );
};

export default LayoutNav;
