import React, { useEffect, useState } from "react";



const ProfileStatusWithHooks = React.memo(props => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status)
    useEffect( () => {
        setStatus(props.status);

    },[props.status] );

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
            setEditMode(false);
            props.updateStatus(status);
        };
    
    const onStatusChange = (e) => {
            setStatus(e.currentTarget.value);
        }
        console.log("asd")
    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status</b>:
                    <span onDoubleClick={activateEditMode}> {props.status || "-----"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onBlur={deactivateEditMode} 
                    onChange={onStatusChange}
                    value={status} />
                </div>
            }
        </div>
    );
})


export default ProfileStatusWithHooks;