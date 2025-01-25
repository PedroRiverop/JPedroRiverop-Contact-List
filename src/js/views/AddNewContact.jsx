import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddNewContact = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const { contactId } = useParams();
  

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });



  useEffect(() => {
    console.log("Se ejecutó useEffect");
    console.log("contactId desde useParams:", contactId);
    console.log("store.contacts:", store.contacts);

    if (!store.user) {

      navigate("/"); 

      return;
    }

    if (contactId) {
      
      console.log(`Editando contacto with ID: ${contactId}`);

      const contacto = store.contacts.find((contactoActual) => contactoActual.id == contactId);
      if (contacto) {
        console.log("Contacto encontrado: ", contacto);
        setFormData({
          name: contacto.name || "",
          phone: contacto.phone || "",
          email: contacto.email || "",
          address: contacto.address || "",
        });
      } else {
        console.warn("No se encontró un contacto con ese ID. Redirigiendo...");
        navigate("/");
      }
    };
  }, [contactId, store.user, store.contacts, navigate]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (contactId) {
      actions.editContact(contactId, formData);
    } else {
      actions.addNewContact(formData, store.user);
    }

    actions.getUser(store.user); 
    navigate("/"); 
  }

  return (
    <div className="container-fluid">
  
      <h1 className="text-center">
        {contactId ? "Editar contacto" : "Agregar nuevo contacto"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Nombre completo"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Correo electrónico"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Teléfono"
            onChange={handleChange}
            value={formData.phone}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Dirección"
            onChange={handleChange}
            value={formData.address}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Guardar
        </button>
      </form>
      <Link to="/">Regresar a la lista de contactos</Link>
    </div>
  );
};

export default AddNewContact;