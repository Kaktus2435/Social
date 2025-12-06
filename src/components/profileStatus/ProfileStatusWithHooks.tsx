import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./ProfileStatusWithHooks.module.css"
import CustomButton from "../common/buttons/CustomButton.tsx";
import { useTranslation } from "react-i18next";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean

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

    const deleteText = () => {
        setStatus("")
    }
    
    const { t, i18n } = useTranslation('profile');
    

    /* const calculateHeight = () => {
        const lineHeight = 20;  
        const rows = status.split('\n').length;  
        return `${Math.max(rows * lineHeight, 40)}px`;  
      };
 */
    return (
        <div className={styles.container} >
            {!editMode &&
                <span className={styles.status} onDoubleClick={() => props.isOwner && activateEditMode()}> 
                {props.status || t('withoutStatus')}</span>
            }

            
            {props.isOwner && editMode &&
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                            <textarea
                                className={styles.inputModalContent}
                                value={status}
                                onChange={onStatusChange}
                                autoFocus={true}
                                maxLength={300}
                                placeholder="Status..."
                            />
                        <h5 style={{ margin: "2px" }} >{t("textLength")}</h5>
                        <div>
                            <CustomButton className={styles.delete} onClick={deleteText} text={t("delete")} />
                            <CustomButton className={styles.close} onClick={deactivateEditModeAndClose} text={t("close")} />
                            <CustomButton className={styles.save} onClick={deactivateEditModeAndSave} text={t("save")} />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
})


export default ProfileStatusWithHooks;