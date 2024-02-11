import React, { useState } from 'react';
import './App.css';

function App() {
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
      <ul>
        {emailList.map((emailItem, index) => (
          <li key={index}>
            {emailItem}
            <button onClick={() => handleRemoveEmail(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
