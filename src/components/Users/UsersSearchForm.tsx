import React from "react";
import { Field, Form, Formik } from "formik";
import { FilterType } from "../redux/usersPageReducer";

const UsersSearchFormValidate = () => {

  const errors = {};
  return errors;
};
export const UsersSearchForm: React.FC<PropsType> = (props) => {
  return <div>
    <Formik
      initialValues={{ term: '' }}
      validate={UsersSearchFormValidate}

      onSubmit={(values: FilterType, { setSubmitting }) => {
        props.onFilterChanged(values)
        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          <button type="submit" disabled={isSubmitting}>
            Find
          </button>
        </Form>
      )}
    </Formik>
  </div>;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}