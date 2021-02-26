import React, {useRef, useState} from 'react';
import './Tab.css'
import Popup from './Popup';
import TabContent from "./TabContent";
import Header from "./Header";
import Navbar from "./Navbar";

const behavior = 'smooth';
const defaultTabs = 3;

// Initialize Tabs and Its Content
const init = Array.from({length: defaultTabs}, (v, k) => k).map(a => ({value: a + 1, closable: false}));

// Tab Component
const Tab = () => {
    const [tabs, setTabs] = useState(init);
    const [active, setActive] = useState(1);
    const [deleteId, setDeleteId] = useState(null);
    // ********* Parent Container Ref to control scroll window width *********//
    const parent = useRef(null);

    //****************** Child item Ref to check width of each item *********//
    const lastItem = useRef(null);

    //****************** Scroll Using Ref on  button click ******************//
    const Scroll = (val) => {
        let pad = lastItem.current.clientWidth;
        parent.current.scrollBy({
            left: val > 0 ? pad : -pad,
            behavior
        });
    };

    // ********* Open Popup To Confirm Delete Tabs *********//
    const remove = (e, i) => {
        e.stopPropagation();
        setDeleteId(i);
    };

    // *********Remove Tabs From Existing list *********//
    const deleteItem = (i) => {
        if (active === i) {
            let index = tabs.findIndex(a => a.value === i);
            setActive(tabs[index - 1].value)
        }
        setTabs([...tabs.filter(a => a.value !== i)])
        setDeleteId(null)
    };

    //********* Add New Tabs to Existing list *********//
    const addTab = async () => {
        let pad = lastItem.current.clientWidth;
        await setTabs([...tabs, {value: tabs.length + 1, closable: true}]);
        await setActive(tabs.length + 1);
        await parent.current.scrollBy({left: 900 + pad})
    };
    return (
        <div className={"outer-container"}>
            <div className="demo-container">
                <Header/>
                <div className="demo-body">
                    <div className="tab-wrapper">
                        <Navbar active={active} Scroll={Scroll} remove={remove} tabs={tabs} setActive={setActive}
                                addTab={addTab} ref={{parent, lastItem}}/>
                        <TabContent active={active}/>
                    </div>
                </div>
            </div>
            {deleteId && <Popup deleteItem={deleteItem} cancelDelete={setDeleteId} item={deleteId}/>}
        </div>
    );
};


export default Tab;
