import Sidebar from "./Sidebar";
import logo from "../assets/img/Logo.png";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import "../styles/ProductList.css";
import ProductCard from "./ProductCard";
import searchLogo from "../assets/img/searchLogo.svg";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth >= 1230 ? 8 : 6
  );
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState<Product[]>([]);

  const fetchItems = () => {
    axios.get("https://test1.focal-x.com/api/items", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setItems(res.data);
        setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        setCurrentItems(res.data.slice(0, itemsPerPage));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    } else {
      fetchItems();
    }
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = window.innerWidth >= 1200 ? 8 : 6;
      setItemsPerPage(newItemsPerPage);
      setTotalPages(Math.ceil(items.length / newItemsPerPage));
      setCurrentPage(1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items]);

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCurrentItems(filteredItems.slice(offset, offset + itemsPerPage));
    setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));
  }, [currentPage, items, itemsPerPage, searchTerm]);

  useEffect(() => {
    if (location.state?.updated || location.state?.added) {
      fetchItems();
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);

  const handleAddRedirect = () => {
    navigate("/add");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];

    pages.push(
      <button
        key="prev"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="pagination-button"
      >
        &lt;
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === 3 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`pagination-button ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      } else if (i === 2 || i === totalPages - 1) {
        pages.push(
          <span key={`ellipsis-${i}`} className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    pages.push(
      <button
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="pagination-button"
      >
        &gt;
      </button>
    );

    return <div className="pagination-container">{pages}</div>;
  };

  return (
    <div id="products" className="d-flex align-items-start">
      <Sidebar logo={logo} />
      <div id="product-content">
        {location.pathname === "/add" ||
        location.pathname.includes("/edit") ||
        location.pathname.includes("/show") ? (
          <Outlet context={{ fetchItems }} />
        ) : (
          <>
            <div className="position-relative search-container">
              <Form.Control
                className="search-input custom-input"
                placeholder="Search product by name"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img src={searchLogo} alt="Search Icon" className="search-icon" />
            </div>
            <div className="content">
              <div className="d-flex justify-content-end">
                <Button
                  onClick={handleAddRedirect}
                  className="add-button text-center"
                >
                  ADD NEW PRODUCT
                </Button>
              </div>

              <div className="card-pagination d-flex flex-column">
                <Row className="content-cards d-flex flex-wrap align-items-center justify-content-start g-0">
                  {currentItems.map((item) => (
                    <Col xl={3} lg={4} md={4} className="d-flex justify-content-center">
                      <ProductCard key={item.id} product={item} />
                    </Col>
                  ))}
                </Row>
                <div className="d-flex justify-content-center my-auto">
                  {renderPagination()}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>




  );
};

export default ProductList;

{/* <div id="products" className="d-flex align-items-start">
  <Sidebar logo={logo} />
  <div id="product-content">
    {location.pathname === "/add" ||
    location.pathname.includes("/edit") ||
    location.pathname.includes("/show") ? (
      <Outlet context={{ fetchItems }} />
    ) : (
      <>
        <div className="position-relative search-container">
          <Form.Control
            className="search-input custom-input"
            placeholder="Search product by name"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={searchLogo} alt="Search Icon" className="search-icon" />
        </div>
        <div className="content">
          <div className="d-flex justify-content-end">
            <Button
              onClick={handleAddRedirect}
              className="add-button text-center"
            >
              ADD NEW PRODUCT
            </Button>
          </div>

          <Row className="content-cards d-flex flex-wrap align-items-center justify-content-between">
            {currentItems.map((item) => (
              <Col xl={3} lg={4} md={4} className="d-flex justify-content-center">
                <ProductCard key={item.id} product={item} />
              </Col>
            ))}
          </Row>
        </div>
        <div className="card-pagination">
          <div className="d-flex justify-content-center my-auto">
            {renderPagination()}
          </div>
        </div>
      </>
    )}
  </div>
</div> */}