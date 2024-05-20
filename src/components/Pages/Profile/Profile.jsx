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
        if (res.ok) {
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
          <div class="card col-lg-3 mx-auto my-3">
            <img src={imageProfile} class="card-img-top" alt="user " />
            <div class="card-body">
              <div><b style={{ width: '30%' }}>Name :</b> <span className="mx-3">{doctorInfo.displayName}</span> </div>
              <div><b style={{ width: '30%' }}> Number :</b> <span className="mx-3">{doctorInfo.phoneNumber}</span></div>
              <div><b style={{ width: '30%' }}>gender: </b><span className="mx-3">{doctorInfo.gender}</span></div>
              <div><b style={{ width: '30%' }}>address: </b><span className="mx-3">{doctorInfo.address}</span></div>
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

