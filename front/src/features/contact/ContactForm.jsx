import React from "react";
import { addApi } from "../../api/apiFactory";
import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import InputField from "../../components/common/forms/InputField";
import TextAreaField from "../../components/common/forms/TextAreaField";
import { contactValidation } from "../../utils/validation/contactValidation";

function ContactForm(props) {
  let initialValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    addApi("/contacts/", values, {
      token: false,
      formData: false,
    })
      .then(() => {
        toast.success("Successfully created!");
        resetForm();
      })
      .catch((err) => {
        if (err.response?.data?.error?.code === 11000) {
          toast.error(type + " exist");
        } else toast.error(err.response.data?.message);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactValidation}
      onSubmit={handleSubmit}
      enableReinitialze:true>
      {({}) => (
        <div className="bg-white p-30">
          <Form>
            <div className="flex flex-col space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                  type="text"
                  label="phone"
                  placeholder="Enter your phone"
                />{" "}
              </div>
              <InputField
                id="email"
                name="email"
                type="text"
                label="email"
                placeholder="Enter your email"
              />{" "}
              <InputField
                id="subject"
                name="subject"
                type="text"
                label="subject"
                placeholder="Enter your subject"
              />
              <TextAreaField
                id="message"
                name="message"
                type="text"
                label="message"
                placeholder="Enter your message"
              />
            </div>
            <div className="flex gap-2 justify-end pt-8">
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-black font-semibold hover:shadow-md">
                Send Message
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default ContactForm;
