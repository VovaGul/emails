import React, { useState } from 'react';
import './App.css'; // Создайте файл App.css для стилей

function App() {
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddEmail = () => {
    if (email.trim() !== '') {
      setEmailList([...emailList, email]);
      setEmail(''); // Очистка поля ввода после добавления
    }
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
          <li key={index}>{emailItem}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;