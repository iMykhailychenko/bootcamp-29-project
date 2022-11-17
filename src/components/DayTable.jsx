import { useDispatch, useSelector } from 'react-redux';
import { Status } from '../config/status';
import { deleteProductOperation } from '../redux/day/operations';

export const DayTable = () => {
    const dispatch = useDispatch();

    const day = useSelector((state) => state.day);
    const isLoading = day.status === Status.init || day.status === Status.loading;

    const handleDelete = (id) => {
        dispatch(deleteProductOperation(id));
    };

    return isLoading ? (
        <p>Loading ....</p>
    ) : day.eatenProducts?.length ? (
        <table>
            <tbody>
                {day.eatenProducts.map((item) => (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.weight} g</td>
                        <td>{item.weight} kcal</td>
                        <td>
                            <button type="button" onClick={() => handleDelete(item.id)}>
                                x
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <p>No data</p>
    );
};
