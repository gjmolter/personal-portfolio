import { loadEntry, loadSlugs } from "@/lib/mdx";
import { getLang } from "@/lib/cookies";
import { reduceCounterparts, SUPPORTED_LANGS } from "@/lib/consts";
import SafeImage from "@/components/SafeImage";
import BackButton from "@/components/BackButton";
import PostContent from "@/components/PostContent";
import TagButton from "@/components/TagButton";
import ProductInquiryForm from "@/components/ProductInquiryForm";

const dictionary = {
  en: {
    price: "Price",
  },
  pt: {
    price: "Preço",
  },
} as const;

export async function generateStaticParams() {
  const allParams = [];
  for (const lang of SUPPORTED_LANGS) {
    const slugs = await loadSlugs("store", lang);
    for (const slug of slugs) {
      allParams.push({ lang, slug });
    }
  }
  return allParams;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLang();
  const { Component, meta } = await loadEntry(slug, "store", lang);
  const dict = dictionary[lang];
  const price = (meta as typeof meta & { price?: number }).price;
  const currency = (meta as typeof meta & { currency?: string }).currency || "USD";

  const formatPrice = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const counterparts = reduceCounterparts(meta.counterparts);

  return (
    <div className="w-full max-w-boxed mx-auto px-4 sm:px-6 pt-16 md:pt-28 flex flex-col pb-16">
      <div id="lang-counterparts" data-counterparts={JSON.stringify(counterparts)} className="hidden" />
      <BackButton className="mb-6" href={`/${lang}/store`} />
      <div className="flex gap-8 md:gap-12 mb-12 md:mb-16 max-lg:flex-col">
        <div className="flex-1 relative min-h-[250px] sm:min-h-[300px]">
          <SafeImage
            src={meta.image}
            alt={meta.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-contain object-center rounded-lg"
            defaultImage="/img/content/store/product-default.webp"
            style={{ viewTransitionName: `store-image-${slug}` }}
            priority={true}
          />
        </div>
        <div className="flex-[1.2] flex flex-col justify-center prose prose-invert">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black italic text-orange mb-4 md:mb-6 text-balance">
            {meta.title}
          </h1>
          {meta.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-2 mb-3 md:mb-4 pl-0">
              {meta.tags.map((tag) => (
                <TagButton key={tag} tag={tag} postType="store" selectedTags={[]} />
              ))}
            </ul>
          )}
          {price !== undefined && (
            <div className="mb-3 md:mb-4">
              <span className="text-sm text-gray-300 mb-2 block">{dict.price}</span>
              <span className="text-3xl sm:text-4xl font-bold text-orange">{formatPrice(price, currency)}</span>
            </div>
          )}
          <p className="text-lightgray max-w-xl text-balance mb-0">{meta.description}</p>
        </div>
      </div>
      <PostContent>
        <Component />
      </PostContent>
      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-0">
        <ProductInquiryForm productName={meta.title} />
      </div>
    </div>
  );
}
