export interface Metric {
    label: string;
    description: string;
}

export const METRICS: Metric[] = [
    {
        label: 'Kayıp Zamanı Kazanca Dönüştürün',
        description: 'Otomatik SMS ve WhatsApp hatırlatıcıları ile gelmeyen müşteri (no-show) oranını %65 azaltın.',
    },
    {
        label: 'Sıfır Hata, Kusursuz Planlama',
        description: 'Akıllı çakışma önleyici algoritma ile personel ve oda müsaitliğini saniyeler içinde optimize edin.',
    },
    {
        label: 'Anında Aktivasyon',
        description: 'Karmakarışık kurulum süreçlerine veda edin. Dakikalar içinde tüm şubelerinizle dijitale geçin.',
    },
];
