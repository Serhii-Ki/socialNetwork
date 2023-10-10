import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../../store/actions/actions";
import setContent from '../../utils/setContent';

import useService from '../../../services/requestFunction';

import './users.scss';
import { useMemo } from 'react';

function Users() {
    const dispatch = useDispatch();

    const { getAllUsers, process, setProcess } = useService();

    const usersData = useSelector(state => state.users.usersData);

    useEffect(() => {
        getAllUsers()
            .then(data => {
                dispatch(getUsers(data));
                setProcess('confirmed');
            })
    }, []);

    const renderItems = arr => {
        return arr.map(user => {
            return (
                <div key={user._id} className="box media users-wrapper__box">
                    <figure className="image is-96x96 media-left">
                        <img src={user.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PyKYrBKAWWy6YCbQzWQcwIRqH8wYMPluIZiMpV1w0NYSbocTZz0ICWFkLcXhaMyvCwQ&usqp=CAU'} alt={user.username} />
                    </figure>
                    <div className="media-content">
                        <p className="subtitle">Name: {user.fullName || 'Name not specified'}</p>
                        <p className="subtitle subtitle-nick">User Name: {user.username}</p>
                    </div>
                </div>
            );
        });
    }

    const element = useMemo(() => {
        return setContent(process, () => renderItems(usersData))
    }, [process]);

    return (
        <div className="users-wrapper animate__animated animate__fadeIn">
            {element}
        </div>
    );
}

export default Users;