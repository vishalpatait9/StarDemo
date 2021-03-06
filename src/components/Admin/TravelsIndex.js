import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import {
  _getAllTravels_Admin,
  _postTravels_Admin,
  _updateTravels_Admin,
  _deleteTravels_Admin
} from "../../Redux/Actions/admin.actions";
const TravelsIndex = props => {
  const [entries, setEntries] = useState({
    data: [
      {
        id: "",
        startCity: "",
        destination: "",
        busNumber: "",

        pricePerSeat: "",
        busType: "",
        totalSeats: "",
        availableSeats: ""
      }
    ]
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  // const [state] = React.useState({
  //   columns: [
  //     { title: "From", field: "startCity" },
  //     { title: "To", field: "destination" },
  //     { title: "BusNumber", field: "busNumber" },

  //     { title: "Price", field: "pricePerSeat" },
  //     { title: "Bus Type", field: "busType" },
  //     { title: "TotalSeats", field: "totalSeats" },
  //     { title: "AvailableSeats", field: "availableSeats" }
  //   ]
  // });
  const snackbarClose = e => {
    setSnackbarOpen(false);
    getTravels();
  };
  const getTravels = async () => {
    // await axios
    //   .get("http://localhost:8080/booking/getAll")
    props
      ._getAllTravels_Admin()
      .then(response => {
        let data = [];
        response.data.forEach(el => {
          data.push({
            id: el._id,
            startCity: el.startCity,
            destination: el.destination,
            busNumber: el.busNumber,

            pricePerSeat: el.pricePerSeat,
            busType: el.busType,
            totalSeats: el.totalSeats,
            availableSeats: el.availableSeats
          });
        });
        setEntries({ data: data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getTravels();
  }, []);
  // console.log(props.travelsData.data, "travelsData");

  return (
    <>
      <MaterialTable
        style={{ width: "96% ", margin: "auto" }}
        title="Travels Management"
        // columns={state.columns}
        columns={[
          { title: "From", field: "startCity" },
          { title: "To", field: "destination" },
          { title: "BusNumber", field: "busNumber" },

          { title: "Price", field: "pricePerSeat" },
          { title: "Bus Type", field: "busType" },
          { title: "TotalSeats", field: "totalSeats" },
          { title: "AvailableSeats", field: "availableSeats" }
        ]}
        // data={entries.data}
        data={entries.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...entries.data];
                data[data.indexOf(oldData)] = newData;
                // axios
                //   .put(
                //     `http://localhost:8080/booking/update/${oldData.id}`,
                //     newData,
                //     {
                //       params: {
                //         id: entries.data[0].id
                //       }
                //     }
                //   )
                props
                  ._updateTravels_Admin(oldData)
                  .then(res => console.log(res.data));
                setSnackbarOpen(true);
                setSnackbarMsg("Travels updated");

                setEntries({ ...entries, data });
                getTravels();
              }, 1000);
            }),
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...entries.data];

                // axios
                //   .post("http://localhost:8080/booking/create", newData)
                props
                  ._postTravels_Admin(newData)
                  .then(res => console.log(res.data));

                setSnackbarOpen(true);
                setSnackbarMsg("Travels added ");

                setEntries({ ...entries, data });
                getTravels();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...entries.data];
                data.splice(data.indexOf(oldData), 1);
                // axios
                //   .delete(
                //     `http://localhost:8080/booking/delete/${oldData.id}`,
                //     oldData
                //   )
                props._deleteTravels_Admin(oldData).then(res => {
                  console.log(res.data);
                });
                setSnackbarOpen(true);
                setSnackbarMsg("Travels deleted ");

                setEntries({ ...entries, data });
                getTravels();
              }, 1000);
            })
        }}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={snackbarClose}
        message={snackbarMsg}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={snackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
};

// const mapStateToProps = state => {
//   console.log(state, "state");

//   return {
//     // travelsData is any name we given: state is line no 533 state .adminData is defined in root reducer .travels is defined in adminReducer
//     travelsData: state.adminData.travels
//   };
// };
export default connect(null, {
  _getAllTravels_Admin,
  _postTravels_Admin,
  _updateTravels_Admin,
  _deleteTravels_Admin
})(TravelsIndex);
