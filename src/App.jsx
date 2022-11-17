import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DailyRate } from './components/DailyRate';
import { LoginForm } from './components/LoginForm';
import { Products } from './components/Products';
import { RegisterForm } from './components/RegisterForm';
import { userDailyRateOperation, userOperation } from './redux/user/operations';

export default function App() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(() => {
        dispatch(userOperation());
    }, [dispatch]);

    const handleSubmit = (data) => {
        dispatch(userDailyRateOperation(data));
    };

    return (
        <div className="App">
            <RegisterForm />
            <LoginForm />
            {/* Home page */}
            {!accessToken && <DailyRate onSubmit={console.log} />}

            {accessToken && (
                <>
                    <p>User loged in</p>
                    <Products />

                    {/* Calculator */}
                    <DailyRate onSubmit={handleSubmit} />
                </>
            )}
        </div>
    );
}
