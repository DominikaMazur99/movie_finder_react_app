import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import SimpleButton from "../../components/buttons/SimpleButton.jsx";

import "react-toastify/dist/ReactToastify.css";

import InputField from "../../components/fieldsUI/InputField.jsx";
import loginIcon from "../images/loginIcon.png";

import "./LoginForm.scss";
import { saveDataInLocalStorage } from "../../helpers/localStorageFunctions.js";
import NotificationModal from "../modals/NotificationModal.jsx";

function LoginForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({
        title: "",
        message: "",
    });

    const navigate = useNavigate();

    const close = () => {
        setShow(false);
    };

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const LoginToApp = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:3001/users/" + login)
                .then((res) => {
                    console.log(res);
                    return res.json();
                })
                .then((resp) => {
                    //console.log(resp)
                    if (Object.keys(resp).length === 0) {
                        console.log("Please Enter valid login");
                        setShow(true);
                        setNotification({
                            title: "Error",
                            message: "Please Enter valid login",
                        });
                    } else {
                        if (resp.password === password) {
                            console.log("Success");
                            saveDataInLocalStorage("login", login);
                            navigate("/");
                        } else {
                            console.log("Please Enter valid credentials");
                            setShow(true);
                            setNotification({
                                title: "Error",
                                message: "Please Enter valid credentials",
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.log("Login Failed due to :" + err.message);
                    setShow(true);
                    setNotification({
                        title: "Error",
                        message: `Login Failed due to : + ${err.message}`,
                    });
                });
        }
    };

    const validate = () => {
        let result = true;
        if (login === "" || login === null) {
            result = false;
            console.log("enter login");
            toast.warning("Please enter your login.");
        }
        if (password === "" || password === null) {
            result = false;
            toast.warning("Please Enter Password");
        }
        return result;
    };

    return (
        <Container>
            <NotificationModal
                show={show}
                close={close}
                title={notification.title}
                message={notification.message}
            />
            <Row xs={2} md={8} className="login-box">
                <Form onSubmit={LoginToApp}>
                    <Col>
                        <div className="text-center">
                            <img
                                src={loginIcon}
                                alt="login icon"
                                className="login-box__icon "
                            />
                        </div>
                    </Col>
                    <Col>
                        <InputField
                            fieldId="login"
                            fieldLabel="Login"
                            fieldType="login"
                            placeholder="Your login"
                            onChange={(e) => setLogin(e.target.value)}
                            value={login}
                            name="login"
                        />
                    </Col>
                    <Col>
                        <InputField
                            fieldId="password"
                            fieldLabel="Password"
                            fieldType="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="password"
                        />
                    </Col>

                    <Col>
                        <div className="text-center">
                            <SimpleButton
                                variant="outline-dark"
                                type="submit"
                                text="Login"
                                onClick={LoginToApp}
                            />
                        </div>
                        <Form.Text className="text-muted">
                            <Link to="/register">
                                If you don't have account, click and register.
                            </Link>
                        </Form.Text>
                    </Col>
                </Form>
            </Row>
        </Container>
    );
}

export default LoginForm;
