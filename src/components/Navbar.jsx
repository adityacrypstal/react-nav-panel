import React from 'react';
import NavItem from "./NavItem";

const Navbar = React.forwardRef(({active, Scroll, remove, tabs, setActive, addTab}, ref) => {
    const {parent, lastItem} = ref;
    return (
        <div className="tab-header">
            {active !== 1 && <button className={'btn'} onClick={() => Scroll(-1)}> {'<'} </button>}

            <div className={'navbar'} ref={parent}>
                <ul className={'navs'}>
                    {tabs.map((x) => <NavItem data={x} active={active} ref={lastItem} remove={remove}
                                              setActive={setActive} maxLength={tabs.length}/>)}
                </ul>
            </div>
            {(tabs.length !== active) &&
            <button className={'btn'} onClick={() => Scroll(1)}> {'>'} </button>}
            {tabs.length <= 10 && <button className={'btn'} onClick={addTab}> {'+'} </button>}
        </div>
    );
});

export default Navbar;
