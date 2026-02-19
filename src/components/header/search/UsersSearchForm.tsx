import React from "react";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/users-selectors.ts";
import CustomButton from "../../common/buttons/CustomButton.tsx";
import { useNavigate } from "react-router-dom";
import styles from "./search.module.css";
import { useTranslation } from "react-i18next";


type PropsType = {
    onFilterChanged: (filter: FormType) => void

}

type FriendFormType = boolean | null;

type FormType = {
    term: string,
    friend: FriendFormType
}

type MyFormValues = {
  term: string;
  friend: boolean | null;
};

const searchFormValidate = (values: MyFormValues) => {
    const errors = {};
    return errors;
}

export const SearchForm: React.FC<PropsType> = React.memo((props) => {
    
    const navigate = useNavigate()
    const filter = useSelector(getUsersFilter)
    
    const { t } = useTranslation('usersSearchForm');

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    const handlerNavigation = () => {
        navigate("/users")
    }

    return (
        <Formik
            enableReinitialize={true}

            initialValues={{ term: filter.term, friend: filter.friend }}
            validate={searchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form className={styles.formSearch}>
                    <Field style={{ height: "30px", width: "150px", fontSize: "20px"}} type="text" name="term" />
                    <Field style={{ height: "36px", width: "100px", fontSize: "20px"}} name="friend" as="select">
                        <option value="null">{t('all')}</option>
                        <option value="true">{t('onlyFollow')}</option>
                        <option value="false">{t('onlyUnfollow')}</option>
                    </Field>
                    <CustomButton onClick={handlerNavigation} text={t('find')} disabled={isSubmitting} />
                </Form>
            )}
        </Formik>
    )
})
