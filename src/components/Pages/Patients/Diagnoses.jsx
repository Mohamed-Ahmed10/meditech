import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import deleteIcon from "../../images/delete.png";
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
  console.log(diagnoses)
  const content =
    diagnoses
      ?
      (
        <div
          className="top-left bg-white d-flex me-4 w-50 p-3 mb-2 rounded-2  justify-content-between align-items-center pb-4 p-2 box_container"
        >
          <div className="but-left ">
            <div className="heading">{diagnoses}</div>
          </div>
          <div className="icons">
            <button
              onClick={() => btnRemoveBox()}
              className="btn me-5 delete_forever d-flex align-items-center justify-content-center rounded-circle p-1 " width="30"
            >
              <img src={deleteIcon} alt="delete icon" width={20} height={20} />
            </button>
          </div>
        </div>
      ) :
      (
        <div
          className="box_container top-left bg-white d-flex me-4 p-3 mb-2 rounded-2 w-50 justify-content-between align-items-center"
        >
          <div>Diagnoses  </div>
        </div>
      )
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
            max="30"
            ref={Ref}
          ></textarea>
          <div className="row mt-4 buttons">
            <button
              type="button"
              className="submit btn "
              onClick={handleSend}
            >
              Apply
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
      <div>{content}</div>
    </Fragment>
  );
};

export default Diagnoses;
