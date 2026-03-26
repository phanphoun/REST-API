import { useState } from 'react';

const initialLoginState = {
  email: '',
  password: '',
};

const initialRegisterState = {
  name: '',
  email: '',
  password: '',
  gender: '',
};

export default function AuthForm({ mode, onSubmit, loading }) {
  const isRegister = mode === 'register';
  const [formData, setFormData] = useState(
    isRegister ? initialRegisterState : initialLoginState
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {isRegister && (
        <div className="form-group">
          <label htmlFor="register-name">Name</label>
          <input
            id="register-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor={`${mode}-email`}>Email</label>
        <input
          id={`${mode}-email`}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor={`${mode}-password`}>Password</label>
        <input
          id={`${mode}-password`}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>

      {isRegister && (
        <div className="form-group">
          <label htmlFor="register-gender">Gender</label>
          <select
            id="register-gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}

      <button type="submit" className="btn-primary auth-submit" disabled={loading}>
        {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
      </button>
    </form>
  );
}
