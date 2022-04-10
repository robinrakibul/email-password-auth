import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';

function App() {
  const auth = getAuth(app);

  const handleEmailBlur = (e) =>{
      console.log(e.target.value);
  }
  const handlePasswordBlur = (e) =>{
      console.log(e.target.value);
  }
  const handleFormSubmit = (e) =>{
      console.log('Form Submitted');
      e.preventDefault();
  }
  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <input onBlur={handleEmailBlur} type="email" name="" id="" />
        <br />
        <input onBlur={handlePasswordBlur} type="password" name="" id="" />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default App;
