import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";

import { db, auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";

import Logo from "../assets/img/Logo.png";
import "./styles/LoginPanel.scss";

const LoginPanel = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [routePage, setRoutePage] = useState(null);
  const [wrong, setWrong] = useState(false);
  const [wrongMessage, setWrongMessage] = useState("");
  const [headerAuthPanel, setHeaderAuthPanel] = useState("");
  const [submitLabelButton, setSubmitLabelButton] = useState("");
  const [mainDialog, setMainDialog] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    accept: false,
  };

  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  const dialogSignupMain = (
    <React.Fragment>
      <div className="flex justify-content-center align-items-center flex-column pt-6 px-3">
        <i
          className="pi pi-check-circle"
          style={{ fontSize: "2rem", color: "var(--green-500)" }}
        ></i>
        <h5 className="py-2">Registration Successful!</h5>
        <div className="text-center">
          Your account is registered <b>{formData.email}</b>.
        </div>
      </div>
    </React.Fragment>
  );

  const dialogResetPasswordMain = (
    <React.Fragment>
      <div className="flex justify-content-center align-items-center flex-column pt-6 px-3">
        <i
          className="pi pi-check-circle"
          style={{ fontSize: "2rem", color: "var(--green-500)" }}
        ></i>
        <h5 className="py-2">Reset request password Successful!</h5>
        <div className="text-center">
          You will receive an email at <b>{formData.email}</b> for reset
          password instructions.
        </div>
      </div>
    </React.Fragment>
  );

  const dialogWrongProcess = (
    <React.Fragment>
      <div className="flex justify-content-center align-items-center flex-column pt-6 px-3">
        <i
          className="pi pi-times-circle"
          style={{ fontSize: "2rem", color: "rgb(194, 79, 79)" }}
        ></i>
        <h5 className="py-2">Warning!</h5>
        <div className="text-center">
          Something went wrong please try again later.
        </div>
      </div>
    </React.Fragment>
  );

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => {
          if (routePage === "signup") navigate("/signin");
          setShowMessage(false);
          reset();
        }}
      />
    </div>
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    switch (location.pathname) {
      case "/signin":
        setRoutePage("signin");
        setHeaderAuthPanel();
        setSubmitLabelButton("Sign in to Red House");
        break;
      case "/signup":
        setRoutePage("signup");
        setHeaderAuthPanel("Register");
        setSubmitLabelButton("Sign up to Red House");
        break;
      case "/password-reset":
        setRoutePage("password-reset");
        setHeaderAuthPanel("Reset your password");
        setSubmitLabelButton("Send password reset email");
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const onSubmit = (data) => {
    setFormData(data);
    hadlerSubmit(data);
  };

  const hadlerSubmit = (data) => {
    switch (routePage) {
      case "signup":
        signUp(data);
        break;
      case "signin":
        signIn(data);
        break;
      case "password-reset":
        resetPassword(data);
        break;
      default:
        break;
    }
  };

  const signUp = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        setHostInDb(data, response.user.uid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signIn = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((signInresponse) => {
        const hostCollectionRef = collection(db, "hosts");
        const getInfoHost = async () => {
          const dataDb = await getDocs(hostCollectionRef);
          const infoHost = dataDb.docs.find((reservation) => {
            return reservation.data().email === data.email;
          });
          return infoHost.data();
        };
        getInfoHost().then((response) => {
          const authInfo = {
            token: signInresponse.user.accessToken,
            expired:
              new Date().getTime() +
              +signInresponse._tokenResponse.expiresIn * 1000,
            fullName: response.name,
            email: signInresponse.user.email,
            uid: signInresponse.user.uid,
          };
          dispatch(login(authInfo));
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        if (error.message.includes("wrong-password")) {
          setWrongMessage("Wrong password, Retry!");
          setWrong(true);
        }
        if (error.message.includes("user-not-found")) {
          setWrong(true);
          setWrongMessage("I think you have to register first!");
        }
      });
  };
  const resetPassword = (data) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setShowMessage(true);
        setMainDialog(dialogResetPasswordMain);
      })
      .catch((error) => {
        setShowMessage(true);
        setMainDialog(dialogWrongProcess);
        console.log(error);
      });
  };

  const setHostInDb = async (infoHost, uid) => {
    await setDoc(doc(db, "hosts", uid), {
      name: infoHost.name,
      email: infoHost.email,
    })
      .then(() => {
        setShowMessage(true);
        setMainDialog(dialogSignupMain);
      })
      .catch((error) => {
        setShowMessage(true);
        setMainDialog(dialogWrongProcess);
        console.log(error);
      });
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        {mainDialog}
      </Dialog>
      <div>
        <div className="card">
          <img src={Logo} alt={Logo} />
          <h3 className="text-center font-bold">{headerAuthPanel}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            {routePage !== "password-reset" && routePage === "signup" && (
              <div className="field text-left">
                <label
                  htmlFor="name"
                  className={classNames({ "p-error": errors.name })}
                >
                  Name
                </label>
                <span>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        placeholder="Name"
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("name")}
              </div>
            )}
            <div className="field text-left">
              <label
                htmlFor="email"
                className={classNames({ "p-error": !!errors.email })}
              >
                Email
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address. E.g. example@email.com",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      placeholder="Email"
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
              </span>
              {getFormErrorMessage("email")}
            </div>
            {routePage === "signin" && (
              <Button
                type="button"
                label="Forgot password?"
                className="p-button-link p-0 mb-3 text-right"
                onClick={() => navigate("/password-reset")}
              />
            )}
            {routePage !== "password-reset" && (
              <div className="field text-left">
                <label
                  htmlFor="password"
                  className={classNames({ "p-error": errors.password })}
                >
                  Password
                </label>
                <span>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required.",
                    }}
                    render={({ field, fieldState }) => (
                      <Password
                        id={field.name}
                        {...field}
                        toggleMask
                        placeholder="Password"
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        header={passwordHeader}
                        footer={passwordFooter}
                        feedback={routePage === "signup" ? true : false}
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("password")}
              </div>
            )}
            {routePage === "signup" && (
              <div className="field-checkbox">
                <Controller
                  name="accept"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <Checkbox
                      inputId={field.name}
                      onChange={(e) => field.onChange(e.checked)}
                      checked={field.value}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="accept"
                  className={classNames({ "p-error": errors.accept })}
                >
                  I agree to the terms and conditions*
                </label>
              </div>
            )}
            {wrong && <div className="p-error">{wrongMessage}</div>}

            <Button type="submit" label={submitLabelButton} className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
