import React from 'react';
import '../styles/ConfirmationModal.css'; // For styling
import axios from 'axios';

interface ConfirmationModalProps {
  itemId: number;
  onClose: () => void;
  onConfirm: () => void;
}

const Test: React.FC<ConfirmationModalProps> = ({ itemId, onClose, onConfirm }) => {

  const handleDelete = async () => {
    try {
      await axios.delete(`https://test1.focal-x.com/api/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in local storage
        },
      });
      onConfirm();  // Perform any additional actions like refreshing the list
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?</h3>
        <div className="modal-buttons">
          <button className="yes-btn" onClick={handleDelete}>Yes</button>
          <button className="no-btn" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Test;
