import React from "react";
import { usePaginatedData } from "../../hooks/apiHooks/useGetData";
import { deleteApi } from "../../api/apiFactory";
import toast from "react-hot-toast";
import { ModalContext } from "../../contexts/ModalContext";
import Empty from "../../components/common/all/Empty";
import { Button } from "@material-tailwind/react";
import TableLayout from "../../components/layout/TableLayout";
import ModalDelete from "../../components/common/modal/ModalDelete";
import UserForm from "../../features/users/UserForm";
import LineTable from "../../features/users/LineTable";

function UsersPage(props) {
  let { handleModal } = React.useContext(ModalContext);

  const {
    data: users,
    selectPage,
    refetch,
  } = usePaginatedData(7, "/users", "getUsers");
  const deleteUserFun = async (id) => {
    deleteApi("/users/", id, {
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
    <div className="flex flex-col gap-2   ">
      <div className="w-full flex items-center justify-between ">
        <div className="w-1/4 h-16 text-white font-semibold bg-gray-700 shadow-lg mb-4 flex justify-center items-center text-3xl">
          Utilisateurs
        </div>
        <div>
          <Button
            onClick={() => handleModal(<UserForm refetch={() => refetch()} />)}
            className="flex items-center gap-3 h-14">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Ajouter un Utilisateur
          </Button>
        </div>
      </div>
      <div className=" bg-white w-full  p-8 pb-0 shadow-md">
        {users && users?.data?.length == 0 ? (
          <div className="px-40 pb-8 ">
            <Empty />
          </div>
        ) : (
          <TableLayout
            withPaginate={true}
            columns={[
              "Nom",
              "email",
              "role",
              "télephone",
              "active",
              "date de creation",
              "action",
            ]}
            selectPage={selectPage}
            nbPages={users?.paginationResult.numberOfPages}>
            {users &&
              users.data.map((user, key) => {
                return (
                  <LineTable
                    key={key}
                    user={user}
                    deleteFun={() =>
                      handleModal(
                        <ModalDelete
                          deleteFun={() => deleteUserFun(user._id)}
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

export default UsersPage;
