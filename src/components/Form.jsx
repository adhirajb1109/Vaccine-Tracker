import React from "react";

function Form() {
  function Submit(event) {
    event.preventDefault();
    const pincode = document.getElementById("pincode").value;
    const date = document.getElementById("date").value;
    fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.sessions.length === 0) {
          document.getElementById("card").style.display = "block";
        } else {
          data.sessions.forEach((session) => {
            document.getElementById("table").style.display = "block";
            document.getElementById("data").insertAdjacentHTML(
              "beforeend",
              `<tr>
                <th scope="row">${session.name}</th>
                <td>${session.address}</td>
                <td>${session.available_capacity}</td>
                <td>${session.slots.join(" , ")}</td>
               </tr>`
            );
          });
        }
      });
  }
  return (
    <div className="container my-3">
      <form id="form">
        <div className="mb-3">
          <label htmlFor="pincode" className="form-label">
            Enter Pincode :
          </label>
          <input type="number" className="form-control" id="pincode" />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Enter Date :
          </label>
          <input placeholder="dd-mm-yy" className="form-control" id="date" />
        </div>
        <button
          type="submit"
          className="btn btn-outline-dark"
          id="submit"
          onClick={Submit}
        >
          Submit
        </button>
      </form>
      <div class="card my-3 alert alert-danger" id="card">
        <div class="card-body">
          <h5 class="card-title error">No Slots Available</h5>
        </div>
      </div>
      <table class="table table-bordered table-hover my-3 mt-4" id="table">
        <thead>
          <tr>
            <th scope="col">Hospital</th>
            <th scope="col">Address</th>
            <th scope="col">Available Vaccines</th>
            <th scope="col">Slots</th>
          </tr>
        </thead>
        <tbody id="data"></tbody>
      </table>
    </div>
  );
}

export default Form;
