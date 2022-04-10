import './App.css';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase.init';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const auth = getAuth(app);


function App() {

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered,setRegistered] = useState('false');

  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError('Password should contain at least one special charecter');
      return;
    }

    setValidated(true);
    setError('');

    if(registered){
      signInWithEmailAndPassword(auth,email,password)
      .then(result =>{
        const user = result.user;
        console.log(user);
      })
      .catch(error=>{
        setError(error.message);
      })
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      })
    }
    
    e.preventDefault();
  }

  const handleRegisteredChange = (e) =>{
    setRegistered(e.target.checked);
  }
  
  return (
    <div>
      {/* <form onSubmit={handleFormSubmit}>
        <input onBlur={handleEmailBlur} type="email" name="" id="" />
        <br />
        <input onBlur={handlePasswordBlur} type="password" name="" id="" />
        <br />
        <input type="submit" value="Login" />
      </form> */}
      <div className="registration w-50 mx-auto mt-4">
        <h2 className='text-primary mb-4'>Please {registered? 'Login': 'Register'}!!</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <p className='text-danger'>{error}</p>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Register?" />
          </Form.Group>
          <Button variant="primary" type="submit">
            {registered? 'Login': 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
