import React from "react";

const PersonForm = ({ NewContact, numberHandler, nameHandler, addHandler }) => (
  <form>
    <h2>add a new</h2>
    <div>
      name:
      <input value={NewContact.name} onChange={nameHandler} />
    </div>
    <div>
      number:
      <input value={NewContact.number} onChange={numberHandler} />
    </div>
    <div>
      <button type="submit" onClick={addHandler}>
        add
      </button>
    </div>
  </form>
);

export default PersonForm;
