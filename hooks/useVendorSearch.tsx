import { useUserStore } from "@/app/context/user-context";
import { useVendorSearchStore, VendorSearchParams } from "@/app/context/vendor-search-context";
import { useSearchVendorsMutation } from "@/components/api";
import { UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useVendorSearch(useMutation?: () => UseMutationResult<any, Error, any, unknown>, setProfile?: any) {
  const vendorSearchStore = useVendorSearchStore();
  const { setVendor } = useUserStore();
  const router = useRouter();
  const func = useMutation || useSearchVendorsMutation;
  const { mutateAsync: handleVendorSearch, isPending } = func();

  const isNextPageAvailable = vendorSearchStore.page < Math.ceil(vendorSearchStore.count / vendorSearchStore.pageSize);
  const isPrevPageAvailable = vendorSearchStore.page > 1;

  async function checkUnauthorized(res: any) {
    if (res.status === 401) {
      setProfile(null);
      router.push("/login");
    }
  }

  async function onFormSubmit(params: any) {
    vendorSearchStore.setSearchParams(params);
    const res = await handleVendorSearch({ ...params, page: 1, pageSize: vendorSearchStore.pageSize });
    await checkUnauthorized(res);
    vendorSearchStore.setData(res.data.rows, res.data.count);
    vendorSearchStore.setSearched(true);
  }

  async function nextPage() {
    if (isNextPageAvailable) {
      vendorSearchStore.nextPage();
      const res = await handleVendorSearch({ page: vendorSearchStore.page + 1, pageSize: vendorSearchStore.pageSize });
      await checkUnauthorized(res);
      vendorSearchStore.setData(res.data.rows, res.data.count);
    }
  }

  async function prevPage() {
    if (isPrevPageAvailable) {
      vendorSearchStore.prevPage();
      const res = await handleVendorSearch({ page: vendorSearchStore.page - 1, pageSize: vendorSearchStore.pageSize });
      await checkUnauthorized(res);
      vendorSearchStore.setData(res.data.rows, res.data.count);
    }
  }

  async function setPageSize(pageSize: number) {
    vendorSearchStore.setPageSize(pageSize);
    const res = await handleVendorSearch({ page: vendorSearchStore.page, pageSize });
    await checkUnauthorized(res);
    vendorSearchStore.setData(res.data.rows, res.data.count);
  }

  return {
    isPending,
    onFormSubmit,
    nextPage,
    prevPage,
    setPageSize,
    isNextPageAvailable,
    isPrevPageAvailable,
    data: vendorSearchStore.data,
    page: vendorSearchStore.page,
    pageSize: vendorSearchStore.pageSize,
    total: vendorSearchStore.count,
    searched: vendorSearchStore.searched,
    setSearched: vendorSearchStore.setSearched
  };
}
