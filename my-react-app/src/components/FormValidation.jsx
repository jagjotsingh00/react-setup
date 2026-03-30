import { useState } from "react";

// const ReactHookForm = () => {

//     const [formData,setFormdata] =useState({name: '', email: '', age: ''})
//     const [errors,setErrors] = useState({});
//     const [submit,setSubmit] = useState(null);

//     const register = 
// }


function ControlledForm() {
    // State for each input - React controls the value
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        country: '',
        subscribe: false,
        gender: '',
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }


    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is Required'
        if (!formData.name.trim()) {
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';

        return newErrors;
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setSubmitted(formData);
        console.log('Submitted:', formData);
    }

    return (
        <div>
      <h3>✅ Controlled Components</h3>

        <form onSubmit={handleSubmit}>

        <div >
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

           <div>
          <label >Email </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
          />
          {errors.email && <span >{errors.email}</span>}
        </div>
        
         <div>
          <label >Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min 6 characters"
          />
          {errors.password && <span >{errors.password}</span>}
          <small>Current length: {formData.password.length}</small>
        </div>
        
          <div >
          <label>Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select country</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
          </select>
          {errors.country && <span >{errors.country}</span>}
        </div>

         <button type="submit">
          Submit
        </button>

        </form>
        {submitted && (
        <div>
          <h4>✅ Form Submitted!</h4>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
        </div>
    )
}
export default (ControlledForm) 