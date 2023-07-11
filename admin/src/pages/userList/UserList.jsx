import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCallsUser";
import { userRequest } from "../../requestMethods";


export default function UserList() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("user/");
        setUsers(res.data);
      } catch {
        console.log("faild")
      }
    };
    getUsers();
  }, [users]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "User Name",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        //console.log(params)
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
