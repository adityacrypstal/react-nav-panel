import React from 'react';
import "./Popup.css"

/**
 * @cancelDelete : function - to close popup
 * @item :number - id of tab to be deleted
 * @deleteItem :function - to confirm delete {params:@item:number}
 */

//String Can be Replaced
const deleteString = " Are you sure to delete Tab";

const Popup = ({cancelDelete, deleteItem, item}) => {
    return (
        <div className="popup-container">
            <div className="popup">
                <span className="close-btn " onClick={() => cancelDelete(null)}>x</span>
                {deleteString} {item} ?
                <div className={'popup-actions'}>
                    <button className={"action-btn"} onClick={() => deleteItem(item)}> Confirm</button>
                    <button className={"action-btn"} onClick={() => cancelDelete(null)}> Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
