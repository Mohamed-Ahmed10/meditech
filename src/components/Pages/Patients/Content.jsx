import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Diagnoses from "./Diagnoses";
import Medicine from "./Medicine";
import Swal from "sweetalert2";
import Prescriptions from "./Prescriptions";
import {
  clear,
  prescriptionsDetails,
} from "../../store/slice/prescriptions-slice";
import {
  addMedication,
  addTest,
  addDigitalXRay,
  addIllnessDescription,
  addPatientId,
  addDoctorId,
} from "../../store/slice/prescriptions-slice.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Content = () => {
  const { patientId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const dispatch = useDispatch();
  dispatch(addPatientId(patientId));
  dispatch(addDoctorId(user.id));
  const state = useSelector((state) => state.prescriptions.data);
  // State
  const [patientInfo, setPatientInfo] = useState({});

  // Function
  function applyPrescriptions() {
    const url_create =
      "https://meditech20240517184700.azurewebsites.net/api/Presiption/CreatePrescription";
    axios
      .post(url_create, state, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        dispatch(prescriptionsDetails({ userId, patientId }));
        dispatch(clear());
        Swal.fire({
          title: "Prescription Applied successfully!",
          icon: "success",
        });
      }).catch((error) => {
        Swal.fire({
          title: error.response.data.title,
          text: "You clicked the button!",
          icon: "error",
        });
      })
  }
  function cancelPrescriptions() {
    dispatch(clear());
  }
  // fetch data
  function tableDetails(patientId, isMuted) {
    fetch(
      `https://meditech20240517184700.azurewebsites.net/api/Patient/${patientId}`
    ).then(async (res) => {
      if (!isMuted) return;
      if (res.ok) {
        const data = await res.json();
        setPatientInfo(data);
      }
    });
  }
  // Constants

  // Side Effect
  useEffect(() => {
    dispatch(clear());
    let isMuted = true;
    tableDetails(patientId, isMuted);
    return () => {
      isMuted = false;
    };
  }, [patientId]);
  const checkData = Object.keys(patientInfo).length;
  return (
    <>
      <div className="container">
        <div className="sec-one mt-5 mb-5">
          {checkData > 0 ? (
            <>
              <p className="ps-4 paragragh-top">
                <b>Patient / </b>
                <span className="name">{patientInfo.userName}</span>
              </p>
              <div className="patient-details ">
                <h4 className="text-lowercase">Patient Details</h4>
                <div className="row row-cols-2 w-50">
                  <div className="col">
                    <span className="me-3 text-dark fw-bold">Full Name : </span>
                    <span className="data_output">{patientInfo.userName}</span>
                  </div>
                  <div className="col">
                    <span className="me-3 text-dark fw-bold">Address : </span>
                    <span className="data_output">{patientInfo.address}</span>
                  </div>
                  <div className="col">
                    <span className="me-3 text-dark fw-bold">Telephone : </span>
                    <span className="data_output">{patientInfo.telephone}</span>
                  </div>
                  <div className="col">
                    <span className="me-3 text-dark fw-bold">Gender : </span>
                    <span className="data_output">{patientInfo.gender}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h2>Loading</h2>
          )}
        </div>
        <div className="sec-two mb-5">
          <h4 className="ps-4 my-3 fw-bold">
            Prescriptions
          </h4>
          <div className="prescriptions">
            <Medicine
              Prescriptions={"Medicine"}
              addPrescriptions={addMedication}
            />
            <Diagnoses addPrescriptions={addIllnessDescription} />
            <div className="mt-3">
              <Medicine Prescriptions={"Analysis"} addPrescriptions={addTest} />
            </div>
            <div className="mt-3 mb-3">
              <Medicine
                Prescriptions={"X-Ray"}
                addPrescriptions={addDigitalXRay}
              />
            </div>
            <div className="icons text-center">
              <button onClick={applyPrescriptions} className="apply btn my-3 me-5">
                Apply
              </button>
              <button onClick={cancelPrescriptions} className="cancel btn my-3">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <Prescriptions />
      </div>
    </>
  );
};

export default Content;
