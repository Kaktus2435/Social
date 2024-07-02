import React from "react";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/users-selectors.ts";

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
    friend: 'true' | 'false' | 'null'
}

export const SearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)

    const submit = (values: FormType,  {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return <div>
        <Formik
        enableReinitialize /* face ca initialValues care este montat aceasta expresie de fapt se scrie astfel enableReinitialize={true} insa felul in care am scris-o eu si asa inseamna ca e true*/
        
            initialValues={{ term: filter.term, friend: filter.friend as FriendFormType }}
            validate={searchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only Follow</option>
                        <option value="false">Only Unfollow</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting} >
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})
