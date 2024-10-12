import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal1';

const ParentComponent: React.FC = () => {
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

  const handleModalConfirm = () => {
    setShowModal(false);
    setItemIdToDelete(null);
    // Perform any additional actions here, such as refreshing the data or showing a success message
  };

  return (
    <div>
      {/* Assume there are items displayed here, and each item has a delete button */}
      <button onClick={() => handleDeleteClick(5)}>Delete Item 5</button>

      {/* Render the confirmation modal if it's supposed to be visible */}
      {showModal && itemIdToDelete && (
        <ConfirmationModal 
          itemId={itemIdToDelete} 
          onClose={handleModalClose} 
          onConfirm={handleModalConfirm} 
        />
      )}
    </div>
  );
};

export default ParentComponent;
