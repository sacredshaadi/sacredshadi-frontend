import Image from "next/image";
import { SearchForm } from "./vendor-search-form";
import Title from "./title";
import { VendorSearchGrid } from "./vendor-search-grid";

export default function Page(props: { params: { slug: string } }) {
  return (
    <section className="flex flex-col items-start justify-center">
      <div className="container space-y-10 p-4 md:p-6 xl:space-y-20">
        <Title id={Number(props.params.slug)} />
      </div>

      <section className="relative grid h-fit w-full grid-cols-1 items-center justify-center gap-4 overflow-hidden p-4 lg:grid-cols-2 lg:p-6">
        <div className=" bg-primary-foreground" />
        <Image
          width={400}
          height={400}
          alt="Hero Image"
          src="/slider-hero.jpg"
          className="absolute inset-0 m-auto !w-full object-fill"
          placeholder="data:image/base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />

        <section className="z-10 my-8 flex flex-col items-start justify-center gap-4 rounded-md bg-white p-4 shadow-2xl sm:my-16">
          <SearchForm vendorTypeId={Number(props.params.slug)} />
        </section>
      </section>

      <VendorSearchGrid />
    </section>
  );
}
