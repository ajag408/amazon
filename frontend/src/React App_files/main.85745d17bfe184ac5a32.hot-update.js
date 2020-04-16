webpackHotUpdate("main",{

/***/ "./src/components/Login/Login.js":
/*!***************************************!*\
  !*** ./src/components/Login/Login.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {


__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../App.css */ "./src/App.css");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-cookies */ "./node_modules/react-cookies/build/cookie.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
var _jsxFileName = "/Users/Akash 1/Desktop/SJSU/Sp20/273/Assignments/ReactBookApp/Frontend/src/components/Login/Login.js";




 //Define a Login Component

class Login extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props); //maintain the state required for this component

    this.usernameChangeHandler = e => {
      this.setState({
        username: e.target.value
      });
    };

    this.passwordChangeHandler = e => {
      this.setState({
        password: e.target.value
      });
    };

    this.submitLogin = e => {
      var headers = new Headers(); //prevent page from refresh

      e.preventDefault();

      if (this.state.username.length == 0) {
        this.setState({
          userVal: "Please enter username"
        });
      } else if (this.state.password.length == 0) {
        this.setState({
          passVal: "Please enter password"
        });
      } else {
        this.setState({
          passVal: "",
          userVal: ""
        });
        const data = {
          username: this.state.username,
          password: this.state.password
        }; //set the with credentials to true

        axios__WEBPACK_IMPORTED_MODULE_2___default.a.defaults.withCredentials = true; //make a post request with the user data

        axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('http://localhost:3001/login', data).then(response => {
          console.log("Status Code : ", response.status);

          if (response.status === 200) {
            this.setState({
              login: "Login credentials invalid",
              authFlag: true
            });
          } else {
            this.setState({
              authFlag: false
            });
          }
        });
      }
    };

    this.state = {
      username: "",
      password: "",
      login: "",
      passVal: "",
      userVal: "",
      authFlag: false
    }; //Bind the handlers to this class

    this.form = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  } //Call the Will Mount to set the auth Flag to false


  componentWillMount() {
    this.setState({
      authFlag: false
    });
  } //username change handler to update state variable with the text entered by the user


  render() {
    //redirect based on successful login
    let redirectVar = null;

    if (react_cookies__WEBPACK_IMPORTED_MODULE_3___default.a.load('cookie')) {
      redirectVar = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_4__["Redirect"], {
        to: "/home",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        },
        __self: this
      });
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98
      },
      __self: this
    }, redirectVar, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "error",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101
      },
      __self: this
    }, this.state.login), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "login-form",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "main-div",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "panel",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105
      },
      __self: this
    }, "Admin Login"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 106
      },
      __self: this
    }, "Please enter your username and password")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "form-group",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 109
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "error",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110
      },
      __self: this
    }, this.state.userVal), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      required: true,
      onChange: this.usernameChangeHandler,
      type: "text",
      class: "form-control",
      name: "username",
      placeholder: "Username",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "form-group",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 113
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "error",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 114
      },
      __self: this
    }, this.state.passVal), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      required: true,
      onChange: this.passwordChangeHandler,
      type: "password",
      class: "form-control",
      name: "password",
      placeholder: "Password",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 115
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      onClick: this.submitLogin,
      class: "btn btn-primary",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 117
      },
      __self: this
    }, "Login")))));
  }

} //export Login Component


/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ })

})
//# sourceMappingURL=main.85745d17bfe184ac5a32.hot-update.js.map