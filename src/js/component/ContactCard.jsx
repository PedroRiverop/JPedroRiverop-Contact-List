import React from "react";
import "../../styles/ContactCard.css";
import PropTypes from "prop-types";
import userIcon from "../../img/User-icon.png";

const ContactCard = (props) => {
  


  const {
    contactName = "Sin nombre",
    contactAddress = "Sin dirección",
    contactPhone = "Sin telefono",
    contactMail = "Sin email",
    contactId,
    onDelete = () => console.log("No se ha asociado una función para eliminar"),
    onEdit = () => console.log("No se ha asociado una función para editar"),
  } = props;


  
  return (
    <div className="container-fluid border p-3 mb-3 contact-card">
      <div className="row">
        



        <div className="col-md-2 col-sm-12 d-flex justify-content-center align-items-center">
          <div id="avatar-container">
            <img
              src={userIcon}
              alt="contact-avatar"
              className="img-fluid rounded-circle"
            />
          </div>
        </div>

       
        <div className="col-md-8 col-sm-12">
          <div className="row text-start">
            <h5>{contactName}</h5>
          </div>
          <ul className="list-unstyled d-flex flex-column gap-1 align-items-start ps-0">
            <li className="text-secondary">
              <i className="fas fa-location-dot me-2"></i>
              <span className="contact-info">{contactAddress}</span>
            </li>
            <li className="text-secondary">
              <i className="fas fa-phone me-2"></i>
              <span className="contact-info">{contactPhone}</span>
            </li>
            <li className="text-secondary">
              <i className="fas fa-envelope me-2"></i>
              <span className="contact-info">{contactMail}</span>
            </li>
          </ul>
        </div>



        <div className="col-md-2 col-sm-12 d-flex justify-content-center align-items-center">
          <div className="d-flex gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onEdit(contactId);
              }}
              className="btn text-primary"
            >
              <i className="fas fa-pencil"></i>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onDelete(contactId);
              }}
              className="btn text-danger"
            >
              <i className="fas fa-trash-can"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contactImg: PropTypes.string,
  contactName: PropTypes.string,
  contactAddress: PropTypes.string,
  contactPhone: PropTypes.string,
  contactMail: PropTypes.string,
  contactId: PropTypes.number,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ContactCard;
