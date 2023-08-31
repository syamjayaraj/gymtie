import { useContext, useEffect, useState } from "react";
import { Formik } from 'formik';
import { useRouter } from "next/router";
import AppContext from "../AppContext";
import DatePicker from 'react-date-picker';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MemberForm() {
    const [value, onChange] = useState<Value>(new Date());



    const submitForm = async (values, setSubmitting) => {
        setSubmitting(true);
        let res = await fetch("http://localhost:3026/owners/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                email: values?.email,
                password: values?.password,
            }),
        });
        res = await res.json();
        if (res?.status === 200) {


        }
        setSubmitting(false);
    };


    return (
        <div className="modal" role="dialog" style={{
            display: "block"
        }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Member</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <Formik
                            initialValues={{
                                name: "",
                                email: '',
                                phoneNumber: '',
                                phoneNumber2: ''

                            }}
                            validate={values => {
                                const errors: any = {
                                    // email: "",
                                    // password: ""
                                };
                                if (!values.email) {
                                    errors.email = 'Required';
                                }
                                else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}

                            onSubmit={(values, { setSubmitting }) => {
                                submitForm(values, setSubmitting)
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (


                                <form
                                    className="user"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="form-group">

                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        {errors.name && touched.name && errors.name}
                                    </div>

                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="phoneNumber"
                                            placeholder="Phone Number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phoneNumber}
                                        />
                                        {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                                    </div>

                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="phoneNumber2"
                                            placeholder="Phone Number 2"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phoneNumber2}
                                        />
                                        {errors.phoneNumber2 && touched.phoneNumber2 && errors.phoneNumber2}
                                    </div>

                                    <div className="form-group">

                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email && errors.email}
                                    </div>

                                    <div className="form-group">
                                        <DatePicker onChange={onChange} value={value} />
                                    </div>


                                    <div className="form-group">

                                        <button
                                            className="btn btn-secondary btn-block"
                                            type="submit"
                                            disabled={isSubmitting}>
                                            Save
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}
