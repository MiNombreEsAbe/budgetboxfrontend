import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/users/selectors";
import { signIn } from "../../redux/users/operations";

export default function LoginForm() {
    let navigate = useNavigate(); // Used to navigate to other pages
    const dispatch = useDispatch(); // Used for dispatching actions
    const selector = useSelector(state => state);
    const user = getUser(selector);
    const errors = getUser(selector).errors;

    console.log(user)

    if (user.id) navigate('/dashboard');

    const initialValues = {
        email: '',
        password: ''
    }

    const [values, setValues] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = e => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        dispatch(signIn(values));
        setIsLoading(false);
        navigate('/dashboard');
    }

    return (
        <div className='loginForm'>
            {errors.error ? <span className="error-text">{errors.error}</span> : null}
            <div className="emailInputHolder">
                <label htmlFor="emailInput">Email</label>
                <input 
                    id="emailInput" 
                    type="email" 
                    name="email" 
                    value={values.email} 
                    onChange={handleInput}
                    placeholder="email@email.com"
                />
                {errors.email ? <span className="error-text">{errors.email[0]}</span> : null}
            </div>
            <div className="passwordInputHolder">
                <label htmlFor="passwordInput">Password</label>
                <input 
                    id="passwordInput" 
                    type="password" 
                    name="password" 
                    value={values.password} 
                    onChange={handleInput}
                    placeholder="Password"
                />
                {errors.password ? <span className="error-text">{errors.password[0]}</span> : null}
            </div> 
			<button className="mt-2 custom-btn" type="button" onClick={handleSubmit}>
				{isLoading ? "Logging In..." : "Log In"}
			</button>   
        </div>
    );
}