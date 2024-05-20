import imageProfile from "../../images/profile-image.jpg";
import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
const Profile = () => {
  const [doctorInfo, setDoctorInfo] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    let isMuted = true;

    fetch(`https://meditech20240517184700.azurewebsites.net/api/Doctor/${user.id}`)
      .then(async (res) => {
        if (!isMuted) return;
        if(res.ok) {
          const data = await res.json();
          setDoctorInfo(data)
        }
      })
      return () => {
        isMuted = false;
      }
  }, [user.id]);
  const length = Object.keys(doctorInfo).length;

  return (
    <section className="profile">
    <Navbar />
      <div className="container">
        {length > 0 ? (
          <div className="col-9 m-auto mt-5" id="profile-info">
            <div id="info">
              <div className="card shadow my-4">
                <div className="card-body">
                  <div className="row flex-sm-column flex-md-row text-center">
                    {/* <!-- profile image --> */}
                    <div className="col-6">
                      <img src={imageProfile} alt="" />
                    </div>
                    {/* <!-- End profile image --> */}
                    {/* <!--  username + name --> */}
                    <div className="info-text col-6 d-flex flex-column justify-content-evenly">
                      <div>{doctorInfo.email}</div>
                      <div>{doctorInfo.displayName}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-info">
              <h3>
                address: <span>{doctorInfo.address}</span>
              </h3>
              <h3>
                gender: <span>{doctorInfo.gender}</span>
              </h3>
              <h3>
                phoneNumber: <span>{doctorInfo.phoneNumber}</span>
              </h3>
            </div>
          </div>
        ) : (
          <div className="loading-wave">
  <div className="loading-bar"></div>
  <div className="loading-bar"></div>
  <div className="loading-bar"></div>
  <div className="loading-bar"></div>
</div>
        )}
      </div>
    </section>
  );
};

export default Profile;
