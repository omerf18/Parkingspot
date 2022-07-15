import './homepage.scss';
import LoginForm from '../../cmps/login-form/login-form';

const Homepage = () => {
    return ( 
        <section className='homepage'>
           <h1 className="title">Parkingspot</h1>
           <LoginForm/>
           <p className='homepage-actions'>Login or <span className='signup-btn'>Signup now!</span></p>
        </section>
     );
}
 
export default Homepage;