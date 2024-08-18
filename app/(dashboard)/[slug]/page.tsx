import Image from "next/image";
import { SearchForm } from "./vendor-search-form";
import Title from "./title";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <section className="flex flex-col items-start justify-center">
      <div className="container space-y-10 p-4 md:p-6 xl:space-y-20">
        <Title id={Number(params.slug)} />
      </div>
      <section className="grid w-full grid-cols-1 items-center justify-center gap-4 p-4 lg:grid-cols-2 lg:p-6">
        <Image
          src="/images/hero-image.png"
          alt="Hero Image"
          width={400}
          height={400}
          className="m-auto
          !w-full object-cover"
        />
        <section className="flex flex-col items-start justify-center gap-4">
          <SearchForm vendorTypeId={Number(params.slug)} />
        </section>
      </section>
    </section>
  );
}
