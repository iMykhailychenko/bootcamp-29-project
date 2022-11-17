import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginOperation } from '../redux/auth/operations';

export const LoginForm = () => {
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginOperation(values));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="text" name="email" placeholder="email" value={values.email} onChange={handleChange} />
            <input type="text" name="password" placeholder="password" value={values.password} onChange={handleChange} />

            <button type="submit">login</button>
        </form>
    );
};
