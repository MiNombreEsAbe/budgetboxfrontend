import Header from '../components/default/Header';
import LoginForm from '../components/loginPage/LogInForm';

export default function LoginPage () {
    return (
        <div className='loginPage'>
            <Header />
            <div className='loginPageContent'>
                <div className='loginText'>
                    <p className='largeText'>Login and manage your Budget</p>
                    <p className='smallText'>Note down your expenditure and income, then check your balances everyday</p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}
