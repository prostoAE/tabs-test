import React from 'react';
import {Button} from 'reactstrap';

const TabButton = (props) => {
    const showTab = () => {
        if (props.title !== 'Save') {
            props.selectTab()
        }
    }

    return (
        <Button onClick={showTab} color="primary">{props.title}</Button>
    );
}

export default TabButton;
