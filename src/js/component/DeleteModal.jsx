import React from "react";
import PropTypes from "prop-types";
import "../../styles/DeleteModal.css";

const DeleteModal = ({
  showModal,
  handleCloseModal,
  handleDelete,
  title = "Esta seguro?",
  bodyText = "Si elimina el contacto, no podra recuperarlo.",
  confirmText = "Si, estoy seguro!",
  cancelText = "Cancelar",
}) => {
  if (!showModal) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
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
