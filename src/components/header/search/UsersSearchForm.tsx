import React from "react";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/users-selectors.ts";
import CustomButton from "../../common/buttons/CustomButton.tsx";
import { useNavigate } from "react-router-dom";
import styles from "./search.module.css";


type PropsType = {
    onFilterChanged: (filter: FormType) => void

}

const searchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}


type FriendFormType = 'true' | 'false' | 'null'


type FormType = {
    term: string,
    friend: FriendFormType
}

export const SearchForm: React.FC<PropsType> = React.memo((props) => {

    const navigate = useNavigate()
    const filter = useSelector(getUsersFilter)

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
                    <Field style={{ height: "30px", fontSize: "20px"}} type="text" name="term" />
                    <Field style={{ height: "36px", fontSize: "20px"}} name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only Follow</option>
                        <option value="false">Only Unfollow</option>
                    </Field>
                    <CustomButton onClick={handlerNavigation} text="Find" disabled={isSubmitting} />
                </Form>
            )}
        </Formik>
    )
})
