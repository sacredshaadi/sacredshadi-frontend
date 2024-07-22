import { useUserContext } from "@/app/context/user-context";
import apiClient from "@/lib/apiConfig/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export type useTableHocQueryProps = {
  addDataEndpoint: string;
  editDataEndpoint: string;
  deleteDataEndpoint: string;
  paginateDataEndpoint: string;
};

function useTableHocQuery<T>(props: useTableHocQueryProps) {
  const { user } = useUserContext();
  // console.log({ user });

  const { data } = useQuery({
    queryKey: [props.paginateDataEndpoint],
    queryFn: () => {
      return apiClient(props.paginateDataEndpoint, {
        method: "GET",
        headers: { Authorization: user?.tokens.accessToken || "" }
      });
    }
  });

  const { mutate: handleEditData, isPending: isEditPending } = useMutation({
    mutationKey: [props.editDataEndpoint],
    mutationFn: (data: Partial<T>) => {
      return apiClient(props.editDataEndpoint, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { Authorization: user?.tokens.accessToken || "" }
      });
    }
  });

  const { mutate: handleDeleteData, isPending: isDeletePending } = useMutation({
    mutationKey: [props.deleteDataEndpoint],
    mutationFn: (id: number | string) => {
      return apiClient(props.deleteDataEndpoint, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { Authorization: user?.tokens.accessToken || "" }
      });
    }
  });

  const { mutate: handleAddData, isPending: isAddDataPending } = useMutation({
    mutationKey: [props.addDataEndpoint],
    mutationFn: (data: Partial<T>) => {
      return apiClient(props.addDataEndpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { Authorization: user?.tokens.accessToken || "" }
      });
    }
  });

  return {
    data,

    isEditPending,
    handleEditData,

    isDeletePending,
    handleDeleteData,

    handleAddData,
    isAddDataPending
  };
}

export default useTableHocQuery;
