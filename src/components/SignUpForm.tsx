// src/components/SignUpForm.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../styles/SignUpForm.css";
import { Col, Row } from "react-bootstrap";

interface SignUpFormProps {
  logo: string;
}
interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: null | File;
}
const SignUpForm: React.FC<SignUpFormProps> = ({ logo }) => {
  const [formData, setFormData] = useState<SignUpForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, profileImage: e.target.files[0] });

      const url = URL.createObjectURL(e.target.files[0]);

      // Update the background image of the label is with class 'image-holder'
      const imageHolder = document.getElementsByClassName(
        "image-holder"
      )[0] as HTMLElement;
      if (imageHolder) {
        imageHolder.style.backgroundImage = `url(${url})`;
        imageHolder.style.backgroundSize = "cover";
        imageHolder.style.backgroundPosition = "center";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // we are using FormData and append here because we will be dealing with file,
    //if not, we could approach axios just the regular way in normal JS just as I did in SignUp
    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.firstName);
    formDataToSend.append("last_name", formData.lastName);
    formDataToSend.append(
      "user_name",
      formData.firstName + " " + formData.lastName
    );
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("password_confirmation", formData.password);
    if (formData.profileImage) {
      formDataToSend.append("profile_image", formData.profileImage as Blob);
    }

    axios
      .post("https://test1.focal-x.com/api/register", formDataToSend)
      .then((res) => {
        console.log(res);
        navigate("/signin");
      })
      .catch((error) => console.log(error));
  };

  const handleSignInRedirect = () => {
    navigate('/signin');
  };

  return (
    <div className="sign-up-container">
      <Form className="sign-up-form" onSubmit={handleSubmit}>
        <img src={logo} alt="logo" className="sign-up-logo" />
        <h2 className="sign-up-title">SIGN UP</h2>
        <p className="sign-up-subtitle">
          Fill in the following fields to create an account.
        </p>
        <Row className="d-flex align-items-end">
          <Col xs={6}>
            <Form.Group className="">
              <Form.Label htmlFor="firstName" className="mt-1">
                Name
              </Form.Label>
              <Form.Control
                autoFocus
                className="custom-input"
                id="firstName"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Form.Group>
              <Form.Control
                className="custom-input"
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              className="custom-input"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Col xs={6}>
            <Form.Group className="">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                className="custom-input"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Form.Group>
              <Form.Control
                className="custom-input"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Form.Label htmlFor="profileimage">Profile Image</Form.Label>
          <Form.Label
            htmlFor="profileimage"
            className="image-holder"
          ></Form.Label>
          <input
            className="sign-up-file-input"
            id="profileimage"
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Row>
        <button type="submit" className="sign-up-button">
          SIGN UP
        </button>
        <p className="sign-up-footer-text">
            Don't have an account?{' '}
            <span onClick={handleSignInRedirect} className="sign-in-link">
            Sign in
            </span>
          </p>
      </Form>
    </div>
  );
};

export default SignUpForm;
