import React from 'react';

const TabContent = ({active}) => {
    return (
        <div className="tab-body">
            <div className="tab tab-1">Tab {active} Content</div>
        </div>
    );
};

export default TabContent;
