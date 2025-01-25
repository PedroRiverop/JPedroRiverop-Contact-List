import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard.jsx";
import DeleteModal from "../component/DeleteModal.jsx";



const Contact = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  
  const [userInput, setUserInput] = useState(""); 
  const [showModal, setShowModal] = useState(false); 
  const [selectedContactId, setSelectedContactId] = useState(null); 

 
  const handleEdit = (contactId) => navigate(`/editContact/${contactId}`); 

  const openModal = (id) => {
    setSelectedContactId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSearchAgenda = () => {
    if (userInput.trim() === "") {
      alert("Por favor, ingresa un nombre de usuario válido.");
      return;
    }
    actions.setUser(userInput.trim());
    setUserInput("");
  };

  return (
    <div className="container-fluid">
      
      <DeleteModal
        showModal={showModal}
        handleCloseModal={closeModal}
        handleDelete={() => {
          actions.deleteContact(selectedContactId);
          closeModal();
        }}
      />

      

     


      

      <div className="container w-50 mb-4">
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          className="form-control"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleSearchAgenda}
        >
          Buscar mi Agenda
        </button>
      </div>

      

      <div className="container text-end w-75">
        {store.user && (
          <Link to="/addNewContact" className="btn btn-success me-1 mb-2" id="addContact">
            Nuevo Contacto 
            <i class="fa-solid fa-user-plus ms-2"></i>
          </Link>
        )}
      </div>

     
     

     
     

      <div className="container contact-list w-75 text-end">
        {store.contacts.length > 0 ? (
          store.contacts.map((contact, index) => (
            <ContactCard
              key={index}
              onEdit={handleEdit}
              onDelete={openModal}
              contactId={contact.id}
              contactName={contact.name}
              contactPhone={contact.phone}
              contactAddress={contact.address}
              contactMail={contact.email}
            />
          ))
        ) : (
          <div className="alert alert-warning text-center" role="alert">
            {store.user
              ? "No tienes ningún contacto guardado."
              : "Debes ingresar un usuario para ver la agenda o crear una nueva."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
