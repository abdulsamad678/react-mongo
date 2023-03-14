import React, { Fragment, useContext, useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as Icon from "react-feather";
import { MDBBtn } from "mdb-react-ui-kit";
import { register } from "../actions/auth";
import "../../src/index";
//import "../../tailwind.config"
//import Logo from "../assets/images/overlay-thumb-bg.jpg";
import Logo from "../assets/images/logo.png";
import auth from "../actions/auth";
import "../assets/css/style.css";
const Register = ({ register }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log("auth" + JSON.stringify(auth));
  useEffect(() => {
    console.log("dddddddddddddddddd");
    //console.log('user : ' + JSON.stringify(user))
    if (auth.success == true) {
      console.log("auth state : " + JSON.stringify(auth));
      console.log("ddddddddddddddddddjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
      // <NavLink to="/dash"></NavLink>
      navigate("/login");
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    }
  }, [auth]);

  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });
  let { name, email, password } = form;
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const onsignupHandler = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      password: password,
    };

    console.log("Current data is : " + JSON.stringify(data));
    console.log("after data" + JSON.stringify(data));
    console.log(" In onLoginHandler");

    dispatch(register(data));
    console.log("this is admin usre" + JSON.stringify(data));
  };
  return (
    <>
      <div
        className="image"
        style={{ height: "100vh", backgroundSize: "cover" }}
      >
        <div className="auth-box" style={{ width: "100%" }}>
          <Form
            onSubmit={onsignupHandler}
            className="abc"
            // style={{ paddingTop: "3%", paddingRight: "5%" }}
          >
            {/* <Image src={Logo} alt="Logo" style={{ paddingBottom: "10%" }} /> */}

            <h1 className="form-1">
              <b>REGISTER HERE </b>
            </h1>
            <br />
            <Form.Group>
              <div class="grid mb-12">
                <div className="flex">
                  <label
                    for="first_name"
                    class="block mb-2 w-32 text-sm font-medium text-gray-900 dark:text-white labels"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>
              </div>

              <div class="grid mb-12">
                <div className="flex">
                  <label
                    for="last_name"
                    class="block mb-2 w-32 text-sm font-medium text-gray-900 dark:text-white labels"
                  >
                   Email
                  </label>
                  <input
                    type="email"
                    id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div class="grid mb-12">
                <div className="flex">
                  <label
                    for="last_name"
                    class="block mb-2 w-32 text-sm font-medium text-gray-900 dark:text-white labels"
                  >
                   Password
                  </label>
                  <input
                    type="password"
                    id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              {/* <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
              <br></br>
              <br></br>
              <br></br> */}
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                style={{ marginLeft: "10%" }}
              />
              <br></br>
              <br></br>
              <br></br>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
              <br></br>
              <br></br>
              <br></br>
            </Form.Group> */}
            <div className="text-center">
              <Button
                className="btn-xxl"
                id="btn-flat"
                variant="flat"
                size="xxl"
                type="submit"
              >
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
Register.propTypes = {
  register: PropTypes.func.isRequired,
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     register: dispatch(register),
//   }
// }
const mapDispatchToProps = (dispatch) => {
  return {
    register: (arg) => {
      dispatch(register(arg));
    },
  };
};

export default connect(null, mapDispatchToProps)(Register);
//export default connect(null,mapDispatchToProps)(Register);
