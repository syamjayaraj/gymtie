import { useEffect, useState } from "react";
import { Formik } from 'formik';
import DatePicker from 'react-date-picker';

export default function PaymentForm({
    showModal,
    setShowModal,
    handleAddPayment,
    initialValuesProps
}) {
    const [initialValues, setInitialValues] = useState(
        {
            name: "",
            fee: 600,
            memberId: '',
            note: ''
        }
    )
    const [paymentDate, setJoiningDate] = useState(new Date())
    const handleChangeJoiningDate = (date) => {
        setJoiningDate(date)
    }

    useEffect(() => {
        if (initialValuesProps?._id) {
            setInitialValues({
                name: initialValuesProps?.name,
                fee: 600,
                memberId: initialValuesProps?.memberId,
                note: ""
            })
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
                        <h5 className="modal-title">Add Payment</h5>
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
                                return errors;
                            }}

                            onSubmit={(values, { setSubmitting }) => {
                                console.log("hai")
                                handleAddPayment({ paymentDate: paymentDate, member: initialValuesProps?._id, fee: 600 }, setSubmitting);
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
                                        <label>Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            disabled
                                        />
                                        <p className="validation-error-message">
                                            {errors.name && touched.name && errors.name}
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <label>Member ID</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="memberId"
                                            placeholder="Member ID"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.memberId}
                                            disabled
                                        />
                                        <p className="validation-error-message">
                                            {errors.memberId && touched.memberId && errors.memberId}
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <label>Fee</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="fee"
                                            placeholder="Fee"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.fee}
                                        />
                                        <p className="validation-error-message">
                                            {errors.fee && touched.fee && errors.fee}
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <label>Payment Date</label>
                                        <DatePicker
                                            onChange={handleChangeJoiningDate}
                                            value={paymentDate}
                                            calendarIcon={false}
                                            clearIcon={false}
                                            className="form-control"
                                            format="dd/MM/yyyy"
                                            maxDate={new Date()}
                                        />
                                        {/* <p className="validation-error-message">
                                            {errors.paymentDate && touched.paymentDate && errors.paymentDate}
                                        </p> */}
                                    </div>

                                    <div className="form-group">
                                        <label>Note</label>
                                        <textarea
                                            rows={3}
                                            className="form-control"
                                            name="note"
                                            placeholder="Note"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.note}
                                        />
                                        <p className="validation-error-message">
                                            {errors.note && touched.note && errors.note}
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
