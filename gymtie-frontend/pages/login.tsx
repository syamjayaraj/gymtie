import { useEffect, useState } from "react";
import { Formik } from 'formik';

export default function Login() {
  const [postsState, setPostsState] = useState([]);

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
    setSubmitting(false);
    console.log(res, "res")
  };


  return (
    <div className="container login">

      <div className="row justify-content-center">

        <div className="col-xl-10 col-lg-12 col-md-9">

          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">

              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">LOGIN</h1>
                    </div>


                    <Formik
                      initialValues={{ email: '', password: '' }}
                      validate={values => {
                        const errors = {
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
                        if (!values.password) {
                          errors.password = 'Required';
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
                        /* and other goodies */
                      }) => (


                        <form
                          className="user"
                          onSubmit={handleSubmit}
                        >
                          <div className="form-group">

                            <input
                              className="form-control form-control-user"
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

                            <input
                              className="form-control form-control-user"
                              type="password"
                              name="password"
                              placeholder="Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            {errors.password && touched.password && errors.password}
                          </div>
                          <div className="form-group">

                            <button
                              className="btn btn-primary btn-user btn-block"
                              type="submit"
                              disabled={isSubmitting}>
                              Submit
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
