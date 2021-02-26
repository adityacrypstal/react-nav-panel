import React from 'react';

const Close = ({value, remove}) => <a onClick={(e) => remove(e, value)} className={'close'}>X</a>;

const NavItem = React.forwardRef(({active, data, remove, setActive, maxLength}, myref) => {
        const {value, closable} = data;
        return (
            <li className={active === value ? 'active' : ''}
                ref={value === 1 ? myref : null}
                onClick={() => setActive(value)}>Tab {value} {closable &&
            <Close value={value} remove={remove}/>}</li>
        )
    }
);

export default NavItem;
