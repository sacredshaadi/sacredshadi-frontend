import { SearchForm } from './vendor-search-form';

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <section className="flex flex-col items-start justify-center gap-6">
      <div className="container my-4 space-y-10 px-4 md:px-6 xl:space-y-16">
        <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
          Inquiry for {params.slug}
        </h1>
      </div>
      <section className="flex w-full flex-col items-center justify-center p-4 md:flex-row md:justify-between md:p-6">
        <section className="flex flex-col items-start justify-center gap-4">
          <SearchForm />
        </section>
      </section>
    </section>
  );
}
