import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DailyRate } from './components/DailyRate';
import { LoginForm } from './components/LoginForm';
import { DayForm } from './components/DayForm';
import { RegisterForm } from './components/RegisterForm';
import { UserCard } from './components/UserCard';
import { dailyRateOperation, userDailyRateOperation, userOperation } from './redux/user/operations';
import { DayTable } from './components/DayTable';

export default function App() {
    const dispatch = useDispatch();
    const sid = useSelector((state) => state.user.data?.sid);
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(() => {
        dispatch(userOperation());
    }, [dispatch]);

    const handleSubmitNotAuth = (data) => {
        dispatch(dailyRateOperation(data))
            .unwrap()
            .then((data) => {
                // modal window
                alert(JSON.stringify(data, null, 4));
            });
    };

    const handleSubmitAuth = (userData) => {
        dispatch(userDailyRateOperation({ userData, sid }))
            .unwrap()
            .then((data) => {
                // modal window
                alert(JSON.stringify(data, null, 4));
            });
    };

    return (
        <div className="App">
            {!accessToken && (
                <>
                    {/* Home Page */}
                    <h2>Home page</h2>
                    <DailyRate onSubmit={handleSubmitNotAuth} />

                    {/* Auth Page */}
                    <RegisterForm />
                    <LoginForm />
                </>
            )}

            {accessToken && (
                <>
                    <UserCard />

                    {/* Calculator Page */}
                    <h2>Calculator page</h2>
                    <DailyRate onSubmit={handleSubmitAuth} />

                    {/* Diary Page */}
                    <h2>Diary Page</h2>
                    <DayForm />

                    <DayTable />
                </>
            )}
        </div>
    );
}
