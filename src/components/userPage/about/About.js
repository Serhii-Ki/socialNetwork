import './about.scss';

function About(props) {
    return (
        <section className='about'>
            <div className="about__age">My age: {props.age}</div>
            <div className="about__bio">About me: {props.bio}</div>
            <div className="about__social">
                <span className="about__social-follow">following: {props.following}</span>
                <span className="about__social-posts">posts_count: {props.postsCount}</span>
            </div>
        </section>
    );
}

export default About;