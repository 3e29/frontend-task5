import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import '../styles/ConfirmationModal.css';

interface ConfirmationModalProps {
  itemId: number;
  show: boolean;
  onClose: () => void;
  onSuccessDelete: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ itemId, show, onClose, onSuccessDelete }) => {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`https://test1.focal-x.com/api/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      onSuccessDelete();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static" className="modal">
      <div className="text-center modal-content">
        <p className="modal-title">ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?</p>
        <div className="modal-buttons d-flex justify-content-between">
          <Button className="yes-btn" onClick={handleDelete}>
            Yes
          </Button>
          <Button className="no-btn" onClick={onClose}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;


