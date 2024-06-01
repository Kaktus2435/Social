import React from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FilterType } from "../../redux/usersPageReducer";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void

}

const searchFormValidate = (values: FilterType) => {
    const errors = {};
    return errors;
}

const SearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FilterType, { setSubmitting }: FormikHelpers<FilterType>) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return <div>
        <Formik
            initialValues={{ term: "", friend: null }}
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

export default SearchForm;