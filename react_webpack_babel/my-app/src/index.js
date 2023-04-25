import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.css";

const Hi = () => {
  return (
    <div>
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-8">
              <div>
                <h1>Hi</h1>
              </div>
              <div>
                <p>Change 2, 3, 4, 5, 7</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
ReactDOM.render(<Hi></Hi>, document.getElementById("root"));
