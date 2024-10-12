import "../styles/Add.css";
import backButton from "../assets/img/back-button.svg";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

interface Add {
  productName: string;
  productPrice: string;
  productImage: null | File;
}
const Add: React.FC<Add> = () => {
  const [formData, setFormData] = useState<Add>({
    productName: "",
    productPrice: "",
    productImage: null,
  });
  const navigate = useNavigate();
  const handleBackToHome = () => {
    // navigate("/");
    navigate("/", { state: { added: true } });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, productImage: e.target.files[0] });

      const url = URL.createObjectURL(e.target.files[0]);
      const imageHolder = document.getElementsByClassName(
        "productImage-holder"
      )[0] as HTMLElement;
      if (imageHolder) {
        imageHolder.style.backgroundImage = `url(${url})`;
        imageHolder.classList.add("custom-image");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.productName);
    formDataToSend.append("price", formData.productPrice);
    if (formData.productImage) {
      formDataToSend.append("image", formData.productImage);
    }

    const token = localStorage.getItem("token");
    axios
      .post("https://test1.focal-x.com/api/items", formDataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setFormData({ productName: "", productPrice: "", productImage: null });

        const imageHolder = document.getElementsByClassName(
          "productImage-holder"
        )[0] as HTMLElement;
        if (imageHolder) {
          imageHolder.style.backgroundImage = "";
          imageHolder.classList.remove("custom-image");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div id="add">
      <button className="border-0 bg-body" onClick={handleBackToHome}>
        <img src={backButton} alt="" />
      </button>
      
      <div className="content"><div className="title-holder justify-content-start p-0">
        <Row>
        <p className="m-0 title">ADD NEW ITEM</p>
        </Row>
      </div>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-between g-0">
            <Col md={6} className="d-flex flex-column name-price p-0 pe-3">
              <Form.Group>
                <Form.Label htmlFor="productName" className="mb-3">
                  Name
                </Form.Label>
                <Form.Control
                  name="productName"
                  autoFocus
                  type="text"
                  id="productName"
                  placeholder="Enter the product name"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="productPrice" className="mb-3">
                  Price
                </Form.Label>
                <Form.Control
                  name="productPrice"
                  type="number"
                  id="productPrice"
                  placeholder="Enter the product price"
                  value={formData.productPrice}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="p-0 ps-3">
              <Form.Group>
                <Form.Label htmlFor="productImage" className="mb-3">Image</Form.Label>
                <Form.Label
                  htmlFor="productImage"
                  className="productImage-holder m-0"
                ></Form.Label>
                <Form.Control
                  className="d-none"
                  type="file"
                  name="productImage"
                  id="productImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
            </Col>
           
            <Button type="submit" className="saveButton mx-auto">
              SAVE
            </Button>
            
            
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Add;
