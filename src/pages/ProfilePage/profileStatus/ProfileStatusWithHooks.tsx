import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./ProfileStatus.module.css"
import CustomButton from "../../../components/buttons/CustomButton.tsx";

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
                            <input 
                                className={styles.inputModalContent}
                                autoFocus={true}
                                onChange={onStatusChange}
                                value={status}
                                maxLength={50}
                            />
                        </div>
                        <h6 style={{ margin: "2px" }} >Text length is maximum 20 symbols.</h6>
                        <div>
                            <CustomButton className={styles.close} onClick={deactivateEditModeAndClose} text={"Close"} />
                            <CustomButton className={styles.save} onClick={deactivateEditModeAndSave} text={"Save"} />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
})


export default ProfileStatusWithHooks;