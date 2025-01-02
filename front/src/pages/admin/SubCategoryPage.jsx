import React, { useState, useContext } from "react";
import TableLayout from "../../components/layout/TableLayout";
import { usePaginatedData } from "../../hooks/apiHooks/useGetData";

import LineTable from "../../featuresV/ingredients/LineTable";
import { deleteApi } from "../../api/apiFactory";
import toast from "react-hot-toast";
// import SubCategoryForm from "../../features/subCategory/SubCategoryForm";
import SubCategoryFormUpdate from "../../features/subCategory/SubCategoryFormUpdate";
import ModalDelete from "../../components/common/modal/ModalDelete";
import { ModalContext } from "../../contexts/ModalContext";
import Empty from "../../components/common/all/Empty";
function SubCategoryPage() {
  const { handleModal } = useContext(ModalContext);
  const [subCategory, setSubCategory] = useState(null);
  const {
    data: subcategorys,
    selectPage,
    refetch,
  } = usePaginatedData(7, "/subCategory", "getsubCategory");

  const updateCategoryFun = (subCategory) => {
    setSubCategory(subCategory);
  };
  const deleteCategoryFun = async (id) => {
    deleteApi("/subCategory/", id, {
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
          Sous-Categories
        </div>
        {/* {subCategory ? (
          <SubCategoryFormUpdate
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            refetch={() => refetch()}
          />
        ) : (
          <SubCategoryForm refetch={() => refetch()} />
        )} */}
      </div>
      <div className=" bg-white w-3/4  p-8 pb-0 shadow-md">
        {subcategorys && subcategorys.data.length == 0 ? (
          <Empty />
        ) : (
          <TableLayout
            withPaginate={true}
            columns={[
              "images",
              "nom",
              "slug",
              "categorie",
              "date de creation",
              "action",
            ]}
            selectPage={selectPage}
            nbPages={subcategorys?.paginationResult.numberOfPages}>
            {subcategorys &&
              subcategorys.data.map((subCategory, key) => {
                return (
                  <LineTable
                    key={key}
                    subCategory={subCategory}
                    editFun={() => updateCategoryFun(subCategory)}
                    deleteFun={() =>
                      handleModal(
                        <ModalDelete
                          deleteFun={() => deleteCategoryFun(subCategory._id)}
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

export default SubCategoryPage;
