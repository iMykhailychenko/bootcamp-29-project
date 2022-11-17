import { useState } from 'react';
import { publicApi } from '../http/http';

export const RegisterForm = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        username: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        publicApi
            .post('/auth/register', values)
            .then(() => alert('success'))
            .catch((error) => alert('error'));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="text" name="email" placeholder="email" value={values.email} onChange={handleChange} />
            <input type="text" name="username" placeholder="username" value={values.username} onChange={handleChange} />
            <input type="text" name="password" placeholder="password" value={values.password} onChange={handleChange} />

            <button type="submit">register</button>
        </form>
    );
};
