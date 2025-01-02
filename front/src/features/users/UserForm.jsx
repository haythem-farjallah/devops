import React, { useContext, useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import InputField from "../../components/common/forms/InputField";
import ImageField from "../../components/common/forms/ImageField";
import SelectField from "../../components/common/forms/SelectField";
import { addApi } from "../../api/apiFactory";
import Buttons from "../../components/common/buttons/Buttons";
import { useGetData } from "../../hooks/apiHooks/useGetData";

import { ModalContext } from "../../contexts/ModalContext";
import { addUpdateProductValidation } from "../../utils/validation/productValidation";

function UserForm({ refetch }) {
  const [restImg, setRestImg] = useState(true);
  let { handleModal } = useContext(ModalContext);

  let initialValues = {
    name: "",
    email: "",
    password: "",
    role: "user",
    phone: "",
    profileImg: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    addApi("/users/", values, {
      token: true,
      formData: true,
    })
      .then(() => {
        toast.success("Successfully created!");
        resetForm();
        refetch();
        handleModal();
        setRestImg(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data?.error?.code === 11000) {
          toast.error(type + " exist");
        } else toast.error(err.response.data?.message);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={addUpdateProductValidation}
      onSubmit={handleSubmit}
      enableReinitialze:true>
      {({ setFieldValue }) => (
        <div className="  w-full  ">
          <Form>
            <div className="flex flex-col gap-5 w-[40vw] h-[68vh] ">
              <h2 className="pb-3 text-2xl">Create User</h2>{" "}
              <div className="flex flex-col justify-between">
                {" "}
                <ImageField
                  setFieldValue={setFieldValue}
                  name="profileImg"
                  label="profile Img"
                  setRestImg={setRestImg}
                  restImg={restImg}
                />{" "}
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  label="email"
                  placeholder="Enter your email"
                />
                <div className="flex gap-5 pt-2">
                  <div className="flex flex-col  gap-4 w-full">
                    {" "}
                    <InputField
                      id="name"
                      name="name"
                      type="text"
                      label="name"
                      placeholder="Enter your name"
                    />{" "}
                    <InputField
                      id="phone"
                      name="phone"
                      type="number"
                      label="phone"
                      placeholder="Enter your phone"
                    />
                  </div>{" "}
                  <div className="flex flex-col gap-4 w-full">
                    {" "}
                    <InputField
                      id="password"
                      name="password"
                      type="text"
                      label="password"
                      placeholder="Enter your password"
                    />
                    <SelectField
                      id="role"
                      name="role"
                      isMulti={false}
                      label="role"
                      placeholder="role"
                      options={[
                        { value: "user", label: "user" },
                        { value: "admin", label: "admin" },
                        { value: "equipeCom", label: "equipeCom" },
                      ]}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-6">
                  <Buttons
                    onClickFun={() => {
                      setRestImg(true);
                      handleModal();
                    }}
                    type="reset"
                    variant="outlined"
                    text="Annuler"
                  />
                  <Buttons type="submit" variant="filled" text="Enregister" />
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default UserForm;
