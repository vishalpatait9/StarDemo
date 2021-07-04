import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import axios from "axios";

export default function BookingList() {
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

  const [state] = React.useState({
    columns: [
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
    ]
  });
  const getBookings = async () => {
    await axios
      .get("http://localhost:8080/reservation/getAll")
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
  useEffect(async () => {
    await getBookings();
  }, []);

  return (
    <>
      <MaterialTable
        style={{ width: "96% ", margin: "auto" }}
        title="Booking Table"
        columns={state.columns}
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
                axios
                  .put(
                    `http://localhost:8888/api/v1/dish/${oldData.id}`,
                    newData,
                    {
                      params: {
                        id: entries.data[0].id
                      }
                    }
                  )
                  .then(res => console.log(res.data));
                setEntries({ ...entries, data });
              }, 1000);
            }),
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...entries.data];

                axios
                  .post("http://localhost:8080/reservation/create", newData)
                  .then(res => console.log(res.data));

                setEntries({ ...entries, data });
              }, 3000);
              getBookings();
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...entries.data];
                data.splice(data.indexOf(oldData), 1);
                axios
                  .delete(
                    `http://localhost:8080/reservation/delete/${oldData.id}`,
                    oldData
                  )
                  .then(res => console.log(res.data));

                setEntries({ ...entries, data });
              }, 3000);
              getBookings();
            })
        }}
      />
    </>
  );
}
