import { useVendorSearchStore, VendorSearchParams } from "@/app/context/vendor-search-context";
import { useSearchVendorsMutation } from "@/components/api";

export function useVendorSearch() {
  const vendorSearchStore = useVendorSearchStore();
  const { mutateAsync: handleVendorSearch, isPending } = useSearchVendorsMutation();

  const isNextPageAvailable = vendorSearchStore.page < Math.ceil(vendorSearchStore.count / vendorSearchStore.pageSize);
  const isPrevPageAvailable = vendorSearchStore.page > 1;

  async function onFormSubmit(params: VendorSearchParams) {
    vendorSearchStore.setSearchParams(params);
    const res = await handleVendorSearch({ ...params, page: 1, pageSize: vendorSearchStore.pageSize });
    vendorSearchStore.setData(res.data.rows, res.data.count);
  }

  async function nextPage() {
    if (isNextPageAvailable) {
      vendorSearchStore.nextPage();
      const res = await handleVendorSearch({ page: vendorSearchStore.page + 1, pageSize: vendorSearchStore.pageSize });
      vendorSearchStore.setData(res.data.rows, res.data.count);
    }
  }

  async function prevPage() {
    if (isPrevPageAvailable) {
      vendorSearchStore.prevPage();
      const res = await handleVendorSearch({ page: vendorSearchStore.page - 1, pageSize: vendorSearchStore.pageSize });
      vendorSearchStore.setData(res.data.rows, res.data.count);
    }
  }

  async function setPageSize(pageSize: number) {
    vendorSearchStore.setPageSize(pageSize);
    const res = await handleVendorSearch({ page: vendorSearchStore.page, pageSize });
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
    total: vendorSearchStore.count
  };
}
