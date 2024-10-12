import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ConfirmationModal from './ConfirmationModal'; 
import '../styles/ProductCard.css'; 
import AltImage from '../assets/img/Alt-image.jpg';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image_url: string;
    created_at: string;
    updated_at: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);
  const [imgSrc, setImgSrc] = useState<string>(product.image_url);
  // Handle delete button click
  const handleDeleteClick = (id: number) => {
    setItemIdToDelete(id);
    setShowModal(true);
  };

  // Close modal
  const handleModalClose = () => {
    setShowModal(false);
    setItemIdToDelete(null);
  };

  // Handle edit button click
  const handleEditClick = () => {
    navigate(`/edit/${product.id}`, { state: { product } });
  };

  // Handle clicking on card itself
  const handleCardClick = () => {
    navigate(`/show/${product.id}`);
  };
  const handleDeleteSuccess = () => {
    setShowModal(false); // Close the modal after successful delete
    setItemIdToDelete(null); // Clear the item to delete
    window.location.reload();
  };
  // Handle image error
  const handleImageError = () => {
    setImgSrc(AltImage); // Set to alt image if there's an error loading the original image
  };

  return (
    <>
      <div id='product-card' className="product-card" onClick={handleCardClick}>
        <img src={imgSrc} alt={product.name} className="product-image" onError={handleImageError} />
        <div className="overlay d-flex position-absolute justify-content-evenly">
          <p className='text-center'>{product.name}</p>
          <div>
          <Button variant="" className="edit-button me-3" onClick={(e) => { e.stopPropagation(); handleEditClick(); }}>
            Edit
          </Button>
          <Button variant="" className='delete-button' onClick={(e) => { e.stopPropagation(); handleDeleteClick(product.id); }}>
            delete
          </Button>
          </div>
          
        </div>
      </div>

      {/* Modal for delete confirmation */}
      <ConfirmationModal
        itemId={itemIdToDelete!}
        show={showModal}
        onClose={handleModalClose}
        onSuccessDelete={handleDeleteSuccess}
      />
    </>
  );
};

export default ProductCard;
