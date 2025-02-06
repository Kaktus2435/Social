import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./ProfileStatus.module.css"

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = React.memo(props => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status);

    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditModeAndClose = () => {
        setEditMode(false);
    };
    const deactivateEditModeAndSave = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    
    return (
        <div className={styles.container} >
            {!editMode &&
                <span className={styles.status} onDoubleClick={activateEditMode}> {props.status || "This could be your status"}</span>
            }
            {editMode &&

                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div>
                            <input autoFocus={true}
                                onChange={onStatusChange}
                                value={status} 
                                maxLength={20}
                                />
                            <h6 style={{margin: "2px"}} >Text length 20 symbols.</h6> 
                        </div>
                        <button className={styles.close} onClick={deactivateEditModeAndClose}>
                            Închide
                        </button>
                        <button className={styles.save} onClick={deactivateEditModeAndSave}>
                            Salvează
                        </button>
                    </div>
                </div>
            }
        </div>
    );
})


export default ProfileStatusWithHooks;