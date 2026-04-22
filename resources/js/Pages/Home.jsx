import {Head} from "@inertiajs/react";
import {
    AppstoreOutlined,
    ArrowRightOutlined,
    AuditOutlined,
    BarChartOutlined,
    CheckCircleOutlined,
    CloudSyncOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    LoginOutlined,
    SafetyCertificateOutlined,
    ShoppingCartOutlined,
    StockOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import {Button, Card, Layout, Space, Statistic, Tag, Typography} from "antd";

const {Header, Content, Footer} = Layout;
const {Title, Paragraph, Text} = Typography;

const metrics = [
    {title: "Transaksi harian", value: 1280, suffix: "+"},
    {title: "Stok terpantau", value: 3400, suffix: " SKU"},
    {title: "Laporan aktif", value: 18, suffix: " modul"},
];

const features = [
    {
        icon: <ShoppingCartOutlined/>,
        title: "Kasir cepat",
        description: "Alur penjualan dibuat ringkas untuk transaksi koperasi, toko, dan unit usaha.",
    },
    {
        icon: <DatabaseOutlined/>,
        title: "Inventori rapi",
        description: "Produk, stok masuk, stok keluar, dan pergerakan barang terlihat dalam satu sistem.",
    },
    {
        icon: <BarChartOutlined/>,
        title: "Laporan jelas",
        description: "Pantau penjualan, performa kasir, dan kondisi stok tanpa rekap manual berulang.",
    },
    {
        icon: <TeamOutlined/>,
        title: "Role operasional",
        description: "Akses super admin, kasir, dan admin gudang dipisah sesuai tanggung jawab kerja.",
    },
];

const workflow = [
    "Input produk dan stok awal",
    "Kasir memproses transaksi",
    "Gudang memantau pergerakan stok",
    "Owner membaca laporan penjualan",
];

const roleHighlights = [
    {
        icon: <SafetyCertificateOutlined/>,
        role: "Super Admin",
        title: "Kontrol penuh untuk pemilik usaha",
        items: ["Pantau penjualan", "Kelola user", "Baca performa toko"],
    },
    {
        icon: <ShoppingCartOutlined/>,
        role: "Kasir",
        title: "Transaksi cepat di meja penjualan",
        items: ["Input pesanan", "Hitung pembayaran", "Cetak ringkasan"],
    },
    {
        icon: <DatabaseOutlined/>,
        role: "Admin Gudang",
        title: "Stok masuk dan keluar lebih mudah dilacak",
        items: ["Kelola produk", "Catat stok", "Pantau ketersediaan"],
    },
];

const modules = [
    {icon: <ShoppingCartOutlined/>, label: "Transaksi kasir"},
    {icon: <DatabaseOutlined/>, label: "Produk dan stok"},
    {icon: <BarChartOutlined/>, label: "Laporan penjualan"},
    {icon: <TeamOutlined/>, label: "Akses pengguna"},
    {icon: <AuditOutlined/>, label: "Riwayat aktivitas"},
    {icon: <CloudSyncOutlined/>, label: "Operasional terpusat"},
];

const footerGroups = [
    {
        title: "Produk",
        links: [
            {label: "Fitur", href: "#fitur"},
            {label: "Solusi", href: "#solusi"},
            {label: "Modul", href: "#modul"},
        ],
    },
    {
        title: "Operasional",
        links: [
            {label: "Alur kerja", href: "#alur"},
            {label: "Keamanan", href: "#keamanan"},
            {label: "Login dashboard", href: "/login"},
        ],
    },
    {
        title: "Kontak",
        links: [
            {label: "SatriaCorp", href: "#"},
            {label: "Point of Sale", href: "#"},
            {label: "Koperasi dan toko", href: "#"},
        ],
    },
];

export default function Home() {
    return (
        <>
            <Head title="SatriaPOS - Point of Sale Koperasi"/>

            <Layout className="landing-page font-sans">
                <Header className="landing-header flex items-center justify-between">
                    <a className="landing-brand" href="/" aria-label="SatriaPOS">
                        <img src="/images/logo-satria.png" alt="SatriaPOS"/>
                        <span>Satria<span>POS</span></span>
                    </a>

                    <nav className="landing-nav items-center" aria-label="Navigasi landing page">
                        <a href="#fitur">Fitur</a>
                        <a href="#solusi">Solusi</a>
                        <a href="#modul">Modul</a>
                        <a href="#alur">Alur</a>
                    </nav>

                    <Button href="/login" type="primary" icon={<LoginOutlined/>} className="landing-header-action">
                        Masuk
                    </Button>
                </Header>

                <Content>
                    <section className="landing-hero">
                        <div className="landing-hero-scene" aria-hidden="true">
                            <div className="landing-dashboard">
                                <div className="landing-dashboard-bar">
                                    <div>
                                        <span/>
                                        <span/>
                                        <span/>
                                    </div>
                                    <strong>SatriaPOS Live</strong>
                                </div>

                                <div className="landing-dashboard-grid">
                                    <div className="landing-sale-panel">
                                        <div className="landing-panel-heading">
                                            <ShoppingCartOutlined/>
                                            <span>Transaksi</span>
                                        </div>
                                        <strong>Rp 8.420.000</strong>
                                        <div className="landing-progress">
                                            <span style={{width: "72%"}}/>
                                        </div>
                                    </div>

                                    <div className="landing-stock-panel">
                                        <div className="landing-panel-heading">
                                            <StockOutlined/>
                                            <span>Stok</span>
                                        </div>
                                        <div className="landing-stock-bars">
                                            <span style={{height: "62%"}}/>
                                            <span style={{height: "84%"}}/>
                                            <span style={{height: "48%"}}/>
                                            <span style={{height: "76%"}}/>
                                            <span style={{height: "58%"}}/>
                                        </div>
                                    </div>

                                    <div className="landing-role-panel">
                                        <div className="landing-role-chip">
                                            <SafetyCertificateOutlined/>
                                            Super Admin
                                        </div>
                                        <div className="landing-role-chip">
                                            <ShoppingCartOutlined/>
                                            Kasir
                                        </div>
                                        <div className="landing-role-chip">
                                            <DatabaseOutlined/>
                                            Gudang
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="landing-container landing-hero-content grid">
                            <div className="landing-hero-copy">
                                <Space size={[10, 10]} wrap>
                                    <Tag color="success" variant="outlined" icon={<CheckCircleOutlined/>}>
                                        Sistem POS koperasi
                                    </Tag>
                                    <Tag color="processing" variant="outlined" icon={<CloudSyncOutlined/>}>
                                        Dashboard operasional
                                    </Tag>
                                </Space>

                                <Title level={1}>
                                    Kasir, stok, dan laporan dalam satu dashboard yang rapi.
                                </Title>

                                <Paragraph>
                                    SatriaPOS membantu toko dan koperasi memproses transaksi lebih cepat,
                                    menjaga stok tetap terpantau, dan membaca laporan tanpa rekap manual.
                                </Paragraph>

                                <div className="landing-hero-actions flex flex-wrap">
                                    <Button
                                        href="/login"
                                        type="primary"
                                        size="large"
                                        icon={<LoginOutlined/>}
                                        className="landing-action-button"
                                    >
                                        Mulai masuk
                                    </Button>
                                    <Button
                                        href="#fitur"
                                        size="large"
                                        icon={<ArrowRightOutlined/>}
                                        iconPlacement="end"
                                        className="landing-action-button"
                                    >
                                        Lihat fitur
                                    </Button>
                                </div>

                                <div className="landing-hero-checks">
                                    <span><CheckCircleOutlined/> Role akses jelas</span>
                                    <span><CheckCircleOutlined/> Tampilan responsif</span>
                                    <span><CheckCircleOutlined/> Fokus operasional harian</span>
                                </div>
                            </div>

                            <div className="landing-metrics grid">
                                {metrics.map((metric) => (
                                    <Statistic
                                        key={metric.title}
                                        className="landing-statistic"
                                        title={metric.title}
                                        value={metric.value}
                                        suffix={metric.suffix}
                                        styles={{content: {color: "#ffffff"}}}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="solusi" className="landing-section landing-section-alt">
                        <div className="landing-container">
                            <div className="landing-section-heading">
                                <Tag color="cyan" variant="outlined" icon={<TeamOutlined/>}>
                                    Solusi per role
                                </Tag>
                                <Title level={2}>Setiap tim melihat hal yang mereka butuhkan.</Title>
                                <Paragraph>
                                    Tampilan dan tanggung jawab dibagi agar pekerjaan kasir, gudang,
                                    dan pengelola tidak saling bercampur.
                                </Paragraph>
                            </div>

                            <div className="landing-role-grid grid">
                                {roleHighlights.map((role) => (
                                    <Card
                                        key={role.role}
                                        className="landing-role-card"
                                        variant="outlined"
                                        hoverable
                                    >
                                        <div className="landing-role-card-top">
                                            <div className="landing-feature-icon">{role.icon}</div>
                                            <Tag color="orange" variant="outlined">{role.role}</Tag>
                                        </div>
                                        <Title level={3}>{role.title}</Title>
                                        <div className="landing-role-list">
                                            {role.items.map((item) => (
                                                <Text key={item} className="landing-role-list-text">
                                                    <CheckCircleOutlined/>
                                                    {item}
                                                </Text>
                                            ))}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="fitur" className="landing-section">
                        <div className="landing-container">
                            <div className="landing-section-heading">
                                <Tag color="orange" variant="outlined" icon={<DashboardOutlined/>}>
                                    Fitur inti
                                </Tag>
                                <Title level={2}>Dibuat untuk alur kerja harian</Title>
                                <Paragraph>
                                    Setiap bagian fokus pada pekerjaan yang sering terjadi di meja kasir,
                                    gudang, dan dashboard pengelola.
                                </Paragraph>
                            </div>

                            <div className="landing-feature-grid grid">
                                {features.map((feature) => (
                                    <Card
                                        key={feature.title}
                                        className="landing-feature-card"
                                        variant="outlined"
                                        hoverable
                                    >
                                        <div className="landing-feature-icon">{feature.icon}</div>
                                        <Title level={3}>{feature.title}</Title>
                                        <Paragraph>{feature.description}</Paragraph>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="modul" className="landing-section landing-module-section">
                        <div className="landing-container landing-modules">
                            <div className="landing-section-heading is-left">
                                <Tag color="purple" variant="outlined" icon={<AppstoreOutlined/>}>
                                    Modul sistem
                                </Tag>
                                <Title level={2}>Komponen inti untuk menjalankan operasional toko.</Title>
                                <Paragraph>
                                    Modul dibuat ringkas agar mudah dikembangkan menjadi fitur produksi,
                                    pembelian, membership, atau multi-cabang saat dibutuhkan.
                                </Paragraph>
                            </div>

                            <div className="landing-module-grid grid">
                                {modules.map((module) => (
                                    <div className="landing-module-item" key={module.label}>
                                        {module.icon}
                                        <Text className="landing-module-label">{module.label}</Text>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="alur" className="landing-section landing-section-alt">
                        <div className="landing-container landing-workflow grid">
                            <div className="landing-section-heading is-left">
                                <Tag color="cyan" variant="outlined" icon={<CloudSyncOutlined/>}>
                                    Alur operasional
                                </Tag>
                                <Title level={2}>Dari stok masuk sampai laporan selesai.</Title>
                                <Paragraph>
                                    SatriaPOS menyatukan data transaksi dan gudang agar setiap keputusan
                                    tidak lagi bergantung pada catatan terpisah.
                                </Paragraph>
                            </div>

                            <div className="landing-timeline grid">
                                {workflow.map((item, index) => (
                                    <div className="landing-timeline-item" key={item}>
                                        <span>{String(index + 1).padStart(2, "0")}</span>
                                        <Text className="landing-timeline-text">{item}</Text>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="keamanan" className="landing-section">
                        <div className="landing-container">
                            <Card className="landing-cta" variant="outlined">
                                <div className="landing-cta-inner">
                                    <div>
                                        <Tag color="green" variant="outlined" icon={<SafetyCertificateOutlined/>}>
                                            Role based access
                                        </Tag>
                                        <Title level={2}>Akses tim tetap terkontrol.</Title>
                                        <Paragraph>
                                            Pisahkan hak akses super admin, kasir, dan admin gudang agar pekerjaan
                                            harian lebih aman dan data tetap sesuai tanggung jawab.
                                        </Paragraph>
                                    </div>

                                    <Button
                                        href="/login"
                                        type="primary"
                                        size="large"
                                        icon={<LoginOutlined/>}
                                        className="landing-action-button"
                                    >
                                        Masuk dashboard
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </section>
                </Content>

                <Footer className="landing-footer">
                    <div className="landing-container landing-footer-grid grid">
                        <div className="landing-footer-brand">
                            <a className="landing-brand" href="/" aria-label="SatriaPOS">
                                <img src="/images/logo-satria.png" alt="SatriaPOS"/>
                                <span>Satria<span>POS</span></span>
                            </a>
                            <Paragraph>
                                Point of sale modern untuk koperasi, toko, dan unit usaha yang butuh
                                transaksi cepat serta stok yang mudah dipantau.
                            </Paragraph>
                        </div>

                        {footerGroups.map((group) => (
                            <div className="landing-footer-group" key={group.title}>
                                <strong>{group.title}</strong>
                                {group.links.map((link) => (
                                    <a href={link.href} key={link.label}>{link.label}</a>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="landing-container landing-footer-bottom">
                        <Text>SatriaPOS by SatriaCorp</Text>
                        <Text>Designed for koperasi operations</Text>
                    </div>
                </Footer>
            </Layout>
        </>
    );
}
