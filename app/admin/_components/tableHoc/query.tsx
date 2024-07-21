import apiClient from "@/lib/apiConfig/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export type useTableHocQueryProps = {
  editDataEndpoint: string;
  deleteDataEndpoint: string;
  paginateDataEndpoint: string;
};

function useTableHocQuery(props: useTableHocQueryProps) {
  const { data } = useQuery({
    queryKey: [],
    queryFn: () => apiClient(props.paginateDataEndpoint, { method: "GET" })
  });

  const { mutate: editData, isPending: isEditPending } = useMutation({
    mutationKey: [],
    mutationFn: () => apiClient(props.editDataEndpoint, { method: "PUT" })
  });

  const { mutate: deleteData, isPending: isDeletePending } = useMutation({
    mutationKey: [],
    mutationFn: () => apiClient(props.deleteDataEndpoint, { method: "DELETE" })
  });

  return {
    data,
    editData,
    deleteData,
    isEditPending,
    isDeletePending
  };
}

export default useTableHocQuery;
