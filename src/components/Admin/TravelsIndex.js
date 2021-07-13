import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
export default function TravelsIndex() {
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
    await axios
      .get("https://starbakend.herokuapp.com/booking/getAll")
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
        data={entries.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...entries.data];
                data[data.indexOf(oldData)] = newData;
                axios
                  .put(
                    `https://starbakend.herokuapp.com/booking/update/${oldData.id}`,
                    newData,
                    {
                      params: {
                        id: entries.data[0].id
                      }
                    }
                  )
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

                axios
                  .post(
                    "https://starbakend.herokuapp.com/booking/create",
                    newData
                  )
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
                axios
                  .delete(
                    `https://starbakend.herokuapp.com/booking/delete/${oldData.id}`,
                    oldData
                  )
                  .then(res => {
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
