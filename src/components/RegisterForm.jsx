import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { publicApi } from '../http/http';
import { loginOperation } from '../redux/auth/operations';

export const RegisterForm = () => {
    const dispatch = useDispatch();

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
            .then(() => dispatch(loginOperation({ email: values.email, password: values.password })))
            .catch((error) => alert('error'));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="text" name="email" placeholder="email" value={values.email} onChange={handleChange} />
            <br />
            <input type="text" name="username" placeholder="username" value={values.username} onChange={handleChange} />
            <br />
            <input type="text" name="password" placeholder="password" value={values.password} onChange={handleChange} />
            <br />
            <button type="submit">register</button>
        </form>
    );
};
