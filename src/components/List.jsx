import { useCallback } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { default as api } from "../store/apiSlice";

export const List = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  let Transactions;

  const handleClick = useCallback((id) => {
    if(!id) return 0;
    deleteTransaction({ _id: id })
  }, [])

  if (isFetching) {
    Transactions = <div>Fetching...</div>;
  } else if (isSuccess) {
    Transactions = data.map((val) => (
      <Transaction key={val._id} category={val} handler={handleClick}/>
    ));
  } else if (isError) {
    Transactions = <div>Error!</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {Transactions}
    </div>
  );
};

const Transaction = ({ category, handler }) => {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#f9c74f"}` }}
    >
      <button className="px-3" onClick={() => handler(category._id ?? "")}>
        <BsFillTrashFill color={category.color ?? "#f9c74f"} size="15px" />
      </button>
      <span className="block w-full">{category.name ?? ""}</span>
    </div>
  );
};
