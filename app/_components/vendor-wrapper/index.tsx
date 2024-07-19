'use client';

import React from 'react';
import VendorModal from './vendor-modal';

const VendorWrapper = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-12 p-4">
      <header className="flex w-full flex-col items-center justify-center lg:w-4/5 xl:w-3/5">
        <h1 aria-label="Vendors" className="text-2xl">
          Our Vendors
        </h1>

        <span className="text-center">
          From the most skillful Makeup Artists to the mighty impressive Candid
          Photographers, we cover the wedding service providers for all your
          basic needs! And for your own discernment, you can find the necessary
          details, photos of their work and first hand reviews of all of the
          wedding service providers!
        </span>
      </header>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VendorModal
          description="FIND BEST MAKEUP ARTISTS IN INDIA WITH PRICES"
          title="this is title"
          onClick={() => {}}
        />
        <VendorModal
          description="FIND BEST MAKEUP ARTISTS IN INDIA WITH PRICES"
          title="this is title"
          onClick={() => {}}
        />
        <VendorModal
          description="FIND BEST MAKEUP ARTISTS IN INDIA WITH PRICES"
          title="this is title"
          onClick={() => {}}
        />
        <VendorModal
          description="FIND BEST MAKEUP ARTISTS IN INDIA WITH PRICES"
          title="this is title"
          onClick={() => {}}
        />
        <VendorModal
          description="FIND BEST MAKEUP ARTISTS IN INDIA WITH PRICES"
          title="this is title"
          onClick={() => {}}
        />
      </section>
    </section>
  );
};

export default VendorWrapper;
