import { useEffect, useState } from "react";

export default function Login() {
  const [postsState, setPostsState] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  let submitForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    res = await res.json();
    setLoading(false);
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
                    <form className="user" onSubmit={submitForm}>
                      <div className="form-group">
                        <input type="email" className="form-control form-control-user"
                          id="exampleInputEmail" aria-describedby="emailHelp"
                          placeholder="Enter Email Address" />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control form-control-user"
                          id="exampleInputPassword" placeholder="Password" />
                      </div>
                      <button className="btn btn-primary btn-user btn-block" type="submit" disabled={loading ? true : false}>
                        {loading ? "Logging In" : "Login"}
                      </button>
                    </form>
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
