import error from '../../resources/error.gif';

function ErrorMessage() {
    return (
        <img src={error} alt="error" style={{ height: '110px', margin: '0 auto' }} />
    );
}

export default ErrorMessage;