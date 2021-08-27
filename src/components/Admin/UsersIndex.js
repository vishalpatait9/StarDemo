import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";

import {
  _getAllUsers_Admin,
  _postUsers_Admin,
  _updateUsers_Admin,
  _deleteUsers_Admin
} from "../../Redux/Actions/admin.actions";

const UsersIndex = props => {
  const [entries, setEntries] = useState({
    data: [
      {
        id: "",
        name: "",
        email: "",
        mobile: "",

        gender: "",
        dob: ""
      }
    ]
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const snackbarClose = e => {
    setSnackbarOpen(false);
    getUsers();
  };
  const getUsers = async () => {
    // axios
    //   .get("http://localhost:8080/users/getAll")
    await props
      ._getAllUsers_Admin()
      .then(response => {
        let data = [];
        response.data.forEach(el => {
          data.push({
            id: el._id,
            name: el.name,
            email: el.email,
            mobile: el.mobile,

            gender: el.gender,
            dob: el.dob
          });
        });
        setEntries({ data: data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <MaterialTable
        style={{ width: "96% ", margin: "auto" }}
        title="Users Management"
        // columns={state.columns}
        columns={[
          { title: "Name", field: "name" },
          { title: "Email", field: "email" },
          { title: "Mobile", field: "mobile" },

          { title: "Gender", field: "gender" },
          { title: "DOB", field: "dob" }
        ]}
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
                //     `http://localhost:8080/users/update/${oldData.id}`,
                //     newData,
                //     {
                //       params: {
                //         id: entries.data[0].id
                //       }
                //     }
                //   )
                props
                  ._updateUsers_Admin(oldData)
                  .then(res => console.log(res.data));
                setSnackbarOpen(true);
                setSnackbarMsg("User details updated");

                setEntries({ ...entries, data });
                getUsers();
              }, 1000);
            }),
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...entries.data];

                // axios
                //   .post("http://localhost:8080/users/create", newData)
                props
                  ._postUsers_Admin(newData)
                  .then(res => console.log(res.data));

                setSnackbarOpen(true);
                setSnackbarMsg("User added ");

                setEntries({ ...entries, data });
                getUsers();
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
                //     `http://localhost:8080/users/delete/${oldData.id}`,
                //     oldData
                //   )
                props._deleteUsers_Admin(oldData).then(res => {
                  console.log(res.data);
                });
                setSnackbarOpen(true);
                setSnackbarMsg("User deleted ");

                setEntries({ ...entries, data });
                getUsers();
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
//     userData: state.adminData.users
//   };
// };
export default connect(null, {
  _getAllUsers_Admin,
  _postUsers_Admin,
  _updateUsers_Admin,
  _deleteUsers_Admin
})(UsersIndex);
// const mapDispatchToProps = dispatch => {       //this is alternative to postUsers function we written below in connect
//   return {
//     postUsers: (name, email, mobile, message, city, password, gender) =>
//       dispatch(postUsers(name, email, mobile, message, city, password, gender))
//   };
// };
