const Footer = () => {
  return (
    <footer>
      <div className="container  text-center text-md-start text-white">
        <div className="d-flex justify-content-between">

          <div className="logo d-flex">
            <i className="fa-solid fa-stethoscope icon pe-4"></i>
            <h3>MediTech</h3>
          </div>
          <ul className="list-unstyled lh-lg d-flex ">
            <li className="pe-3">privacy policy</li>
            <li>Terms and Conditions</li>
          </ul>
        </div>
        <hr />
        <div className="text-center py-4 mt-4">
          &copy; All rights reserved for MediTech team 2024
        </div>
      </div>
    </footer>
  );
};

export default Footer;
