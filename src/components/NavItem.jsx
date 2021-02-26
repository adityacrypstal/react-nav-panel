import React from 'react';

const Close = ({value, remove}) => <a onClick={(e) => remove(e, value)} className={'close'}>X</a>;

const NavItem = React.forwardRef(({active, data, remove, setActive, maxLength, index}, myref) => {
        const {value} = data;
        return (
            <li className={active === value ? 'active' : ''}
                ref={index === 0 ? myref : null}
                onClick={() => setActive(value)}>Tab {value}
                {maxLength > 1 && <Close value={value} remove={remove}/>}</li>
        )
    }
);

export default NavItem;
