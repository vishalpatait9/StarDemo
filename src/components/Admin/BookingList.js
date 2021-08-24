import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { connect } from "react-redux";

import {
  _getAllReservation_Admin,
  _postReservation_Admin,
  _updateReservation_Admin,
  deleteReservation_Admin
} from "../../Redux/Actions/admin.actions";

const BookingList = props => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [entries, setEntries] = useState({
    data: [
      {
        id: "",
        startCity: "",
        destination: "",
        busNumber: "",
        reservedSeat: "",
        pricePerSeat: "",
        transaction: "",
        name: "",
        mobile: "",
        email: "",
        passengers: ""
      }
    ]
  });

  // const [state] = React.useState({
  //   columns: [
  //     { title: "Name", field: "name" },
  //     { title: "Mobile", field: "mobile" },
  //     { title: "Email", field: "email" },
  //     { title: "From", field: "startCity" },
  //     { title: "To", field: "destination" },
  //     { title: "BusNumber", field: "busNumber" },
  //     { title: "Reserved Seat", field: "reservedSeat" },
  //     { title: "Price", field: "pricePerSeat" },
  //     { title: "Transaction", field: "transaction" },
  //     { title: "Passengers", field: "passengers" }
  //   ]
  // });
  const getBookings = async () => {
    // axios
    //   .get("http://localhost:8080/reservation/getAll")
    await props
      ._getAllReservation_Admin()
      .then(response => {
        let data = [];
        response.data.forEach(el => {
          data.push({
            id: el._id,
            startCity: el.startCity,
            destination: el.destination,
            busNumber: el.busNumber,
            reservedSeat: el.reservedSeat,
            pricePerSeat: el.pricePerSeat,
            passengers: el.passengers,
            transaction: el.transaction,
            name: el.user && el.user.name ? el.user && el.user.name : el.name,
            mobile:
              el.user && el.user.mobile ? el.user && el.user.mobile : el.mobile,
            email:
              el.user && el.user.email ? el.user && el.user.email : el.email
          });
        });
        setEntries({ data: data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getBookings();
  }, []);
  const snackbarClose = e => {
    setSnackbarOpen(false);
    getBookings();
  };
  return (
    <>
      <MaterialTable
        style={{ width: "96% ", margin: "auto" }}
        title="Reservation Management"
        // columns={state.columns}

        columns={[
          { title: "Name", field: "name" },
          { title: "Mobile", field: "mobile" },
          { title: "Email", field: "email" },
          { title: "From", field: "startCity" },
          { title: "To", field: "destination" },
          { title: "BusNumber", field: "busNumber" },
          { title: "Reserved Seat", field: "reservedSeat" },
          { title: "Price", field: "pricePerSeat" },
          { title: "Transaction", field: "transaction" },
          { title: "Passengers", field: "passengers" }
        ]}
        data={entries.data}
        options={{
          exportButton: true
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...entries.data];
                data[data.indexOf(oldData)] = newData;
                console.log(oldData.id, "oldData.id");

                // axios
                //   .put(
                //     `http://localhost:8080/reservation/update/${oldData.id}`,
                //     newData,
                //     {
                //       params: {
                //         id: entries.data[0].id
                //       }
                //     }
                //   )
                props
                  ._updateReservation_Admin(oldData)
                  .then(res => console.log(res.data));
                setSnackbarOpen(true);
                setSnackbarMsg("Reservation updated");
                setEntries({ ...entries, data });
                getBookings();
              }, 1000);
            }),
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...entries.data];

                // axios
                //   .post("http://localhost:8080/reservation/create", newData)
                props
                  ._postReservation_Admin(newData)
                  .then(res => {
                    console.log(res.data);
                    setSnackbarOpen(true);
                    setSnackbarMsg("Reservation added ");
                  })
                  .catch(err => {
                    setSnackbarOpen(true);
                    setSnackbarMsg("This seat is reserved , please try again");
                  });

                setEntries({ ...entries, data });
                getBookings();
              }, 3000);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...entries.data];
                data.splice(data.indexOf(oldData), 1);
                // axios
                //   .delete(
                //     `http://localhost:8080/reservation/delete/${oldData.id}`,
                //     oldData
                //   )
                props
                  .deleteReservation_Admin(oldData)
                  .then(res => console.log(res.data));
                setSnackbarOpen(true);
                setSnackbarMsg("Reservation deleted ");

                setEntries({ ...entries, data });
                getBookings();
              }, 3000);
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
//     userData: state.adminData.users
//   };
// };
export default connect(null, {
  _getAllReservation_Admin,
  _postReservation_Admin,
  _updateReservation_Admin,
  deleteReservation_Admin
})(BookingList);
