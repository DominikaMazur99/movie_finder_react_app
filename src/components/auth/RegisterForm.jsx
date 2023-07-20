import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

import InputField from "../../components/fieldsUI/InputField.jsx";
import SimpleButton from "../../components/buttons/SimpleButton.jsx";

import loginIcon from "../../components/images/loginIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function RegisterForm() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = "Please enter the value in ";
        if (id === null || id === "") {
            isproceed = false;
            errormessage += " username";
        }
        if (name === null || name === "") {
            isproceed = false;
            errormessage += " fullname";
        }
        if (password === null || password === "") {
            isproceed = false;
            errormessage += " password";
        }
        if (email === null || email === "") {
            isproceed = false;
            errormessage += " email";
        }

        if (!isproceed) {
            toast.warning(errormessage);
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            } else {
                isproceed = false;
                toast.warning("Please enter the valid email");
            }
        }
        return isproceed;
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (IsValidate()) {
            fetch("http://localhost:3001/users", {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                    name: name,
                    email: email,
                    password: password,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then(() => {
                    toast.success("Registered successfully.");
                    navigate("/login");
                })
                .catch(() => {
                    toast.error("Registered failed.");
                });
        }
    };
    return (
        <>
            <Container>
                <Row xs={2} md={8} className="login-box">
                    <Form onSubmit={handleRegister}>
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
                                name="id"
                                fieldId="id"
                                fieldLabel="Login"
                                fieldType="text"
                                placeholder="Your Login"
                                onChange={(e) => setId(e.target.value)}
                                value={id}
                            />
                        </Col>
                        <Col>
                            <InputField
                                name="name"
                                fieldId="name"
                                fieldLabel="Name"
                                fieldType="text"
                                placeholder="Your name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </Col>

                        <Col>
                            <InputField
                                name="email"
                                fieldId="email"
                                fieldLabel="Email adress"
                                fieldType="email"
                                placeholder="Your e-mail adress"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </Col>
                        <Col>
                            <InputField
                                name="password"
                                fieldId="password"
                                fieldLabel="Password"
                                fieldType="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </Col>
                        <Col>
                            <div className="text-center">
                                <SimpleButton
                                    variant="outline-dark"
                                    type="submit"
                                    text="Register"
                                    onClick={handleRegister}
                                />
                            </div>
                            <Form.Text className="text-muted">
                                <Link to="/login">
                                    If you have account, click and login to app.
                                </Link>
                            </Form.Text>
                        </Col>
                    </Form>
                </Row>
            </Container>
        </>
    );
}

export default RegisterForm;
