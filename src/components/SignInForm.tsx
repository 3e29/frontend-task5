import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignInForm.css'; 

interface SignInFormProps {
  logo: string;
}

const SignInForm: React.FC<SignInFormProps> = ({ logo }) => {
  const navigate = useNavigate();

 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); 
    console.log('Sign In button clicked');

    
      axios.post('https://test1.focal-x.com/api/login', {
        email,
        password,
      })
      .then( res => {
        console.log(res.data) 
        localStorage.setItem("token" , `Bearer ${res.data.token}`)
        localStorage.setItem("username" , res.data.user.user_name)
        localStorage.setItem("personalPic" , res.data.user.profile_image_url)
        navigate('/')
      })
      .catch(error => console.log(error))
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <section id='sign-in'>
      <div className="form-container">
        <div className="form">
          <img src={logo} alt="logo" className="logo" />
          <h2 className="title">SIGN IN</h2>
          <p className="subtitle">Enter your credentials to access your account</p>
          <form onSubmit={handleSignIn}> 
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
              autoFocus
                type="email"
                id="email"
                placeholder="Enter your email"
                className="input custom-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="input custom-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="sign-in-button"> 
              SIGN IN
            </button>
          </form>
          <p className="footer-text">
            Don't have an account?{' '}
            <span onClick={handleSignUpRedirect} className="sign-up-link">
              Create one
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
