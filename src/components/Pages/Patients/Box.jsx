import { Fragment } from "react";

const Box = ({ name, boxes }) => {
  const boxContent = boxes.map((el) => {
    let modalInput = "price";
    if (name === "Medicine") modalInput = "doses";
    return (
      <div key={el.id} className="col-6">
        <div className="m-2 top-left bg-white d-flex p-3 rounded-2 justify-content-between align-items-center pb-5 p-2 box_container">
          <div className="info-box">
            <div className="info d-flex">
              <div className="pe-3">{name} Name</div>
              <div className="pe-3 data_output">{el.name}</div>
            </div>
            <div className="info d-flex ">
              <div className="pe-3">{name} {name === "Medicine" ? "Dose" : "Price"}</div>
              <div className="pe-3 data_output">{el[modalInput]} {name === "Medicine" ? "Times a da" : ""}</div>
            </div>
          </div>
        </div>
      </div>
    )
  })
  return (
    <>
      <div className={`content-one ${name === "Medicine" ? "" : "mt-5"}`}>
        <h4>
          {name}
        </h4>
        <div className="row">
          {boxContent}
        </div>
      </div>
    </>
  );
}

export default Box;