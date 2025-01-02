import { ModalContext } from "../../contexts/ModalContext";
import React, { useContext, useState } from "react";
import { usePaginatedData } from "../../hooks/apiHooks/useGetData";
import LineTable from "../../features/contact/LineTable";
import TableLayout from "../../components/layout/TableLayout";
import ModalDelete from "../../components/common/modal/ModalDelete";
import Empty from "../../components/common/all/Empty";
import MessageSection from "../../features/contact/messageSection";
import { deleteApi } from "../../api/apiFactory";

function ContactPageAdmin(props) {
  const { handleModal } = useContext(ModalContext);
  const [contact, setContact] = useState(null);

  const {
    data: contacts,
    selectPage,
    refetch,
  } = usePaginatedData(7, "/contacts", "getcontacts");

  const updateContactFun = (contact) => {
    setContact(contact);
  };
  const deleteContactFun = async (id) => {
    deleteApi("/contacts/", id, {
      token: true,
      formData: false,
    })
      .then((res) => {
        toast.success("Successfully deleted!");
        refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.errors[0].msg);
      });
  };
  return (
    <div className="flex gap-6   ">
      <div className="w-1/4  ">
        <div className="w-full h-20 text-white font-semibold bg-gray-700 shadow-lg mb-4 flex justify-center items-center text-3xl">
          Contacts
        </div>
        <MessageSection contact={contact} />
      </div>
      <div className=" bg-white w-3/4  p-8 pb-0 shadow-md">
        {contacts && contacts?.data?.length == 0 ? (
          <Empty />
        ) : (
          <TableLayout
            withPaginate={true}
            columns={["Nom", "email", "sujet", "date de creation", "action"]}
            selectPage={selectPage}
            nbPages={contacts?.paginationResult.numberOfPages}>
            {contacts &&
              contacts.data.map((contact, key) => {
                return (
                  <LineTable
                    key={key}
                    contact={contact}
                    editFun={() => updateContactFun(contact)}
                    deleteFun={() =>
                      handleModal(
                        <ModalDelete
                          deleteFun={() => deleteContactFun(contact._id)}
                        />
                      )
                    }
                  />
                );
              })}
          </TableLayout>
        )}
      </div>
    </div>
  );
}

export default ContactPageAdmin;
