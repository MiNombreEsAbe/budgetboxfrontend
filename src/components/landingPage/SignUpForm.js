import { useState } from "react";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { signUpErrorAction } from "../../redux/users/actions";
import { signUp } from "../../redux/users/operations";
import { getUser } from "../../redux/users/selectors";

export default function SignUpForm() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
	const selector = useSelector((state) => state);
    const user = getUser(selector);
	const errors = getUser(selector).errors;

    if (user.id) navigate('/dashboard');

    const initialValues = {
        name: "",
		email: "",
		password: "",
		password_confirmation: "",
	};

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
        if (values.password !== values.password_confirmation) {
            dispatch(signUpErrorAction({ password: ["Passwords do not match."] }));
			return;
        }

        setIsLoading(true);
		await dispatch(signUp(values));
		setIsLoading(false);
		navigate("/myaccount");
    }

    return (
        <div className="signUpForm">
            <div className="nameInputHolder">
                <label htmlFor="nameInput">Name</label>
                <input 
                    id="nameInput" 
                    type="text" 
                    name="name" 
                    value={values.name} 
                    onChange={handleInput}
                    placeholder="Jane Doe"
                />
            </div>
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
                <input 
                    id="repasswordInput" 
                    type="password" 
                    name="password_confirmation" 
                    value={values.password_confirmation} 
                    onChange={handleInput}
                    placeholder="Re-enter Password"
                />
            </div>
            {errors.password ? <span className="error-text">{errors.password[0]}</span> : null}
			<button className="mt-2 custom-btn" type="button" onClick={handleSubmit}>
				{isLoading ? "Registering..." : "Sign Up"}
			</button>
        </div>
    );
}