import { Link, Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { loginValidation } from "../../utils/validation/authValidation";
import { Formik, Form } from "formik";
import InputField from "../../components/common/forms/InputField";
import Breadcrumb from "../../components/common/all/Breadcrumb";
import Buttons from "../../components/common/buttons/Buttons";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../hooks/apiHooks/useAuth";
import InputFieldV from "../../components/common/forms/InputFieldV";
import img from "../../assets/logo2.png";
function LoginPage(props) {
  const { user } = useUser();
  const { authCall } = useAuth("/auth/login");

  const initialValues = {
    password: "",
    email: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await authCall(values);

    setSubmitting(false);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidation}
      onSubmit={handleSubmit}>
      {() => (
        <div className="xl:w-1/5 lg:w-2/5 md:w-3/5 w-full  mt-[8%]">
          <div className="flex justify-center mb-4">
            <img className="w-1/2 " src={img} alt="" />
            {/* <h3 className="text-xl uppercase text-center mb-8 ">Connexion</h3> */}
          </div>
          <Form className=" w-full bg-white p-4 shadow-xl rounded-md">
            <div className="flex flex-col space-y-7">
              <InputFieldV
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="Email"
              />
              <InputFieldV
                id="password"
                name="password"
                type="text"
                label="Password"
                placeholder="Password"
              />

              <button className="w-full py-3  text-white bg-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins ">
                Sign In
              </button>
            </div>

            <p className={`text-center capitalize  text-sm mt-5 `}>
              not a member ?
              <Link className={`font-bold  text-red-400`} to="/register">
                {" "}
                signup
              </Link>
            </p>
            <div className="border-t border-gray-200 mt-6">
              <p className="text-center text-gray-400 py-4">OR </p>
              <div className="flex items-center space-x-3 justify-center border border-gray-300 rounded-lg w-full py-3 cursor-pointer hover:bg-gray-100">
                <FcGoogle className="w-6 h-6" />
                <span className="poppins">Sign In With Google</span>
              </div>
            </div>
          </Form>{" "}
        </div>
      )}
    </Formik>
  );
}

export default LoginPage;
