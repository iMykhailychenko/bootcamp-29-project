import { useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsSelect } from './ProductsSelect';
import { addProductOperation, changeDayOperation } from '../redux/day/operations';

const today = dayjs().format('YYYY-MM-DD');

export const DayForm = () => {
    const dispatch = useDispatch();
    const day = useSelector((state) => state.day);
    const dailyRate = useSelector((state) => state.user.userData.dailyRate);

    const [productId, setProductId] = useState(null);

    const [weight, setWeight] = useState(null);
    const handleWeight = (event) => setWeight(event.target.value);

    const handleChangeDay = (event) => {
        dispatch(changeDayOperation(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addProductOperation({ productId, weight }));
    };

    return dailyRate ? (
        <>
            <form action="" onSubmit={handleSubmit}>
                <input type="date" name="date" max={today} value={day.date ?? ''} onChange={handleChangeDay} />
                <br />

                <ProductsSelect onSelect={setProductId} />
                <br />

                <input type="number" placeholder="Grams" value={weight ?? ''} onChange={handleWeight} />
                <br />
                <button>+</button>
            </form>
        </>
    ) : (
        <p>Please, count your daily rate first!</p>
    );
};
