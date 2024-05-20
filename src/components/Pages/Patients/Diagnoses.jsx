import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Diagnoses = ({ addPrescriptions }) => {
  const Ref = useRef();
  const dispatch = useDispatch();
  const diagnoses = useSelector(
    (state) => state.prescriptions.data.illnessDescription
  );
  const [showModalDiagnoses, setShowModalDiagnoses] = useState(false);
  // Function
  function handleSend() {
    dispatch(addPrescriptions(Ref.current.value));
    setShowModalDiagnoses(false);
    Ref.current.value = "";
  }
  function btnRemoveBox() {
    dispatch(addPrescriptions(null))
  }
  const content = () => {
    if (diagnoses) {
      return (
        <div
          className="info-but info-diagnoses bg-white p-2 col-8 mt-5 d-flex align-items-center justify-content-between "
        >
          <div className="but-left ">
            <p className="fs-3">{diagnoses}</p>
          </div>
          <div className="icons">
            <button
              onClick={() => btnRemoveBox()}
              className="me-5 d-flex align-items-center justify-content-center "
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      );
    }
    return;
  };
  return (
    <Fragment>
      <div className={`overly ${showModalDiagnoses ? "" : "hide"}`}></div>
      <h4 className="mt-5">
        Diagnoses
        {/*<-- Button trigger modal --> */}
          <button
            type="button"
            className="btn-icon bg-transparent border-0"
            onClick={() => setShowModalDiagnoses(true)}
          >
            <i className="fa-solid fa-circle-plus"></i>
          </button>
        <div className={`modal-diagnoses ${showModalDiagnoses ? "" : "hide"}`}>
          <h2>Diagnoses</h2>
          <textarea
          ref={Ref}
          ></textarea>
          <div className="row mt-3">
            <button
              type="button"
              className="btn send me-5"
              onClick={handleSend}
            >
              Applay
            </button>
            <button
              type="button"
              className="btn close"
              onClick={() => setShowModalDiagnoses(false)}
            >
              Close
            </button>
          </div>
        </div>
      </h4>
      <div>{content()}</div>
    </Fragment>
  );
};

export default Diagnoses;
