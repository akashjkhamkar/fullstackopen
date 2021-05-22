import React, { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import PersonForm from "./components/PersonForm.js";
import Persons from "./components/Persons.js";
import contactService from "./services/Contacts.js";
import Notification from "./components/Notification.js";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    contactService.getAll().then((Response) => {
      setPersons(Response);
    });
  }, []);

  const [searchResult, setNewSearchResult] = useState([]);
  const [errorMessage, seterrorMessage] = useState({
    errorMessage: null,
    color: null
  });
  const [isSearching, setisSearching] = useState(false);
  const [NewContact, setNewContact] = useState({
    newName: " ",
    newNuber: " ",
    id: " "
  });

  // handlers
  const HandleQueryChange = (event) => {
    const query = event.target.value;
    if (query) {
      let result = persons.filter((person) =>
        person.name.toLowerCase().includes(query.toLowerCase())
      );
      setisSearching(true);
      setNewSearchResult(result);
    } else {
      setisSearching(false);
    }
  };

  // controlling input fiels
  const HandleNameChange = (event) => {
    setNewContact({ name: event.target.value, number: NewContact.number });
  };

  const HandleNumberChange = (event) => {
    setNewContact({ name: NewContact.name, number: event.target.value });
  };

  const deleteContact = (id) => {
    const contact = persons.find((person) => person.id === id);
    if (window.confirm(`Delete contact ${contact.name} ?`)) {
      contactService
        .remove(id)
        .then((res) => {
          console.log("deleted res-----", res);
          Notify(`Deleted ${contact.name}`, false);
        })
        .catch((e) => {
          Notify(
            `Information of ${contact.name} has already been removed`,
            true
          );
        });
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  // helper functions
  const Notify = (msg, isError) => {
    const color = isError ? "red" : "green";
    seterrorMessage({ errorMessage: msg, color: color });

    setTimeout(() => {
      seterrorMessage({
        errorMessage: null,
        color: null
      });
    }, 5000);
  };

  const addContact = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === NewContact.name);
    // check if contact exists
    if (!person) {
      contactService.add(NewContact).then((res) => {
        setPersons(persons.concat(res));
        setNewContact({ name: " ", number: " " });
        Notify(`Added ${NewContact.name}`, false);
      });
    } else if (
      // if already added , update the contact
      window.confirm(
        `${NewContact.name} is already added to phonebook, replace the old number with the new one ?`
      )
    ) {
      contactService.update(person.id, NewContact).then((res) => {
        seterrorMessage(`Changed ${NewContact.name}`);
        setPersons(persons.map((p) => (p.id === person.id ? res : p)));
        Notify(`changed ${NewContact.name}`, false);
      });
    }

    setNewContact({ name: " ", number: " " });
  };

  const NamesToShow = isSearching ? searchResult : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={errorMessage.errorMessage}
        color={errorMessage.color}
      />
      <Filter handler={HandleQueryChange} />
      <PersonForm
        NewContact={NewContact}
        nameHandler={HandleNameChange}
        numberHandler={HandleNumberChange}
        addHandler={addContact}
      />
      <Persons deleteContact={deleteContact} NamesToShow={NamesToShow} />
    </div>
  );
};

export default App;
