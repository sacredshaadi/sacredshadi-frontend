import { useVendorSearchStore, VendorSearchParams } from "@/app/context/vendor-search-context";
import { useSearchVendorsMutation } from "@/components/api";

export function useVendorSearch() {
  const vendorSearchStore = useVendorSearchStore();
  const { mutateAsync: handleVendorSearch, isPending } = useSearchVendorsMutation();

  async function onFormSubmit(params: VendorSearchParams) {
    vendorSearchStore.setSearchParams(params);
    const res = await handleVendorSearch({ ...params, page: 1, pageSize: vendorSearchStore.pageSize });
    vendorSearchStore.setData(res.data, res.count);
  }

  async function nextPage() {
    if (vendorSearchStore.page < Math.ceil(vendorSearchStore.count / vendorSearchStore.pageSize)) {
      vendorSearchStore.nextPage();
      const res = await handleVendorSearch({ page: vendorSearchStore.page + 1, pageSize: vendorSearchStore.pageSize });
      vendorSearchStore.setData(res.data, res.count);
    }
  }

  async function prevPage() {
    if (vendorSearchStore.page > 1) {
      vendorSearchStore.prevPage();
      const res = await handleVendorSearch({ page: vendorSearchStore.page - 1, pageSize: vendorSearchStore.pageSize });
      vendorSearchStore.setData(res.data, res.count);
    }
  }

  async function setPageSize(pageSize: number) {
    vendorSearchStore.setPageSize(pageSize);
    const res = await handleVendorSearch({ page: vendorSearchStore.page, pageSize });
    vendorSearchStore.setData(res.data, res.count);
  }

  return {
    isPending,
    onFormSubmit,
    nextPage,
    prevPage,
    setPageSize,
    data: vendorSearchStore.data,
    page: vendorSearchStore.page,
    pageSize: vendorSearchStore.pageSize,
    total: vendorSearchStore.count
  };
}
