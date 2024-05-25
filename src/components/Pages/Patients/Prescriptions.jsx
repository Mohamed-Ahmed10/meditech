import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { prescriptionsDetails } from "../../store/slice/prescriptions-slice";
import Box from "./Box";

const Prescriptions = () => {
  const { patientId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const dispatch = useDispatch();
  // state
  const state = useSelector((state) => state.prescriptions);
  const prescriptions = state.showPrescriptions;
  const loading = state.loading;
  // function
  function removePrescriptions(id) {
    const url = `https://meditech20240517184700.azurewebsites.net/api/Presiption/Deleteprescriptions/${id}`;
    fetch(url, {
      method: "DELETE",
    }).then((res) => {
      dispatch(prescriptionsDetails({ userId, patientId }));
      Swal.fire({
        title: "Delete Success",
        // text: "You clicked the button!",
        icon: "success",
      });
    })
  }

  // Constants
  const content = prescriptions.map((el) => {
    return (
      <Fragment key={el.prescriptionId}>
        {loading ? (
          <h2>Loading</h2>
        ) : (
          <div className="container-prescription rounded-2 mb-4">

            <div className="prescriptions mt-0 ">
            <h4 className="text-center pt-3">
              <b>Prescriptions#{el.prescriptionId}</b>
            </h4>
            <Box name="Medicine" boxes={el.medications} />
            <h4 className="mt-3">Diagnoses</h4>
            <div className="row">
              <div className="col-6">

                <div className="m-2 top-left  d-flex p-3  rounded-2  justify-content-between align-items-center pb-5 p-2 box_container text-white fw-light  ">
                  <div className="but-left ">
                    <p className=" fs-5 ">{el.illnessDescription}</p>
                  </div>
                </div>
              </div>
            </div>
            <Box name="Analysis" boxes={el.digitalXRays} />
            <Box name="X-Ray" boxes={el.tests}  />
            <div className="text-center">
              <button
                onClick={() => removePrescriptions(el.prescriptionId)}
                className="remove-prescriptions btn mt-3 mb-3 fs-4 w-25">
                Delete Prescription
              </button>
            </div>
          </div>


          </div>




          
        )}
      </Fragment>
    );
  });
  // side Effect
  useEffect(() => {
    dispatch(prescriptionsDetails({ userId, patientId }));
  }, []);
  return <div className="sec-3th mb-5">{content}</div>;
};

export default Prescriptions;
