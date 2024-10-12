import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import backButton from "../assets/img/back-button.svg";
import "../styles/Show.css";
interface Product {
  name: string;
  price: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const Show: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");
      axios
        .get(`https://test1.focal-x.com/api/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          setProduct(res.data);
        })
        .catch((error) => console.log(error));
    };

    fetchProduct();
  }, [id]);

  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <div id="show">
      <button className="border-0 bg-body" onClick={handleBackToHome}>
        <img src={backButton} alt="" />
      </button>
      <div className="content d-flex flex-column my-0 mx-auto">
        <div className="product-name justify-content-start p-0 m-0">
          <p className="m-0">{product?.name}</p>
        </div>
        <Row className="p-0 m-0">

          <Col md={6} lg={12} className="text-center p-0 product-image">
            <img src={product?.image_url} alt={product?.name} />
          </Col>
          <Col
            className="product-spec d-flex justify-content-between p-0"
            lg={12}
            md={6}
          >
            <Row>
              <Col md={12} lg={6} className="text-start text-lg-start text-nowrap p-0">
                <p>
                  Price: <span>{product?.price}$</span>
                </p>
              </Col>
              <Col md={12} lg={6}  className="text-start text-lg-start text-nowrap p-0">
                <p>
                  Added At:{" "}
                  <span>
                    {product?.created_at
                      ? new Date(
                          product.created_at.slice(0, 10)
                        ).toLocaleDateString("en-GB")
                      : "N/A"}
                  </span>
                </p>
              </Col>
              <Col md={12} className="product-spec text-start text-lg-center text-nowrap p-0">
                <p>
                  Updated At:{" "}
                  <span>
                    {product?.updated_at
                      ? new Date(
                          product.updated_at.slice(0, 10)
                        ).toLocaleDateString("en-GB")
                      : "N/A"}
                  </span>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Show;
