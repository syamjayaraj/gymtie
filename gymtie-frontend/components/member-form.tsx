import { useEffect, useState } from "react";
import { Formik } from 'formik';
import DatePicker from 'react-date-picker';

export default function MemberForm({
    showModal,
    setShowModal,
    handleAddMember,
    handleEditMember,
    initialValuesProps
}) {
    const [initialValues, setInitialValues] = useState(
        {
            name: "",
            email: '',
            phoneNumber: '',
            phoneNumber2: '',
            address: "",
            city: "Kozhikode",
            state: "Kerala",
            country: "India",
            about: "",
            age: "",
            pincode: "",
        }
    )
    const [joiningDate, setJoiningDate] = useState(new Date())
    const handleChangeJoiningDate = (date) => {
        setJoiningDate(date)
    }

    useEffect(() => {
        if (initialValuesProps?._id) {
            setInitialValues(initialValuesProps)
        }
    }, [initialValuesProps])
    console.log(initialValues, "init")


    return (
        <div className="modal" role="dialog" style={{
            display: showModal ? "block" : "none"
        }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Member</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            validate={values => {
                                const errors: any = {
                                    // email: "",
                                    // password: ""
                                };
                                if (!values.name) {
                                    errors.name = 'Required';
                                }
                                else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}

                            onSubmit={(values, { setSubmitting }) => {
                                if (initialValuesProps?._id) {
                                    handleEditMember({
                                        ...values,
                                        joiningDate: joiningDate
                                    }, setSubmitting);
                                } else {
                                    handleAddMember({ ...values, joiningDate: joiningDate }, setSubmitting);
                                }
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
                                        <p className="validation-error-message">
                                            {errors.name && touched.name && errors.name}
                                        </p>
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
                                        <p className="validation-error-message">
                                            {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                                        </p>

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
                                        <p className="validation-error-message">
                                            {errors.phoneNumber2 && touched.phoneNumber2 && errors.phoneNumber2}
                                        </p>

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
                                        <p className="validation-error-message">
                                            {errors.email && touched.email && errors.email}
                                        </p>

                                    </div>

                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="age"
                                            placeholder="Age"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.age}
                                        />
                                        <p className="validation-error-message">
                                            {errors.age && touched.age && errors.age}
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <textarea
                                            rows={3}
                                            className="form-control"
                                            name="address"
                                            placeholder="Address"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.address}
                                        />
                                        <p className="validation-error-message">
                                            {errors.address && touched.address && errors.address}
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            defaultValue="Kozhikode"
                                            // value="Kozhikode"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.city}
                                        />
                                        <p className="validation-error-message">
                                            {errors.city && touched.city && errors.city}
                                        </p>

                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="state"
                                            defaultValue="Kerala"
                                            // value="Kerala"
                                            placeholder="State"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.state}
                                        />
                                        <p className="validation-error-message">
                                            {errors.state && touched.state && errors.state}
                                        </p>

                                    </div>

                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="country"
                                            defaultValue="India"
                                            // value="India"
                                            placeholder="Country"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.country}
                                        />
                                        <p className="validation-error-message">
                                            {errors.country && touched.country && errors.country}
                                        </p>

                                    </div>

                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="pincode"
                                            placeholder="PIN Code"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.pincode}
                                        />
                                        <p className="validation-error-message">
                                            {errors.pincode && touched.pincode && errors.pincode}
                                        </p>

                                    </div>

                                    <div className="form-group">
                                        <label>Joining Date</label>
                                        <DatePicker
                                            onChange={handleChangeJoiningDate}
                                            value={joiningDate}
                                            calendarIcon={false}
                                            clearIcon={false}
                                            className="form-control"
                                            format="dd/MM/yyyy"
                                            maxDate={new Date()}
                                        />
                                        {/* <p className="validation-error-message">
                                            {errors.joiningDate && touched.joiningDate && errors.joiningDate}
                                        </p> */}
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            rows={3}
                                            className="form-control"
                                            name="about"
                                            placeholder="About"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.about}
                                        />
                                        <p className="validation-error-message">
                                            {errors.about && touched.about && errors.about}
                                        </p>
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
