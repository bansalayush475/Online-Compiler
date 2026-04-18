import React from 'react';
import { Code2 } from 'lucide-react';

const Login = ({ onLogin }) => {
  return (
    <div className="login-page">
      <div className="login-card glass">
        <Code2 className="login-icon" />
        <h1>Welcome to DevSandbox</h1>
        <p>Your premium online code execution environment. Write, run, and save code effortlessly in your browser.</p>
        
        <button className="google-btn" onClick={onLogin}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
