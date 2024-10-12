import React, { useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import { Button } from 'react-bootstrap';

const Parent2: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setItemIdToDelete(id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setItemIdToDelete(null);
  };

  return (
    <div>
      {/* Example item with a delete button */}
      <Button variant="danger" onClick={() => handleDeleteClick(5)}>Delete Item 5</Button>

      {/* Render the confirmation modal */}
      {showModal && itemIdToDelete !== null && (
        <ConfirmationModal 
          itemId={itemIdToDelete} 
          show={showModal} 
          onClose={handleModalClose} 
          // onConfirm={handleModalConfirm} 
        />
      )}
    </div>
  );
};

export default Parent2;
