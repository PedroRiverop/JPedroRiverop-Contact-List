import React from "react";
import PropTypes from "prop-types";

const DeleteModal = ({
  showModal,
  handleCloseModal,
  handleDelete,
  title = "Are you sure?",
  bodyText = "If you delete this, it cannot be undone.",
  confirmText = "Yes, delete it!",
  cancelText = "Cancel",
}) => {
  if (!showModal) return null; // Si no se debe mostrar el modal, no renderizamos nada

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{bodyText}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleDelete();
                handleCloseModal();
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  title: PropTypes.string,
  bodyText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default DeleteModal;
