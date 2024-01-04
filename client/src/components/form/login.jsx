import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { trySignIn } from "../../state/authSlice";

let initialState = { email: "", password: "" };
let errorState = "nope";
let isFirst = true;
const Login = (props) => {
  const navigate = useNavigate();
  const [firstRound, setRound] = useState(isFirst);

  const dispatch = useDispatch();
  const stateError = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(errorState);
  const [errorNum, setErrorNum] = useState(0);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    setError("nope");
    console.log("clicked:", error);
    e.preventDefault();
    setErrorNum(0);
    if (!form.password || !form.email) {
      if (!form.password) {
        setError("Required");
        setErrorNum(errorNum + 1);
      }
      if (!form.email) {
        setError("Required");
        setErrorNum(errorNum + 2);
      }
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(form.email)) {
      setError("Not a valid email");
      setErrorNum(errorNum + 2);
    } else {
      dispatch(trySignIn(form));
    }
  };
  useEffect(() => {
    if (!firstRound) {
      setError(stateError);

      if (stateError == "nope") {
        setErrorNum(0);
        navigate("/");
        window.location.reload(false);
      }
    }
    setRound(false);
  }, [loading]);
  return (
    <div className="flex flex-col max-w-md p-3 rounded-md sm:p-10 sm:w-full  ">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign in</h1>
        <p className="text-sm dark:text-gray-400">
          Sign in to access your account
        </p>
      </div>
      <form action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm">Email address</label>
              <a
                rel="noopener noreferrer"
                href="#"
                className={`text-xs hover:underline ${
                  errorNum == 2 || errorNum == 3
                    ? "text-error"
                    : error.charAt(0) == "U"
                    ? "text-error"
                    : "hidden"
                } `}
              >
                {" "}
                {error.charAt(0) == "n" ? "" : error}
              </a>
            </div>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              id="email"
              placeholder="example@info.com"
              className="w-full px-3 py-2 border rounded-md  bg-neutral input-primary"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm">Password</label>
              <a
                rel="noopener noreferrer"
                href="#"
                className={`text-xs hover:underline ${
                  errorNum == 1 || errorNum == 3 || error.charAt(0) == "W"
                    ? "text-error"
                    : "hidden"
                } `}
              >
                {" "}
                {error.charAt(0) == "n" ? "" : error}
              </a>
            </div>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full px-3 py-2 border rounded-md  bg-neutral input-primary"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="button"
              className={`btn w-full px-8 py-3 font-semibold rounded-md btn-primary ${
                loading ? "loading" : ""
              }`}
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-400">
            Dont have an account yet?
            <a
              rel="noopener noreferrer"
              onClick={()=>props.onclickFunction(false)}
              className="hover:underline cursor-pointer dark:text-violet-400"
            >
              Sign up
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
