import { Fragment } from "react";

const Box = ({name, boxes}) => {
    const boxContent = boxes.map((el) => {
        let modalInput = "price";
        if (name === "Medicine") modalInput = "doses";
        return (
            <div key={el.id} className="top-left bg-white w-50 d-flex me-4 p-3 mb-2 rounded-2  justify-content-between align-items-center">
            <div className="info-box">
              <div className="info-top d-flex">
                <div className="pe-3">{name} Name</div>
                <div className="pe-3">{el.name}</div>
              </div>
              <div className="info-but d-flex ">
                <div className="pe-3">{name} {name === "Medicine" ? "Dose" : "Price"}</div>
                <div className="pe-3">{el[modalInput]} {name === "Medicine" ? "Times a da" : ""}</div>
              </div>
              </div>
          </div>
        )
    })
    return (
        <Fragment>
        <div className={`content-one ${name === "Medicine" ? "" : "mt-5"}`}>
        <h4>
          {name}
        </h4>
        <div className="info-row-one">
        {boxContent}
        </div>
      </div>
        </Fragment>
    );
}
 
export default Box;