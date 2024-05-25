import { Link } from "react-router-dom";
import image from "../../../images/2.png";
import image2 from "../../../images/3.png";
import image3 from "../../../images/4.png";

const Services = () => {
    return (
        <div className="services pt-5 pb-5 text-center">
            <div className="container">
                <div className="main-title mt-5 mb-5">
                    <h2>Services We Provide</h2>
                </div>
                <div className="content-services">
                    <div className="box1 d-flex justify-content-start align-items-center ">
                        <img src={image} alt="" />
                        <div className="content text-start">
                            <h3 className="boxes">Check Patients Details</h3>
                            <p>Quick access to comprehensive <br /> patient profiles for informed br care decisions.</p>
                        </div>
                    </div>
                    <div className="box2 d-flex justify-content-end align-items-center  pb-5">
                        <div className="content text-start">
                            <h3 className="boxes">Manage Schedule</h3>
                            <p>Streamline appointments and <br /> manage your time efficiently.</p>
                        </div>
                        <img src={image2} alt="" />

                    </div>
                    <div className="box3 d-flex justify-content-start align-items-center  pb-5">
                        <img src={image3} alt="" />
                        <div className="content text-start">
                            <h3 className="boxes">Make Prescriptions</h3>
                            <p>Generate and send  <br />prescriptions safely and swiftly <br /> to pharmacies.</p>
                        </div>

                    </div>
                </div>
                <div className="sec-title mt-5 mb-5">
                    <h2 className="pb-5">Join Us Now</h2>
                    <form action="login.html">
                        <Link to={"/login"} className="btn btn-primary btn-lg first-btn  pt-2">
                            Get Started
                        </Link>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Services;