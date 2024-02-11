import React, { useState } from 'react';
import './App.css';

const EmailList = ({ emails, onRemoveEmail }) => {
  return (
    <ul>
      {emails.map((email, index) => (
        <li key={index}>
          {email}
          <button onClick={() => onRemoveEmail(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddEmail = () => {
    if (email.trim() !== '') {
      setEmailList([...emailList, email]);
      setEmail('');
    }
  };

  const handleRemoveEmail = (index) => {
    const newEmailList = [...emailList];
    newEmailList.splice(index, 1);
    setEmailList(newEmailList);
  };

  return (
    <div className="app">
      <h1>Email List</h1>
      <div>
        <label htmlFor="emailInput">Add Email:</label>
        <input
          type="email"
          id="emailInput"
          placeholder="Enter email"
          value={email}
          onChange={handleInputChange}
        />
        <button onClick={handleAddEmail}>Add</button>
      </div>
      <EmailList emails={emailList} onRemoveEmail={handleRemoveEmail} />
    </div>
  );
};

export default App;