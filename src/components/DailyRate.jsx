import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const DailyRate = ({ onSubmit }) => {
    const userData = useSelector((state) => state.user.userData);
    const [values, setValues] = useState(userData);

    useEffect(() => {
        setValues(userData);
    }, [userData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name="weight" placeholder="weight" value={values.weight} onChange={handleChange} />
            <br />
            <input type="number" name="height" placeholder="height" value={values.height} onChange={handleChange} />
            <br />
            <input type="number" name="age" placeholder="age" value={values.age} onChange={handleChange} />
            <br />
            <input
                type="number"
                name="desiredWeight"
                placeholder="desiredWeight"
                value={values.desiredWeight}
                onChange={handleChange}
            />
            <br />
            <input
                type="number"
                name="bloodType"
                placeholder="bloodType"
                value={values.bloodType}
                onChange={handleChange}
            />
            <br />

            <button type="submit">Submit</button>
        </form>
    );
};
