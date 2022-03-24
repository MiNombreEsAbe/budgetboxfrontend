import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/users/selectors";
import { useNavigate } from "react-router";

import Navigation from "../components/default/Navigation";
import Header from "../components/default/Header";
import AddProfilePic from "../assets/images/add-profile.png"
import { updateProfile } from "../redux/users/operations";

export default function AccountPage() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const user = getUser(selector);

    useEffect(() => {
        if (!user.id) navigate('/login');
    }, [])

    const userValues = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: ''
    }

    const [values, setValues] = useState(userValues);
    const [isLoading, setIsLoading] = useState(false);


    const handleInput = e => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        })
    }

    const submitHandler = () => {
        setIsLoading(true);
        dispatch(updateProfile(values, userValues.id));
        navigate('/myaccount');
        setIsLoading(false);
    }

    return (
        <div className="accountPageHolder">
            <Navigation active="account" />
            <div className="accountPage">
                <Header />
                <div className="accountPageContent">
                    <div className="addProfile">
                        <img src={AddProfilePic} alt="Add Profile Picture icon" />    
                        <p>Add Profile Picture</p>
                    </div>
                    <div className="inputHolder">
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
                        </div>
                        {/* <div className="passwordInputHolder">
                            <label htmlFor="passwordInput">Password</label>
                            <input 
                                id="passwordInput" 
                                type="password" 
                                name="password" 
                                value={values.password} 
                                onChange={handleInput}
                                placeholder="password"
                            />
                        </div>   */}
                        <button onClick={submitHandler} type="button">
							{!isLoading ? 'Submit' : 'Updating...'}
						</button>
                    </div>
                </div>
            </div>
        </div>
    );
}