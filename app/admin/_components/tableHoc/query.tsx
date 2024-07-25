import { useUserStore } from "@/app/context/user-context";
import apiClient from "@/lib/apiConfig/apiClient";
import { UserAuthType } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export type useTableHocQueryProps = {
  type: UserAuthType;
  addDataEndpoint: string;
  editDataEndpoint: string;
  deleteDataEndpoint: string;
  paginateDataEndpoint: string;
};

function useTableHocQuery<T>(props: useTableHocQueryProps) {
  const userStore = useUserStore();

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + userStore[props.type]?.tokens.accessToken || ""
  };

  const {
    data,
    refetch: refetchData,
    isFetching: isFetchingData
  } = useQuery({
    queryKey: [props.paginateDataEndpoint],
    queryFn: () => apiClient(props.paginateDataEndpoint, { method: "GET", headers })
  });

  const { mutate: handleEditData, isPending: isEditPending } = useMutation({
    mutationKey: [props.editDataEndpoint],
    mutationFn: (data: Partial<T>) =>
      apiClient(props.editDataEndpoint, { method: "PUT", body: JSON.stringify(data), headers })
  });

  const { mutate: handleDeleteData, isPending: isDeletePending } = useMutation({
    mutationKey: [props.deleteDataEndpoint],
    mutationFn: (id: number | string) =>
      apiClient(props.deleteDataEndpoint, { method: "DELETE", body: JSON.stringify({ id }), headers })
  });

  const { mutate: handleAddData, isPending: isAddDataPending } = useMutation({
    mutationKey: [props.addDataEndpoint],
    mutationFn: (data: Partial<T>) =>
      apiClient(props.addDataEndpoint, { method: "POST", body: JSON.stringify(data), headers })
  });

  return {
    data,
    refetchData,
    isFetchingData,

    isEditPending,
    handleEditData,

    isDeletePending,
    handleDeleteData,

    handleAddData,
    isAddDataPending
  };
}

export default useTableHocQuery;
