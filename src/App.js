import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])
  
  const handleAddUser = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const newUser = {
      name: name,
      email:email
    }

    //set data to the server
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        const addedUser = data;
        const newUser = [...users, addedUser];
        setUsers(newUser)
      })
    nameRef.current.value = '';
    emailRef.current.value = '';
    e.preventDefault();
  }


  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} placeholder='name' />
        <input type="email" ref={emailRef} placeholder='email' name="" id="" />
        <input type="submit" value='submit' />
      </form>
      


      <ul>
        {
          users.map(user => <li>{user.id} {user.name} {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
