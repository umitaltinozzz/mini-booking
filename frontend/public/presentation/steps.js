/**
 * AKRAN Sunum Adımları
 * Her adım: selector, title, content, action (opsiyonel), scrollBehavior
 */
const SUNUM_STEPS = [
    // --- NAVBAR TANITIMI ---
    {
        selector: 'header nav',
        title: '📍 Navbar (Gezinme Çubuğu)',
        content: 'Sayfanın üst kısmındaki navigasyon çubuğu. Kullanıcılar buradan tüm bölümlere erişebilir.',
        wait: 2250
    },
    {
        selector: 'header nav a[href="/"], header nav a[href="/tr"], header nav a[href="/en"]',
        title: '🏠 Logo',
        content: 'AKRAN Randevu logosu ve markası. Tıklandığında ana sayfaya yönlendirir.',
        wait: 2250
    },
    {
        selector: 'header nav button:has(.lucide-chevron-right), header nav div.relative > button',
        title: '🎯 Çözümler Menüsü',
        content: 'Dropdown menü: Kullanım senaryoları, özellikler, sektör çözümleri ve entegrasyonlar burada listeleniyor.',
        action: 'hover',
        wait: 2250
    },
    {
        selector: 'a[href="#guvenlik"]',
        title: '🔒 Güvenlik',
        content: 'Enterprise seviyesinde güvenlik altyapımız. SSL, şifreleme ve KVKK uyumlu veri koruma.',
        wait: 1200
    },
    {
        selector: 'a[href="#fiyat"]',
        title: '💰 Fiyatlandırma',
        content: 'Şeffaf ve uygun fiyatlandırma planlarımız. Her işletme boyutu için uygun seçenekler.',
        wait: 1200
    },
    {
        selector: 'a[href="#sss"]',
        title: '❓ SSS',
        content: 'Sık Sorulan Sorular bölümü. Müşterilerimizin en çok merak ettiği konular.',
        wait: 1200
    },

    // --- TEMA TOGGLE ---
    {
        selector: 'header button[aria-label="Toggle theme"], header nav > div:last-child button:first-child',
        title: '🌙 Tema Değiştirme',
        content: 'Varsayılan olarak DARK MODE ile geliyor. Kullanıcı bu butonla açık temaya geçebilir. Şimdi light mode\'a geçiyoruz...',
        action: 'click',
        wait: 2250
    },
    {
        selector: 'header button[aria-label="Toggle theme"], header nav > div:last-child button:first-child',
        title: '☀️ Light Mode Aktif',
        content: 'Site açık temaya geçti. Şimdi tekrar dark mode\'a dönüyoruz...',
        action: 'click',
        wait: 2250
    },

    // --- DİL TOGGLE ---
    {
        selector: 'header button[aria-label="Change language"], header nav > div:last-child button:nth-child(2)',
        title: '🌐 Dil Seçeneği',
        content: 'Çoklu dil desteği! next-intl kütüphanesi kullanılıyor. Şimdi İngilizce\'ye geçiyoruz...',
        action: 'click',
        wait: 2250
    },
    {
        selector: 'header button[aria-label="Change language"], header nav > div:last-child button:nth-child(2)',
        title: '🇬🇧 English Active',
        content: 'Site İngilizce\'ye döndü. Şimdi Türkçe\'ye geri dönüyoruz...',
        action: 'click',
        wait: 2250
    },

    // --- GİRİŞ VE DEMO BUTONLARI ---
    {
        selector: 'header nav a[href="/login"], header a[href="/tr/login"], header a[href="/en/login"]',
        title: '🔑 Giriş Yap Butonu',
        content: 'Mevcut kullanıcılar buradan giriş yapabilir. Login sayfasına yönlendirir.',
        wait: 1200
    },
    {
        selector: 'header nav a[href="/demo"], header a[href="/tr/demo"], header a[href="/en/demo"]',
        title: '🚀 Demo Butonu',
        content: 'Yeni kullanıcılar demo talep edebilir. Dikkat çekici yeşil gradient tasarım.',
        wait: 1200
    },

    // --- HERO BÖLÜMÜ ---
    {
        selector: 'main section:first-of-type h1, main > div:first-child h1',
        title: '🚀 Hero Bölümü',
        content: 'Ana tanıtım alanı. "Akıllı. Kolay. Randevu. Artık Network\'ünüzde" sloganı.',
        wait: 2250
    },

    // --- LOGO WALL (Tercih Ediliyor) ---
    {
        selector: '.animate-marquee, section#urun > div:last-child, [class*="marquee"]',
        title: '🏢 Türkiye\'nin Önde Gelen Kurumları',
        content: 'Bizi tercih eden kurumların logoları. Güven ve referans göstergesi.',
        wait: 2250
    },

    // --- HERKES İÇİN TASARLANDI (Tab Butonları) ---
    {
        selector: '#cozumler, section[id="cozumler"]',
        title: '👥 Herkes İçin Tasarlandı',
        content: 'Farklı kullanıcı rolleri için özelleştirilmiş deneyim. Şimdi tab butonlarını görelim...',
        wait: 2250
    },
    {
        selector: '#cozumler button:first-of-type, section[id="cozumler"] button:first-of-type',
        title: '👔 Personel Sekmesi',
        content: 'Personel paneli: Randevu takibi, müşteri yönetimi, günlyk program.',
        action: 'click',
        wait: 2250
    },
    {
        selector: '#cozumler button:nth-of-type(2), section[id="cozumler"] button:nth-of-type(2)',
        title: '🏢 İşletme Sahibi Sekmesi',
        content: 'İşletme yönetimi: Gelir analizi, personel performansı, raporlar.',
        action: 'click',
        wait: 2250
    },
    {
        selector: '#cozumler button:nth-of-type(3), section[id="cozumler"] button:nth-of-type(3)',
        title: '👤 Müşteri Sekmesi',
        content: 'Müşteri deneyimi: Online randevu, ödeme, fatura.',
        action: 'click',
        wait: 2250
    },

    // --- ÖZELLİKLER (DAHA AZ EFOR DAHA ÇOK İŞ) - 9 KART ---
    // NOT: .group class kullanıyoruz çünkü 3. kartın içinde nested .grid var
    {
        selector: '#ozellikler, section[id="ozellikler"]',
        title: '⚡ Özellikler Bölümü',
        content: '"DAHA AZ EFOR, DAHA ÇOK İŞ" - 9 güçlü özelliğimizi keşfedelim...',
        wait: 2250,
        scrollBehavior: 'smooth'
    },
    {
        selector: '#ozellikler .grid > div.group:nth-of-type(1)',
        title: '🏢 1. Multi-Tenant Yapı',
        content: 'Tek kurulumda birden fazla işletme. Tamamen izole veriler.',
        wait: 1200
    },
    {
        selector: '#ozellikler .grid > div.group:nth-of-type(2)',
        title: '🔐 2. Rol Tabanlı Yetkilendirme',
        content: 'RBAC sistemi - Her kullanıcıya özel izinler.',
        wait: 1200
    },
    {
        selector: '#ozellikler .grid > div.group:nth-of-type(3)',
        title: '⚙️ 3. Otomatik Slot Üretimi',
        content: 'Kuralları gir, slotlar otomatik oluşsun. Müsaitlik + izinleri birleştirir.',
        wait: 1200
    },
    {
        selector: '#ozellikler .grid > div.group:nth-of-type(4)',
        title: '⚠️ 4. Çakışma Kontrolü',
        content: 'Aynı slot iki kez doldurulamaz. Real-time kontrol.',
        wait: 1200
    },
    {
        selector: '#ozellikler .grid > div.group:nth-of-type(5)',
        title: '🏖️ 5. İzin Yönetimi',
        content: 'Personel izinleri, tatiller ve özel günler.',
        wait: 1200
    },
    {
        selector: '#ozellikler .grid > div.group:nth-of-type(6)',
        title: '🔔 6. Bildirimler',
        content: 'SMS, email ve push bildirimler. Hatırlatmalar.',
        wait: 1200
    },
    {
        selector: '#ozellikler .grid > div.group:nth-of-type(7)',
        title: '📋 7. Audit Log',
        content: 'Tüm işlemler kayıt altında. İzlenebilirlik.',
        wait: 1200
    },
    {
        selector: '#ozellikler .grid > div.group:nth-of-type(8)',
        title: '📊 8. Raporlama',
        content: 'Detaylı analizler ve iş zekası.',
        wait: 1200
    },
    {
        selector: '#ozellikler .grid > div.group:nth-of-type(9)',
        title: '🤖 9. AI Asistan',
        content: 'Yapay zeka destekli asistan.',
        wait: 1200
    },
    // --- SEKTÖRLER (HER SEKTÖRE ÖZEL) ---
    {
        selector: '#sektorler, section[id="sektorler"]',
        title: '🏭 Sektörler',
        content: 'HER SEKTÖRE ÖZEL ÇÖZÜM - Restoran, kafe, kuaför ve daha fazlası için özelleştirilmiş deneyim.',
        wait: 2250
    },

    // --- HİKAYELER (NELER MÜMKÜN) ---
    {
        selector: '#hikayeler, section[id="hikayeler"]',
        title: '� Başarı Hikayeleri',
        content: 'AKRAN ile Neler Mümkün? Gerçek müşteri hikayeleri ve dönüşümler.',
        wait: 2250
    },

    // --- ENTEGRASYONLAR ---
    {
        selector: '#entegrasyon, section[id="entegrasyon"]',
        title: '🔗 Entegrasyonlar',
        content: 'Favori Araçlarınızla Tam Entegre - Takvim, bildirim ve API katmanı.',
        wait: 2250
    },

    // --- GÜVENLİK ---
    {
        selector: '#guvenlik, section[id="guvenlik"], [class*="security"]',
        title: '🛡️ Güvenlik & Güven',
        content: 'SSL sertifikası, KVKK uyumu, 256-bit şifreleme ve %99.9 uptime garantisi.',
        wait: 2250
    },
    {
        selector: '#fiyat, section[id="fiyat"], [class*="pricing"]',
        title: '📊 Fiyatlandırma Planları',
        content: 'Başlangıç, Profesyonel ve Kurumsal planlar. Her bütçeye uygun çözümler.',
        wait: 2250
    },
    {
        selector: '#sss, section[id="sss"], [class*="faq"]',
        title: '📋 SSS Bölümü',
        content: 'Accordion yapısında sık sorulan sorular. Kullanıcı dostu arayüz.',
        wait: 2250
    },
    {
        selector: '[class*="cta"], section:has(button):last-of-type',
        title: '📢 Son Çağrı (CTA)',
        content: 'Harekete geçirici son bölüm. Demo ve kayıt butonları.',
        wait: 2250
    },
    {
        selector: 'footer',
        title: '📍 Footer',
        content: 'İletişim bilgileri, sosyal medya linkleri ve yasal sayfalar.',
        wait: 2250
    },

    // --- FİNAL: İŞLETMELERİ KEŞFET ---
    {
        selector: 'a[href*="/brands"] button, a[href*="/brands"]',
        title: '🔍 İşletmeleri Keşfet',
        content: 'Şimdi işletmeleri keşfedelim! Butona tıklayıp "asil" aratacağız...',
        action: 'click',
        wait: 2000,
        navigateTo: '/tr/brands?sunum=continue'
    }
];

// Brands sayfası için ayrı adımlar
const BRANDS_STEPS = [
    {
        selector: 'input[placeholder*="Hizmet"], input[placeholder*="hizmet"], input[type="search"], input[type="text"]',
        title: '🔎 Arama Alanı',
        content: 'İşletme veya hizmet arayabilirsiniz. Şimdi "asil" yazıyoruz...',
        action: 'type',
        typeText: 'asil',
        wait: 2000
    },
    {
        selector: 'button:has-text("Ara"), button[type="submit"], form button',
        title: '🚀 Ara Butonu',
        content: 'Arama sonuçlarını görelim!',
        action: 'click',
        wait: 2500
    },
    {
        selector: '[class*="card"], [class*="result"], .grid > div',
        title: '🏪 Asil Berber Salonu',
        content: 'İşte arama sonucu! Asil Berber Salonu bulundu.',
        wait: 3000,
        final: true
    }
];

// Export for use in presentation.js
if (typeof window !== 'undefined') {
    window.SUNUM_STEPS = SUNUM_STEPS;
    window.BRANDS_STEPS = BRANDS_STEPS;
}
