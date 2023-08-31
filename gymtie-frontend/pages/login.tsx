import { useContext, useEffect, useState } from "react";
import { Formik } from 'formik';
import { useRouter } from "next/router";
import AppContext from "../AppContext";
import { submitLoginForm } from "../services/ownerApi";

export default function Login() {
  const router = useRouter()

  if (typeof window !== 'undefined') {
    const userToken = localStorage.getItem('userToken');

    useEffect(() => {
      if (userToken) {
        router?.push("/")
      }
      else {
      }
    }, [userToken]);
  }


  const submitForm = async (values, setSubmitting) => {
    setSubmitting(true);
    const res: any = await submitLoginForm(values)
    if (res?.status === 200) {
      localStorage.setItem("userToken", res?.data?.token)
      localStorage.setItem("userData", JSON.stringify(res?.data));
      router?.push("/")
    } else {

    }
    setSubmitting(false);
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
