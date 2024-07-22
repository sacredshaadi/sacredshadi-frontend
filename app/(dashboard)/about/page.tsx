import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sacred Shaadi</h1>
              <section className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tighter text-muted-foreground sm:text-2xl md:text-3xl">
                  Wedding Planner
                </h1>
                <p className="mb-4 max-w-[600px] text-muted-foreground">
                  Sacredshaadi is a trustable wedding planning website. Check prices, reviews and book the Wedding
                  Photographers, Bridal Makeup Artists of your choice at zero additional cost. Also get your dose of all
                  the latest wedding trends, bridal make up tips or even Honeymoon ideas. So whether you are looking to
                  hire wedding vendors or just looking for some inspiration, we are always there for you.
                </p>
                <h1 className="text-3xl font-bold tracking-tighter text-muted-foreground sm:text-2xl md:text-3xl">
                  Our Aim
                </h1>
                <p className="max-w-[600px] text-muted-foreground">
                  <span>
                    To provide you with the best Photographers and Makeup Artists of India by leveraging technology, in
                    accordance with your requirements. Wedding in India is a huge market and till date it mostly works
                    offline. We believe that internet and modern day technology can add to this industry significantly.
                    <br />
                    <br />
                    We are building a platform for all the &quot; to be married couples&quot; to make the most special
                    day of your lives even more exhilarating by offering high class vendors who are just a click away in
                    order to ease the process for you. We understand how important these moments are for you and no
                    matter what budget you are having, we do our best to make it magical.
                  </span>
                </p>
              </section>
            </div>

            {/* <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Join Now
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div> */}
          </div>
          <Image
            width={550}
            height={550}
            alt="Hero"
            src="/placeholder.svg"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:aspect-square"
          />
        </div>
      </section>
    </div>
  );
}
