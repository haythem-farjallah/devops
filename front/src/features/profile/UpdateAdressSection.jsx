import React, { useState } from "react";
import Buttons from "../../components/common/buttons/Buttons";
import ImageField from "../../components/common/forms/ImageField";
import InputField from "../../components/common/forms/InputField";
import { Formik, Form } from "formik";
import { useUser } from "../../hooks/useUser";
import { updateApi } from "../../api/apiFactory";
import { toast } from "react-hot-toast";
import TextAreaField from "../../components/common/forms/TextAreaField";

function UpdateAdressSection(props) {
  const { user, updateUser } = useUser();

  let initialValues = {
    details: user?.addresses[0]?.details,
    alias: user?.addresses[0]?.alias,
    phone: user?.addresses[0]?.phone,
    city: user?.addresses[0]?.city,
    postalCode: user?.addresses[0]?.postalCode,
  };

  const handleSubmit = async (values, { resetForm }) => {
    updateApi(
      "/users/updateAddresMe",
      "",
      { addresses: values },
      {
        token: true,
        formData: false,
      }
    )
      .then((res) => {
        toast.success("Successfully updated!");

        updateUser(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data?.message);
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
                  id="alias"
                  name="alias"
                  type="text"
                  label="alias"
                  placeholder="Enter your alias"
                />
                <InputField
                  id="phone"
                  name="phone"
                  type="text"
                  label="phone"
                  placeholder="Enter your phone"
                />
              </div>
              <div className=" md:flex space-x-3 ">
                <InputField
                  id="city"
                  name="city"
                  type="text"
                  label="city"
                  placeholder="Enter your city"
                />
                <InputField
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  label="postal Code"
                  placeholder="Enter your postal Code"
                />
              </div>
              <TextAreaField
                id="details"
                name="details"
                type="text"
                label="details"
                placeholder="Enter your details"
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

export default UpdateAdressSection;
