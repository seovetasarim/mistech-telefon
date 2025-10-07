"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, BadgeCheck, ShieldCheck, Smartphone, BatteryCharging, MonitorSmartphone, Headphones, Shield, Wifi, Bluetooth, Cpu, HardDrive, Cable, Speaker, Camera, Zap, HelpCircle, Search, Mail, Bell, Send, CheckCircle, XCircle, X, UserMinus } from "lucide-react";

export function FeaturedCategories({ base }: { base: string }) {
	const categories = [
		{ title: "Telefonlar", href: `${base}/kategori/telefonlar`, Icon: Smartphone },
        { title: "Samsung Parçaları", href: `${base}/kategori/samsung`, Icon: Smartphone },
		{ title: "Batarya", href: `${base}/kategori/parcalar?parca=${encodeURIComponent("Batarya")}` , Icon: BatteryCharging },
		{ title: "Ekran", href: `${base}/kategori/parcalar?parca=${encodeURIComponent("Ekran")}`, Icon: MonitorSmartphone },
		{ title: "Kulaklık", href: `${base}/kategori/parcalar?alt=${encodeURIComponent("Kulaklık")}`, Icon: Headphones },
		{ title: "Kılıf", href: `${base}/kategori/parcalar?alt=${encodeURIComponent("Kılıf")}`, Icon: Shield },
		{ title: "Kablosuz Şarj", href: `${base}/kategori/parcalar?alt=${encodeURIComponent("Kablosuz Şarj")}`, Icon: Wifi },
		{ title: "Bluetooth Aksesuar", href: `${base}/kategori/parcalar?alt=${encodeURIComponent("Bluetooth Aksesuar")}`, Icon: Bluetooth },
		{ title: "İşlemci/Yonga", href: `${base}/kategori/parcalar?parca=${encodeURIComponent("Anakart Parçaları")}`, Icon: Cpu },
		{ title: "Depolama", href: `${base}/kategori/parcalar?alt=${encodeURIComponent("Depolama")}`, Icon: HardDrive },
		{ title: "Kablolar", href: `${base}/kategori/parcalar?alt=${encodeURIComponent("Kablo")}`, Icon: Cable },
		{ title: "Hoparlör", href: `${base}/kategori/parcalar?parca=${encodeURIComponent("Hoparlör")}`, Icon: Speaker },
        { title: "Kamera", href: `${base}/kategori/parcalar?parca=${encodeURIComponent("Kamera Modülü")}` , Icon: Camera },
		{ title: "Hızlı Şarj", href: `${base}/kategori/parcalar?alt=${encodeURIComponent("Şarj Cihazı")}`, Icon: Zap }
    ] as const;

	return (
        <section className="mx-auto max-w-7xl px-6 pt-2 pb-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-semibold">Öne Çıkan Kategoriler</h2>
				<a href={base + "/urunler"} className="text-sm text-muted-foreground hover:text-foreground">Tümünü Gör →</a>
			</div>
            <FeaturedSlider items={categories} />
		</section>
	);
}

function FeaturedSlider({
    items,
}: {
    items: ReadonlyArray<{ title: string; href: string; Icon: any }>;
}) {
	const trackRef = useRef<HTMLDivElement>(null);
	const [isHover, setIsHover] = useState(false);

	useEffect(() => {
		const el = trackRef.current;
		if (!el) return;
        const tick = () => {
            if (!el || isHover) return;
            const firstChild = el.firstElementChild as HTMLElement | null;
            const step = firstChild ? firstChild.clientWidth : Math.ceil(el.clientWidth / 6);
            const nearEnd = el.scrollLeft + el.clientWidth + step >= el.scrollWidth - 1;
            if (nearEnd) {
                el.scrollTo({ left: 0, behavior: "auto" });
            } else {
                el.scrollBy({ left: step, behavior: "smooth" });
            }
        };
        const id = setInterval(tick, 2000);
        return () => clearInterval(id);
    }, [isHover]);

    const loopItems = [...items, ...items];

	return (
			<div
            className="overflow-hidden"
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
            <div ref={trackRef} className="flex overflow-x-auto scroll-smooth no-scrollbar">
                {loopItems.map(({ title, href, Icon }, idx) => (
                    <a
                        key={`${title}-${idx}`}
                        href={href}
                        aria-label={title}
                        className="group flex-none basis-1/2 md:basis-1/3 lg:basis-1/6 px-1"
                    >
                        <Card className="rounded-xl border bg-card transition hover:border-primary/40 hover:shadow-sm">
                            <CardContent className="h-28 flex items-center gap-3">
                                <div className="inline-flex items-center justify-center size-10 rounded-md bg-secondary">
                                    <Icon className="size-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium truncate">{title}</div>
                                    <div className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">İncele</div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition text-muted-foreground">→</div>
								</CardContent>
							</Card>
						</a>
					))}
				</div>
			</div>
	);
}

export function TrustBadges() {
	// Bu bölüm yerine abone ol alanı gösterilecek
	const [email, setEmail] = useState("");
	const [ok, setOk] = useState<boolean | null>(null);
	const [loading, setLoading] = useState(false);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault(); setLoading(true); setOk(null);
		try {
			const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
			setOk(res.ok);
		} finally { setLoading(false); }
	}

	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
			{/* Premium background pattern */}
			<div className="absolute inset-0 opacity-20">
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
			</div>
			
			<div className="relative mx-auto max-w-4xl px-6 py-16">
				<div className="text-center">
					{/* Premium badge */}
					<div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-1.5 text-xs font-medium mb-6">
						<Bell className="w-3.5 h-3.5" />
						Exclusive Updates
					</div>
					
					<h2 className="text-3xl font-bold tracking-tight mb-3">Kampanyalardan Haberdar Ol</h2>
					<p className="text-white/70 text-base mb-8 max-w-lg mx-auto">Özel indirimler ve yeni ürünler için e-posta ile abone ol. Premium müşteri deneyimi.</p>
					
					<form onSubmit={onSubmit} className="max-w-md mx-auto">
						<div className="flex gap-3">
							<div className="flex-1 relative">
								<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
								<input 
									type="email" 
									required 
									value={email} 
									onChange={(e)=>setEmail(e.target.value)} 
									placeholder="E-posta adresiniz" 
									className="w-full h-12 pl-10 pr-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all text-sm" 
								/>
							</div>
							<button 
								type="submit" 
								disabled={loading} 
								className="h-12 px-6 rounded-xl bg-white text-primary font-semibold hover:bg-white/95 disabled:opacity-60 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm shadow-lg"
							>
								{loading ? (
									<>
										<div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
										Gönderiliyor...
									</>
								) : (
									<>
										<Send className="w-4 h-4" />
										Abone Ol
									</>
								)}
							</button>
						</div>
					</form>
					
					{ok === true && (
						<div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 px-4 py-2 text-sm">
							<CheckCircle className="w-4 h-4" />
							Abonelik talebin alındı. Teşekkürler!
						</div>
					)}
					{ok === false && (
						<div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500/20 border border-red-400/30 text-red-100 px-4 py-2 text-sm">
							<XCircle className="w-4 h-4" />
							Abonelik tamamlanamadı. Tekrar dene.
						</div>
					)}
					
					{/* Premium features */}
					<div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/60">
						<div className="flex items-center gap-1.5">
							<Shield className="w-3.5 h-3.5" />
							<span>KVKK Uyumlu</span>
						</div>
						<div className="flex items-center gap-1.5">
							<X className="w-3.5 h-3.5" />
							<span>Spam Yok</span>
						</div>
						<div className="flex items-center gap-1.5">
							<UserMinus className="w-3.5 h-3.5" />
							<span>Tek Tıkla Ayrıl</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export function USPBar({ totalCount }: { totalCount?: number }) {
    const t = useTranslations('home');
    const items = [
        { title: t('freeShippingTitle'), desc: t('freeShippingDesc'), Icon: Truck, color: "text-emerald-600" },
        { title: t('returnPolicyTitle'), desc: t('returnPolicyDesc'), Icon: BadgeCheck, color: "text-sky-600" },
        { title: t('twoYearWarrantyTitle'), desc: t('twoYearWarrantyDesc'), Icon: ShieldCheck, color: "text-indigo-600" },
        { title: t('securePaymentTitle'), desc: t('securePaymentDesc'), Icon: Shield, color: "text-amber-600" },
        { title: t('liveSupportTitle'), desc: t('liveSupportDesc'), Icon: Headphones, color: "text-emerald-600" }
    ];
    return (
        <div className="border-y bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
            <div className="mx-auto max-w-7xl px-6 h-12 md:h-14 flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar text-xs md:text-sm">
                    {items.map((x, i) => (
                        <div key={x.title} className="flex items-center gap-2 whitespace-nowrap">
                            <span className={`inline-flex items-center justify-center size-6 rounded-full bg-white/10 text-white ${x.color}`}>
                                <x.Icon className="size-3.5" />
                            </span>
                            <span className="font-medium text-white">{x.title}</span>
                            <span className="text-white/80">{x.desc}</span>
                            {i !== items.length - 1 && <span className="hidden md:block h-5 w-px bg-white/20 mx-2" />}
                        </div>
                    ))}
                </div>
                {/* toplam ürün üst barda gösterilmeyecek */}
            </div>
        </div>
    );
}

export function BrandCarousel() {
    const brands = [
        { name: "Apple", slug: "apple" },
        { name: "Samsung", slug: "samsung" },
        { name: "Xiaomi", slug: "xiaomi" },
        { name: "Huawei", slug: "huawei" },
        { name: "Anker", slug: "anker" },
        { name: "Baseus", slug: "baseus" },
        { name: "Sony", slug: "sony" },
        { name: "JBL", slug: "jbl" },
        { name: "Nothing", slug: "nothing" },
        { name: "OnePlus", slug: "oneplus" }
    ];
    return (
        <section className="mx-auto max-w-7xl px-6 py-8">
            <div className="flex overflow-x-auto no-scrollbar gap-6 md:gap-8 items-center opacity-80">
                {brands.map((b) => {
                    const src = `https://cdn.simpleicons.org/${b.slug}/6b7280`;
                    return (
                        <img
                            key={b.name}
                            src={src}
                            alt={b.name}
                            title={b.name}
                            className="h-6 md:h-8 w-auto object-contain"
                            loading="lazy"
                        />
                    );
                })}
            </div>
        </section>
    );
}

export function MiniFAQ() {
    // Admin panelinden içeriğe bağlanacak örnek veri
    const items = [
        { q: "Kargo süresi nedir?", a: "Hafta içi 16:00'ya kadar verilen siparişler aynı gün kargoya verilir. Teslimat genellikle 2-3 iş günü sürer." },
        { q: "İade şartları?", a: "Ürünü 14 gün içinde, hasarsız ve eksiksiz olarak iade edebilirsiniz. İade talebinizi Hesabım > Siparişlerim üzerinden başlatın." },
        { q: "Ürünler orijinal mi?", a: "Tüm ürünler faturalı, bandrollü ve üretici garantilidir. Mağazamızda sahte ürün satışı yapılmaz." },
        { q: "Garanti kapsamı?", a: "Elektronik ürünler en az 24 ay yetkili servis garantisine sahiptir. Arıza durumunda kutu içindeki garanti belgesiyle başvurabilirsiniz." },
        { q: "Ödeme yöntemleri?", a: "Kredi/Banka kartı, havale/EFT ve kapıda ödeme (uygun ürünlerde) seçenekleri mevcuttur." },
        { q: "Sipariş takibi?", a: "Kargo takip numaranız, siparişiniz kargoya verildiğinde e-posta ile iletilir ve Hesabım > Siparişlerim sayfasında görünür." }
    ];

    const [query, setQuery] = useState("");
    const filtered = items.filter(x => (x.q + " " + x.a).toLowerCase().includes(query.toLowerCase()));

    return (
        <section className="relative bg-white text-foreground">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                        <HelpCircle className="w-3.5 h-3.5" /> Yardım & Destek
                    </div>
                    <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">Sıkça Sorulan Sorular</h2>
                    <p className="text-muted-foreground text-sm md:text-base mt-2">Sipariş, kargo, iade ve garanti hakkında merak ettiklerin</p>
                </div>

                <div className="mx-auto max-w-3xl mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            value={query}
                            onChange={(e)=>setQuery(e.target.value)}
                            placeholder="Soru ara..."
                            className="w-full h-11 pl-10 pr-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>
                </div>

                <div className="mx-auto max-w-5xl">
                    <Accordion type="single" collapsible>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filtered.map((x, i) => (
                                <AccordionItem key={i} value={`item-${i}`} className="rounded-lg border bg-card">
                                    <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                                        <span className="inline-flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-semibold">{i+1}</span>
                                            {x.q}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                                        {x.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </div>
                    </Accordion>

                    {filtered.length === 0 && (
                        <div className="text-center text-muted-foreground mt-8">Aramanızla eşleşen sonuç bulunamadı.</div>
                    )}

                    <div className="mt-8 text-center">
                        <a href="/iletisim" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-accent/60">
                            <HelpCircle className="w-4 h-4" /> Sorunu çözemediysen bizimle iletişime geç
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}


