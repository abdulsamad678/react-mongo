import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import axios from "axios";

const Home = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    debugger;
    setAge(event?.target?.value);
  };

  const Actionbtns = (value) => {
    return (
      <div class="flex space-x-4 my-2">
        <button
          onClick={() => {
            debugger;
            setShowUpdateModal(true);
            setName(value.data.Name);
            setEmail(value.data.Email);
            setContact(value.data.Contact);
          }}
        >
          {" "}
          <svg
            class="w-6 h-6 dark:text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            ></path>
          </svg>
        </button>
        <button onClick={() => setShowDeleteModal(true)}>
          {" "}
          <svg
            class="w-6 h-6 dark:text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            ></path>
          </svg>
        </button>
      </div>
    );
  };

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "color",
      width: 150,
      headerName: "Color",
      filter: "agSetColumnFilter",
      flex: 1,
    },
    {
      field: "model",
      headerName: "Model",
      width: 150,
      filter: "agSetColumnFilter",
      flex: 1,
    },
    {
      field: "vehicle",
      headerName: "Vehicle",
      width: 150,
      filter: "agSetColumnFilter",
      flex: 1,
    },
    {
      field: "",
      headerName: "Action",
      cellRenderer: Actionbtns,
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
    //  minWidth:400,
    resizable: true,
    sortable: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from sever

  const GridData = [
    {
      // color: color,
      // model: model,
      // vehicles: vehicles,
    },
  ];

  useEffect(() => {
    allVehicles();
    allVehicleslist();
  }, []);

  const handleDelete = () => {};

  const [errormsg, seterrormsg] = useState("");
  const handleSubmit = (event) => {
    if (!name) {
      return seterrormsg("Name Required!");
    }
    event.preventDefault();
    const data = {
      color: name,
      model: email,
      // color: color,
      // model: model,
      vehicles: age,
    };
    debugger;
    postform(data);
    // GridData.push(data);
    // setRowData(GridData);

    setShowModal(false);
  };

  const handleUpdate = () => {
    debugger;
    // event.preventDefault();
    const data = {
      // color: color,
      // model: model,
      // vehicles: vehicles,
    };
    // GridData.push(data);
    setRowData(GridData);
  };

  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);

  // const [Vehicles, setVehicles] = useState("");
  const postform = async (data) => {
    debugger;
    axios
      .post("http://localhost:5008/api/user/car_credential", {
        color: data.color,
        model: data.model,
        vehicle: data.vehicle,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [Vehicleslist, setVehicleslist] = useState("");
  const allVehicleslist = async () => {
    await fetch(`http://localhost:5008/api/user/getcars`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setVehicleslist(data?.data?.car);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [Vehicles, setVehicles] = useState("");
  const allVehicles = async () => {
    await fetch(
      `http://localhost:5008/api/user/all_car_credential`,

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        debugger;
        setVehicles(data?.data?.car);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <button
        className="text-white my-4 mx-2 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        onClick={() => {
          allVehicleslist();
          setShowModal(true);
        }}
      >
        Add New Vehicle
      </button>
      {showModal ? (
        <form onSubmit={handleSubmit}>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto min-w-fit max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-center font-semibold">
                    Add New Vehicle
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div>
                    <label
                      for="contact"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Vehicle
                    </label>
                    {/* <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <select
                      // value={age}
                      style={{ width: "200px" }}
                      label="Age"
                      onChange={handleChange}
                    >
                      {Vehicleslist &&
                        Vehicleslist.map((e) => (
                          <option value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    {/* </Select>
                    </FormControl> */}
                  </div>
                  <div className="flex-1 flex-row">
                    <label
                      for="name"
                      className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Color
                    </label>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      type="name"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Model
                    </label>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      // type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
                {errormsg && <div>{errormsg}</div>}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </form>
      ) : null}

      {showUpdateModal ? (
        <form onSubmit={handleUpdate}>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto min-w-fit max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-center font-semibold">
                    Update User
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex-1 flex-row">
                    <label
                      for="name"
                      className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      type="name"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="contact"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Contact No.
                    </label>
                    <input
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                      type="contact"
                      name="contact"
                      id="contact"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Update User
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </form>
      ) : null}

      {showDeleteModal ? (
        <form onSubmit={handleDelete}>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto min-w-fit max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-center font-semibold">
                    Delete User
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex-1 flex-row">
                    <label
                      for="name"
                      className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Are you Sure you want to Delete this User?
                    </label>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-red active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </form>
      ) : null}

      <div
        className="ag-theme-alpine"
        style={{ height: "500px", width: "1000px" }}
      >
        <AgGridReact
          rowData={Vehicles}
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
        />
      </div>
    </div>
  );
};

export default Home;
