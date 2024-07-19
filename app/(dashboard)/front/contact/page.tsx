import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { phoneArr, sacredShaadiAddress } from '@/constants/data';
import Team from './team';

export default function ContactUs() {
  return (
    <div className="flex min-h-dvh flex-col">
      <section className="w-full border-b py-12">
        <div className="container space-y-10 px-4 md:px-6 xl:space-y-16">
          <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:gap-16 lg:grid-cols-2">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Contact Us
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Have a question or want to work together? Reach out to us and we&apos;ll get back to you as soon as
                possible.
              </p>
            </div>

            <Card className="grid grid-cols-2 items-center justify-center gap-2">
              <Image src="/images/phone.svg" alt="phone" width={20} height={20} className="center-fixed col-span-1" />
              <section className="col-span-1 flex flex-col">
                <CardHeader>
                  <CardTitle>Sacred Shaadi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <p>{sacredShaadiAddress}</p>
                    </div>
                    <nav className="flex items-center gap-1">
                      <a href={`tel:${phoneArr[0]}`} className="text-sm text-muted-foreground hover:text-primary">
                        {phoneArr[0]}
                      </a>
                      <div className="text-muted-foreground">|</div>
                      <a href={`tel:${phoneArr[1]}`} className="text-sm text-muted-foreground hover:text-primary">
                        {phoneArr[1]}
                      </a>
                    </nav>
                  </div>
                </CardContent>

                <Link href={'#'} target="_blank" className="mx-auto mb-4">
                  <Button className="w-fit">Get Direction</Button>
                </Link>
              </section>
            </Card>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-8 border-b p-6 md:flex-row md:items-start md:justify-between md:p-8 lg:p-12">
        <h1 className="text-3xl font-bold">Our Client&apos;s reviews for Sacred Shaadi</h1>
        <Card className="max-w-4/5 w-[800px]">
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            <CardDescription>Share your thoughts and experiences with others.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="review">Your Review</Label>
                <Textarea id="review" placeholder="Share your review here..." rows={4} />
              </div>
              <div className="rating">
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              </div>
              <Button type="submit">Submit Review</Button>
            </form>
          </CardContent>
        </Card>
      </section>
      <Team />
    </div>
  );
}
