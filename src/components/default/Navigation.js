import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList } from '@fortawesome/free-regular-svg-icons';

export default function Navigation(props) {
    return (
        <div className='sideBar'>
            <Link to='/dashboard' className='logo'>
                <img src={ Logo } alt='Budget Box Logo' />
            </Link>

            <div className='links'>
                <Link to='/dashboard' className={props.active === "dashboard" ? "active" : ""}>
                    <FontAwesomeIcon icon={faChartColumn} /> <span>Dashboard</span>
                </Link>
                <Link to='/transactionlist' className={props.active === "transaction" ? "active" : ""}>
                    <FontAwesomeIcon icon={faRectangleList} /> <span>Transaction List</span>
                </Link>
                <Link to='/myaccount' className={props.active === "account" ? "active" : ""}>
                    <FontAwesomeIcon icon={faCircleUser} /> <span>My Account</span>
                </Link>
            </div>
        </div>
    );
}