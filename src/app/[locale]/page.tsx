import { Hero } from "./(home)/hero";
import { Locale } from "../i18n";
import { TrustBadges, USPBar, MiniFAQ } from "./(home)/sections";
import { readFile } from "node:fs/promises";
import path from "node:path";
import HomeAllProducts from "./(home)/HomeAllProducts";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale?: Locale }>;
}) {
  const resolved = await params;
  const locale: Locale = (resolved?.locale as Locale | undefined) ?? "tr";
  const messages = (await import(`../../messages/${locale}.json`)).default as any;
  const t = messages.hero;
  async function read(file: string){
    try{ const fp=path.join(process.cwd(),"public","data",file); const raw=await readFile(fp,"utf8"); const data=JSON.parse(raw)||[]; return Array.isArray(data)? data: []; } catch { return []; }
  }
  const files=[
    "apps-import.json","samsung-import.json","oppo-import.json","xiaomi-import.json","huawei-import.json","oneplus-import.json","realme-import.json","google-import.json","motorola-import.json","nokia-import.json","vivo-import.json","sony-import.json","lg-import.json","microsoft-import.json","lenovo-import.json","asus-import.json","wiko-import.json","zte-import.json",
    // accessories
    "accessories-screen-protectors.json","accessories-cases-and-covers.json","accessories-holders.json","accessories-cables.json","accessories-chargers.json","accessories-audio.json","accessories-data-storage.json"
  ];
  const allCats = (await Promise.all(files.map(read))).flat();
  const ids = new Set<string>();
  for(const c of allCats){ for(const it of (c.items||[])){ if(it?.id) ids.add(String(it.id)); } }
  const totalCount = ids.size;
  return (
    <div>
      <Hero
        title={t.headline}
        subtitle={t.subtitle}
        ctaLabel={t.cta ?? "Hemen Satın Al"}
        ctaHref={`/${locale}/urunler`}
      />
      <USPBar totalCount={totalCount} />
      {/* FeaturedCategories removed as requested */}
      {/* Featured products removed as requested */}
      {/* Sliders removed; show rotating all-products grid */}
      <HomeAllProducts locale={locale} />
      <TrustBadges />
      <MiniFAQ />
    </div>
  );
}


