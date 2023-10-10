import { Link } from 'react-router-dom';

import img from '../../resources/first.png'

import './firstPage.scss';

function FirstPage() {
    return (
        <section className="first">
            <div className="first__main">
                <img className="first__main-img" src={img} alt="people" />
                <h2 className="first__main-title">Welcome</h2>
                <p className="first__main-descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates porro reprehenderit iusto suscipit aperiam.</p>
                <Link className="link" to="/signin">Login</Link>
                <Link className="link link-singup" to="/signup">Create an Account</Link>
            </div>
        </section>
    );
}

export default FirstPage;