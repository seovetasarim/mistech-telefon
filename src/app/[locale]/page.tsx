import Link from "next/link";

type PageProps = {
  params: { locale: string };
};

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale } = params;
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Mistech</h1>
      <p className="mt-2 text-muted-foreground">
        Ana sayfa hazır. Kategori sayfalarına aşağıdaki bağlantıdan gidebilirsiniz.
      </p>
      <div className="mt-6">
        <Link
          href={`/${locale}/kategori/telefonlar`}
          className="inline-flex items-center rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
        >
          Telefon Kategorisi
        </Link>
      </div>
    </main>
  );
}
