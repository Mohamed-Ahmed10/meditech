import { Fragment } from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import Landing from "./Landing/Landing";
import Services from "./Services/Services";

const HomePage = () => {
    return (
        <Fragment>
            <Navbar />
            <Landing />
            <Services />
            <Footer />
        </Fragment>
    );
}
export default HomePage;