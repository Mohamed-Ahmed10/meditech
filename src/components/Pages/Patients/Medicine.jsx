import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Medicine = ({ Prescriptions, addPrescriptions }) => {
  const dispatch = useDispatch();
  const Ref = useRef();
  let modalInput = "";
  if (Prescriptions === "Medicine") modalInput = "doses";
  else if (Prescriptions === "X-Ray") modalInput = "price";
  else modalInput = "price";
  let priceName = "";
  if (Prescriptions === "Analysis") priceName = "testPrice";
  else if (Prescriptions === "X-Ray") priceName = "price";
  let dispatchName = "";
  if (Prescriptions === "Medicine") dispatchName = "medicationNames";
  else if (Prescriptions === "X-Ray") dispatchName = "digitalXRayNames";
  else dispatchName = "testNames";

  // Selector
  const boxesContent = useSelector(
    (state) => state.prescriptions.data[dispatchName]
  );
  // State
  const [showModal, setShowModal] = useState(false);
  const [medicine, setMedicine] = useState([]);
  const [boxId, setBoxID] = useState(0);
  const [medicationName, setMedicationName] = useState("");
  // Constants
  const medicineList = medicine.map((e) => {
    let name = "";
    if (Prescriptions === "Medicine") name = "medication_Name";
    else if (Prescriptions === "X-Ray") name = "name";
    else name = "testName";
    let nameId = "";
    if (Prescriptions === "Medicine") nameId = "id";
    else if (Prescriptions === "X-Ray") nameId = "xrayId";
    else nameId = "testId";
    return (
      <li
        key={e[nameId]}
        onClick={() => {
          setBoxID(e[nameId]);
          setMedicationName(e[name]);
          Ref.current.value = e[priceName];
        }}
        className="dropdown-item"
      >
        {e[name]}
      </li>
    );
  });
  console.log(boxesContent)
  //   Function

  function handleApply() {
    const medicine = {
      name: medicationName,
      [modalInput]: +Ref.current.value,
      id: boxId,
    };
    dispatch(addPrescriptions(medicine));
    setShowModal(false);
  }
  function medicineDetails(isMuted) {
    let url_api = "";
    if (Prescriptions === "Medicine") {
      url_api = "https://meditech20240517184700.azurewebsites.net/api/Medication";
    } else if (Prescriptions === "X-Ray") {
      url_api = "https://meditech20240517184700.azurewebsites.net/api/DigitalXRay";
    } else {
      url_api = "https://meditech20240517184700.azurewebsites.net/api/Tests/AllTests";
    }
    fetch(url_api).then(async (res) => {
      if (!isMuted) return;
      if (res.ok) {
        const data = await res.json();
        setMedicine(data);
      }
    });
  }
  function btnRemoveBox(id) {
    const newBoxes = boxesContent.filter((el) => el.id !== id)
    dispatch(addPrescriptions(newBoxes));
  }

  useEffect(() => {
    let isMuted = true;
    medicineDetails(isMuted);
    return () => {
      isMuted = false;
    };
  }, []);
  return (
    <>
      <div className={`overly ${showModal ? "" : "hide"}`}></div>
      <div className={`modal-special ${showModal ? "" : "hide"}`}>
        <h2>{Prescriptions} Details</h2>
        <div className="row d-flex justify-content-center g-3">
          <label htmlFor="dropdown">Name</label>
          <div className="dropdown" id="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle w-100 "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Choose one {Prescriptions}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark w-100 ">
              {medicineList}
            </ul>
          </div>
        </div>
        <div className="row mt-3 d-flex justify-content-center g-3">
          <label htmlFor="dose">{modalInput}</label>
          <input
            id="dose"
            type="number"
            ref={Ref}
            disabled={modalInput === "doses" ? false : true}
          />
        </div>
        <div className="row mt-4 buttons">
          <button className="submit btn " onClick={handleApply}>
            Apply
          </button>
          <button className="close btn" onClick={() => setShowModal(false)}>
            Close
          </button>
        </div>
      </div>
      <div className="content-one">
        <h4>
          {Prescriptions}
          <button
            type="button"
            className="btn-icon bg-transparent border-0"
            onClick={() => {
              setShowModal(true);
              Ref.current.value = "";
            }}
          >
            <i className="fa-solid fa-circle-plus"></i>
          </button>
        </h4>
        <div className="">
          {
            boxesContent.length > 0
              ?
              (
                boxesContent.map((el) =>
                  <div key={el.id} className="top-left bg-white d-flex me-4 w-50 p-3 mb-2 rounded-2  justify-content-between align-items-center pb-4 p-2 box_container">
                    <div className="info-box">
                      <div className="info d-flex">
                        <div className="pe-3">{Prescriptions} Name  </div>
                        <div className="pe-3 data_output">{el.name}</div>
                      </div>
                      <div className="info d-flex ">
                        <div className="pe-3">{Prescriptions} {modalInput}  </div>
                        <div className="pe-3 data_output">{el[modalInput]} {Prescriptions === "Medicine" ? "Times a day" : ""}</div>
                      </div>
                    </div>
                    <button onClick={() => btnRemoveBox(el.id)} className="btn me-5 delete_forever d-flex align-items-center justify-content-center border">
                      <i className="fa-solid fa-trash text-danger"></i>
                    </button>
                  </div>
                )
              )
              :
              <div className="top-left bg-white d-flex me-4 w-50 p-3 mb-2 rounded-2  justify-content-between align-items-center pb-4 p-2 box_container">
                <div className="info-box">
                  <div className="info d-flex">
                    <div className="pe-3 heading">{Prescriptions} Name  </div>
                  </div>
                  <div className="info d-flex ">
                    <div className="pe-3 heading">{Prescriptions} {modalInput}  </div>
                  </div>
                </div>
              </div>
          }
        </div>
      </div>
    </>
  );
};

export default Medicine;