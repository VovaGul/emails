import React, { useState } from 'react';
import './App.css';

const EmailList = ({ emails, onRemoveEmail }) => {
  return (
    <ul>
      {emails.map((email, index) => (
        <li key={index}>
          {email}
          <button onClick={() => onRemoveEmail(index)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState(new Set());
  const [isValidEmail, setValidEmail] = useState(true);
  const [isDuplicateEmail, setDuplicateEmail] = useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
    // Проверка на валидность email при вводе
    const isValid = /\S+@\S+\.\S+/.test(event.target.value);
    setValidEmail(isValid);
    // Проверка на уникальность email при вводе
    const isDuplicate = emailList.has(event.target.value);
    setDuplicateEmail(isDuplicate);
  };

  const handleAddEmail = () => {
    if (isValidEmail && !isDuplicateEmail && email.trim() !== '') {
      // Проверка на уникальность email перед добавлением
      if (!emailList.has(email)) {
        setEmailList(new Set([...emailList, email]));
        setEmail('');
      }
    }
  };

  const handleRemoveEmail = (index) => {
    const newEmailList = Array.from(emailList);
    newEmailList.splice(index, 1);
    setEmailList(new Set(newEmailList));
  };

  return (
    <div className="app">
      <div>
        <input
          type="email"
          id="emailInput"
          placeholder="Введите Email"
          value={email}
          onChange={handleInputChange}
          style={{ borderColor: (isValidEmail && !isDuplicateEmail) ? '' : 'red' }}
        />
        <button onClick={handleAddEmail}>Добавить</button>
        {!isValidEmail && <p style={{ color: 'red' }}>Пожалуйста, введите Email адрес</p>}
        {isDuplicateEmail && <p style={{ color: 'red' }}>Такой Email уже существует</p>}
      </div>
      <h3>Список</h3>
      <EmailList emails={Array.from(emailList)} onRemoveEmail={handleRemoveEmail} />
    </div>
  );
};

export default App;
