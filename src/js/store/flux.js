const apiFetch = async (url, options = {}) => {
	try {
	  const response = await fetch(url, options);
	  if (!response.ok) {
		throw new Error(
		  `Error: ${response.status}, ${response.statusText}`
		);
	  }
	  if (response.status !== 204) {
		return await response.json();
	  }
	  return null;
	} catch (error) {
	  console.error("API Error:", error);
	  throw error;
	}
  };
  
const getState = ({ getStore, getActions, setStore }) => {
	const BASE_URL = "https://playground.4geeks.com/contact/agendas";

	return {
		store: {
			user: null,
      		contacts: [],
		},
		actions: {
			
			getUser: async (slug) => {

				try {
				  const response = await apiFetch(`${BASE_URL}/${slug}`);
				  setStore({ contacts: response.contacts });
				} catch (error) {
				  if (error.message.includes("404")) {
					console.warn("Agenda no encontrada. Creando una nueva...");
					const userdata = await apiFetch(`${BASE_URL}/${slug}`, { method: "POST" });
					setStore({ user: userdata.slug.toLowerCase(), contacts: [] });
				  } else {
					setStore({ error: error.message });
				  }
				}
			  },
			


			  setUser: (username) => {
				if (!username.trim()) {
				  console.error("No puedes ingresar un usuario en blanco");
				  alert(" Inroduce un nombre valido por favor.");
				  return;
				}

				setStore({ user: username.toLowerCase() });
			  },

			  addNewContact: async (data, slug) => {
				try {
				  await apiFetch(`${BASE_URL}/${slug}/contacts`, {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" },

				  });
				  
				  console.log("Contacto creado con éxito");
				  await getActions().getUser(slug);
				} catch (error) {
				  setStore({ error: error.message });
				}
			  },

			  deleteContact: async (contactId) => {
				try {
				  const store = getStore();
				  await apiFetch(`${BASE_URL}/${store.user}/contacts/${contactId}`, { method: "DELETE" });
				  console.log("Contacto eliminado con éxito");
				  await getActions().getUser(store.user);
				} catch (error) {
				  setStore({ error: error.message });
				}
			  },



			  editContact: async (contactId, payload) => {
				const store = getStore();
				try {
				  await apiFetch(`${BASE_URL}/${store.user}/contacts/${contactId}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				  });
				  console.log("Usuario modificado");
				  await getActions().getUser(store.user);
				} catch (error) {
				  setStore({ error: error.message });
				}
			  },

		}
	};
};

export default getState;
