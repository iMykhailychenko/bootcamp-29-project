import { useState } from 'react';

export const DailyRate = ({ onSubmit }) => {
    const [values, setValues] = useState({
        weight: '',
        height: '',
        age: '',
        desiredWeight: '',
        bloodType: '',
    });

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
            <input type="number" name="height" placeholder="height" value={values.height} onChange={handleChange} />
            <input type="number" name="age" placeholder="age" value={values.age} onChange={handleChange} />
            <input
                type="number"
                name="desiredWeight"
                placeholder="desiredWeight"
                value={values.desiredWeight}
                onChange={handleChange}
            />
            <input
                type="number"
                name="bloodType"
                placeholder="bloodType"
                value={values.bloodType}
                onChange={handleChange}
            />

            <button type="submit">Submit</button>
        </form>
    );
};
