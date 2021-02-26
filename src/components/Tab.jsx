import React, {useRef, useState} from 'react';
import './Tab.css'

const behavior = 'smooth';
const defaultTabs = 3;

// Initial Tabs
const init = Array.from({length: defaultTabs}, (v, k) => k).map(a => ({value: a + 1, closable: false}));

// Close Buttons
const Close = ({value, remove}) => <a onClick={(e) => remove(e, value)} className={'close'}>X</a>;

// Tab Items
const Item = React.forwardRef(({active, data, remove, setActive, maxLength}, myref) => {
        const {value, closable} = data;
        return (
            <li className={active === value ? 'active' : ''}
                ref={value === maxLength ? myref : null}
                onClick={() => setActive(value)}>Tab {value} {closable &&
            <Close value={value} remove={remove}/>}</li>
        )
    }
);
// Tab Container
const Tab = () => {
    const [tabs, setTabs] = useState(init);
    const [active, setActive] = useState(1);
    //Parent Container Ref
    const parent = useRef(null);
    //Child item Ref
    const lastItem = useRef(null);
    //Scroll Using Ref
    const Scroll = (val) => {
        let pad = lastItem.current.clientWidth;
        parent.current.scrollBy({
            left: val > 0 ? pad : -pad,
            behavior
        });

    };
    //Remove Tabs
    const remove = (e, i) => {
        e.stopPropagation();
        if (active === i) {
            let index = tabs.findIndex(a => a.value === i);
            setActive(tabs[index - 1].value)
        }
        let newArr = tabs.filter(a => a.value !== i);
        setTabs(newArr)
    };

    //Add Tabs
    const addTab = async () => {
        let pad = lastItem.current.clientWidth;
        await setTabs([...tabs, {value: tabs.length + 1, closable: true}]);
        await setActive(tabs.length + 1);
        await parent.current.scrollBy({left: 900 + pad})
    };
    return (
        <div className={"outer-container"}>
            <div className="demo-container">
                {/*Header Start*/}
                <div className="demo-header">
                    <h3>Demo Container</h3>
                </div>
                {/*Header End*/}
                <div className="demo-body">
                    <div className="tab-wrapper">
                        <div className="tab-header">
                            {/*Prev Button*/}
                            {active !== 1 && <button className={'btn'} onClick={() => Scroll(-1)}> {'<'} </button>}
                            <div className={'navbar'} ref={parent}>
                                <ul className={'navs'}>
                                    {tabs.map((x) => <Item data={x} active={active} ref={lastItem} remove={remove}
                                                           setActive={setActive} maxLength={tabs.length}/>)}
                                </ul>
                            </div>
                            {/*Next Button*/}
                            {(tabs.length !== active) &&
                            <button className={'btn'} onClick={() => Scroll(1)}> {'>'} </button>}
                            {/*Add Button*/}
                            <button className={'btn'} onClick={addTab}> {'+'} </button>
                        </div>
                        {/*Content Start*/}
                        <div className="tab-body">
                            <div className="tab tab-1">Tab {active} Content</div>
                        </div>
                        {/*Content End*/}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Tab;
