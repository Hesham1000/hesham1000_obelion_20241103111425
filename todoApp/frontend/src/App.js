import React from 'react';
import './components/RegistrationForm.css';
import './components/LoginForm.css';
import './components/TaskForm.css';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>
      </header>
      <main>
        <RegistrationForm />
        <LoginForm />
        <TaskForm />
      </main>
    </div>
  );
}

export default App;
