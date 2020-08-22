import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

Clock.propTypes = {};

function formatDate() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${hour}:${minutes}:${seconds}`;
}

function Clock(props) {
    const {} = props;
    const [timeString,setTimeString] = useState('');
    useEffect(() => {
        setInterval(() => {
            const now = new Date();
            const newTimeString = formatDate(now);
            setTimeString(newTimeString);
        },1000);
    },[]);
    return (
        <p style={{fontSize: '20px'}}>{timeString}</p>
    );
}

export default Clock;