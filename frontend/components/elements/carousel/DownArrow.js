import React from 'react';

const DownArrow = props => {
    const { className, onClick, icon } = props;
    return (
        <button
            className={`slick-arrow slick-next ${className}`}
            onClick={onClick}>
            {icon ? (
                <i className={icon}></i>
            ) : (
                <i className="icon-chevron-down"></i>
            )}
        </button>
    );
};

export default DownArrow;
