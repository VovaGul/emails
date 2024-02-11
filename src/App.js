import React, { useState } from 'react';
import './App.css';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';

const EmailList = ({ emails, onRemoveEmail }) => {
  return (
    emails.map((email, index) => (
      <Row className="border rounded p-3" key={index} style={{ marginBottom: '5px' }}>
        <Col>
          {email}
        </Col>
        <Col md="auto">
        <Button onClick={() => onRemoveEmail(index)}>Удалить</Button>
        </Col>
      </Row>
    ))
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
      setEmailList(new Set([...emailList, email]));
      setEmail('');
    }
  };

  const handleRemoveEmail = (index) => {
    const newEmailList = Array.from(emailList);
    newEmailList.splice(index, 1);
    setEmailList(new Set(newEmailList));
  };

  return (
    <Container className="mx-auto mt-4" style={{ maxWidth: '600px' }}>
       <Row>
        <Col style={{ height: '100px' }}>
        <>
          <Form.Control
            type="email"
            id="emailInput"
            placeholder="Введите Email"
            value={email}
            onChange={handleInputChange}
            style={{ borderColor: (isValidEmail && !isDuplicateEmail) ? '' : 'red' }}
          />
          <Form.Text muted>
            {!isValidEmail && <p style={{ color: 'red' }}>Пожалуйста, введите Email адрес</p>}
            {isDuplicateEmail && <p style={{ color: 'red' }}>Такой Email уже существует</p>}
          </Form.Text>
        </>
        </Col>
        <Col md="auto">
          <Button class="btn" onClick={handleAddEmail}>Добавить</Button>
        </Col>
       </Row>
       <Row>
        <h3>Список</h3>
       </Row>
      <EmailList emails={Array.from(emailList)} onRemoveEmail={handleRemoveEmail} />
    </Container>
  );
};

export default App;
