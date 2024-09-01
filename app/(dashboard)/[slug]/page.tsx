import Image from "next/image";
import { SearchForm } from "./vendor-search-form";
import Title from "./title";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <section className="flex flex-col items-start justify-center">
      <div className="container space-y-10 p-4 md:p-6 xl:space-y-20">
        <Title id={Number(params.slug)} />
      </div>
      <section className="relative grid h-fit w-full grid-cols-1 items-center justify-center gap-4 overflow-hidden p-4 lg:grid-cols-2 lg:p-6">
        <div className=" bg-primary-foreground" />
        <Image
          src="https://sacredshaadi.com/assets/slider/30-04-2023_10-38-00am_316945245_6119453994740894_9106820734715075120_n.jpg"
          alt="Hero Image"
          width={400}
          height={400}
          placeholder="data:image/base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          className="absolute
          inset-0 m-auto !w-full object-fill"
        />
        <section className="z-10 flex flex-col items-start justify-center gap-4 rounded-md bg-white p-4">
          <SearchForm vendorTypeId={Number(params.slug)} />
        </section>
      </section>
    </section>
  );
}
