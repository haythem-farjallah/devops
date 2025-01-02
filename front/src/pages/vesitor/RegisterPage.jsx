import { Link, Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import {
  loginValidation,
  registerValidation,
} from "../../utils/validation/authValidation";
import { Formik, Form } from "formik";
import InputField from "../../components/common/forms/InputField";
import Breadcrumb from "../../components/common/all/Breadcrumb";
import Buttons from "../../components/common/buttons/Buttons";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../hooks/apiHooks/useAuth";
import InputFieldV from "../../components/common/forms/InputFieldV";
import img from "../../assets/logo2.png";
import { useState } from "react";
import SelectField from "../../components/common/forms/SelectField";
import SelectFieldV from "../../components/common/forms/SelectFieldV";
import { addApi } from "../../api/apiFactory";
import toast from "react-hot-toast";
function RegisterPage(props) {
  const { user } = useUser();
  //const { authCall } = useAuth("/auth/login");
  const [step, setStep] = useState(1);
  const initialValues = {
    password: "",
    passwordConfirm: "",
    username: "",
    phone: "",
    email: "",
    address: "",
    codeP: "",
    university: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    //  await authCall(values);
    const { passwordConfirm, ...data } = values;

    addApi("/auth/register-student", data, {
      token: false,
      formData: false,
    })
      .then(() => {
        toast.success("Successfully created!");
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data?.error?.code === 11000) {
          toast.error(type + " exist");
        } else toast.error(err.response.data?.message);
      });

    setSubmitting(false);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidation}
      onSubmit={handleSubmit}>
      {() => (
        <div className="xl:w-1/5 lg:w-2/5 md:w-3/5 w-full mt-[8%] ">
          <div className="flex justify-center mb-4">
            <img className="w-1/2 " src={img} alt="" />
          </div>
          <Form className=" w-full bg-white p-4 shadow-xl rounded-md">
            {step == 1 ? (
              <div className="flex flex-col space-y-7">
                <p className="text-red-400 capitalize text-center font-semibold">
                  step 1{" "}
                </p>
                <InputFieldV
                  id="username"
                  name="username"
                  type="text"
                  label="username"
                  placeholder="username"
                />
                <InputFieldV
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                />
                <InputFieldV
                  id="phone"
                  name="phone"
                  type="text"
                  label="phone"
                  placeholder="phone"
                />

                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="w-full  py-3  text-white bg-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins ">
                  next
                </button>
              </div>
            ) : step == 2 ? (
              <div className="flex flex-col space-y-7">
                <p className="text-red-400 capitalize text-center font-semibold">
                  step 2{" "}
                </p>
                <InputFieldV
                  id="address"
                  name="address"
                  type="text"
                  label="address"
                  placeholder="address"
                />
                <InputFieldV
                  id="codeP"
                  name="codeP"
                  type="text"
                  label="codeP"
                  placeholder="codeP"
                />
                <SelectFieldV
                  id="university"
                  name="university"
                  isMulti={false}
                  label="university"
                  placeholder="university"
                  options={[
                    { value: "ISAMM", label: "ISAMM" },
                    { value: "ISCAE", label: "ISCAE" },
                  ]}
                />

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(step - 1)}
                    type="button"
                    className="w-full  py-3  text-red-400 border border-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins ">
                    prev
                  </button>
                  <div
                    onClick={() => setStep(step + 1)}
                    type="button"
                    className="w-full text-center  py-3  text-white bg-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins ">
                    next
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-7">
                <p className="text-red-400 capitalize text-center font-semibold">
                  step 3{" "}
                </p>
                <InputFieldV
                  id="password"
                  name="password"
                  type="password"
                  label="password"
                  placeholder="password"
                />
                <InputFieldV
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  label="passwordConfirm"
                  placeholder="confirm password"
                />
                <p className="text-gray-600 text-center">
                  {" "}
                  Please note that your account will only be activated after
                  administrative approval.
                </p>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="w-full  py-3  text-red-400 border border-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins ">
                    prev
                  </button>
                  <button
                    type="submit"
                    className="w-full  py-3  text-white bg-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins ">
                    save
                  </button>
                </div>
              </div>
            )}

            <p className={`text-center capitalize  text-sm mt-5 `}>
              Have a compte ?
              <Link className={`font-bold  text-red-400`} to="/login">
                {" "}
                sign in
              </Link>
            </p>
            {/* <div className="border-t border-gray-200 mt-6">
              <p className="text-center text-gray-400 py-4">OR </p>
              <div className="flex items-center space-x-3 justify-center border border-gray-300 rounded-lg w-full py-3 cursor-pointer hover:bg-gray-100">
                <FcGoogle className="w-6 h-6" />
                <span className="poppins">Sign In With Google</span>
              </div>
            </div> */}
          </Form>{" "}
        </div>
      )}
    </Formik>
  );
}

export default RegisterPage;
