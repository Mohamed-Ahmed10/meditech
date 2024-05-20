import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Content = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // State
  const [selectedBoxes, setSelectedBoxes] = useState(0);
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [table, setTable] = useState([]);

  // function
  const handleClick = (day, index) => {
    setSelectedBoxes(index);
    tableDetails(user.id, day)
  };
  function tableDetails(id, day = doctorInfo[0]) {
    fetch(`https://meditech20240517184700.azurewebsites.net/api/Appointment/appointmentsDoctor/${id}/${day}`)
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setTable(data)
        }
      })
  }
  function formatDate(date) {
    const newDate = new Date(date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = newDate.toLocaleDateString(undefined, options);
    return formattedDate
  }
  // Constants
  const boxes = doctorInfo.map((el, index) =>
    <td
      key={index}
      className={`text-center p-5 fs-4 ${selectedBoxes === index ? "active" : ""}`}
    >
      <div
        className={`rounded border-1 border m-1 border-primary dayData ${index === selectedBoxes ? 'active' : ''}`}
        onClick={() => handleClick(el, index)}
      >{el}</div>
    </td>
  )

  const tableInfo = table.map((el, index) => {
    return (
      <tr key={index}>
        <th scope="row" className="fw-bold text-center">
          # {el.patientId}
        </th>
        <td>
          <Link to={`/patients/${el.patientId}`} id="button1" className="border-0 bg-white">
            {el.patient}
          </Link>
        </td>
        <td>{formatDate(el.date)}</td>
      </tr>
    )
  })

  useEffect(() => {
    let isMuted = true;

    fetch(`https://meditech20240517184700.azurewebsites.net/api/Doctor/${user.id}`)
      .then(async (res) => {
        if (!isMuted) return;
        if (res.ok) {
          const data = await res.json();
          tableDetails(user.id, data.workingdays[0])
          setDoctorInfo(data.workingdays)
        }
      })
    return () => {
      isMuted = false;
    }
  }, []);

  return (
    <div className="container schedule" id="tabs">
      <div className="pt-5">
        <h3 className="fw-bold">Schedule</h3>
        <div className="days">
          <ul className="boxes">
            <div className="table-responsive">
              <table className="table caption-top">
                <tbody>
                  <tr>
                    {boxes}
                  </tr>
                </tbody>
              </table>
            </div>
          </ul>
        </div>
        <div className="section-two pt-5">
          {table.length > 0 ?
            <>
              <h3 className="fw-bold mb-4">The Day Patients</h3>
              <div id="tabs-1">
                <div className="tableContainer my-3">
                  <table className="table table-bordered border-primary mb-0">
                    <thead>
                      <tr>
                        <th scope="col" width="10%">Patient ID</th>
                        <th scope="col" className="fw-bold">
                          Patient Name
                        </th>
                        <th scope="col" className="fw-bold">
                          Appointment Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableInfo}
                    </tbody>
                  </table>
                </div>
              </div>
            </> : <h1 style={{ marginBottom: "120px", textAlign: "center" }}>Not Found Appointment</h1>}
        </div>
      </div>
    </div>
  );
};

export default Content;
