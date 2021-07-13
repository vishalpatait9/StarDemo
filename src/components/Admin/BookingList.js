import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

export default function BookingList() {
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
    await axios
      .get("https://starbakend.herokuapp.com/reservation/getAll")
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

                axios
                  .put(
                    `https://starbakend.herokuapp.com/reservation/update/${oldData.id}`,
                    newData,
                    {
                      params: {
                        id: entries.data[0].id
                      }
                    }
                  )
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

                axios
                  .post(
                    "https://starbakend.herokuapp.com/reservation/create",
                    newData
                  )
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
                axios
                  .delete(
                    `https://starbakend.herokuapp.com/reservation/delete/${oldData.id}`,
                    oldData
                  )
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
        autoHideDuration={6000}
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
}
