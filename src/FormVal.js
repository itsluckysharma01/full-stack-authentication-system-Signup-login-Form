import React, { useState } from 'react'
import './Form.css';

const Form = () => {

    // Form Validation using React Hook useState
    
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [age,setAge] = useState('');
  const [gender,setGender] = useState('');
  const [errors,setErrors] = useState('');
  const [success, setSuccess] = useState('');

  const validateForm= () =>{
    const errors = {};

    if (!name){
      errors.name = "Name Is Required";
    }
    if (!email){
      errors.email = "Email Is Required";
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      errors.email = "Email Is Invalid";
      }

    if (!password){
      errors.password = "Password Is Required";
    }else if (password.length < 6){
      errors.password = "Password Must Be At Least 6 Characters";
    }

    if (!confirmPassword){
      errors.confirmPassword = "Confirm Password Is Required";
    }else if (confirmPassword !== password){
      errors.confirmPassword = "Passwords Do Not Match";
    }

    if (!age){
      errors.age = "Age Is Required";
    }else if (age < 0){
      errors.age = "Age Must Be Positive";
    }else if(isNaN(age)){
      errors.age = "Age Must Be A Number";
    }

    if (!gender){
      errors.gender = "Gender Is Required";
    }

    console.log(errors)
    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
      setSuccess('Form successfully submitted!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAge('');
      setGender('');
    }
  }

  return (
    <div className='container'>
      <h1>Form Validation</h1>
      {success && <div className="success-message" style={{ color: 'green', marginBottom: '1em' }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" name="confirm-password"  value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age"  value={age} onChange={(e) => setAge(e.target.value)} />
          {errors.age && <div className="error-message">{errors.age}</div>}
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender"  value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <div className="error-message">{errors.gender}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form
