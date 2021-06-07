import React from "react";

const Persons = ({ NamesToShow, deleteContact }) => (
  <div>
    <h1>Numbers</h1>
    <ul>
      {NamesToShow.map((person) => (
        <li className="note" key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteContact(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  </div>
);

export default Persons;
