import { useDispatch, useSelector } from 'react-redux';
import { logoutOperation } from '../redux/auth/operations';

export const UserCard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);

    const handleLogout = () => {
        dispatch(logoutOperation());
    };

    return (
        <>
            {user && (
                <>
                    <p>{user.email}</p>
                    <p>{user.username}</p>
                </>
            )}

            <button type="buttton" onClick={handleLogout}>
                Log out
            </button>
        </>
    );
};
