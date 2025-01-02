import React, { useState } from "react";
import Buttons from "../../components/common/buttons/Buttons";
import ImageField from "../../components/common/forms/ImageField";
import InputField from "../../components/common/forms/InputField";
import { Formik, Form } from "formik";
import { useUser } from "../../hooks/useUser";
import { updateApi } from "../../api/apiFactory";
import { toast } from "react-hot-toast";

function UpdateProfileSection(props) {
  const { user, updateUser } = useUser();
  const [restImg, setRestImg] = useState(true);
  let initialValues = {
    name: user?.name,
    phone: user?.phone,
    profileImg: null,
  };

  const handleSubmit = async (values, { resetForm }) => {
    updateApi("/users/updateMe", "", values, {
      token: true,
      formData: true,
    })
      .then((res) => {
        toast.success("Successfully updated!");
        resetForm();
        updateUser(res.data.data);
      })
      .catch((err) => {
        if (err.response?.data?.error?.code === 11000) {
          toast.error("user exist");
        } else toast.error(err.response.data?.message);
      });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <div className="z-50 bg-white ">
          <Form>
            <div className="flex flex-col space-y-5">
              <div className=" md:flex space-x-3 ">
                <InputField
                  id="phone"
                  name="phone"
                  type="text"
                  label="phone"
                  placeholder="Enter your phone"
                />
                <InputField
                  id="name"
                  name="name"
                  type="text"
                  label="name"
                  placeholder="Enter your name"
                />
              </div>
              <ImageField
                setFieldValue={setFieldValue}
                name="profileImg"
                label="profile image"
                setRestImg={setRestImg}
                restImg={restImg}
              />
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Buttons
                onClickFun={() => setRestImg(true)}
                type="reset"
                variant="outlined"
                text="Canncel"
              />
              <Buttons
                onClickFun={() => {}}
                type="submit"
                variant="filled"
                text="Save"
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default UpdateProfileSection;
