import {
    CameraOutlined,
    CheckCircleFilled,
    CrownOutlined,
    EditOutlined,
    MailOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {Head, useForm} from "@inertiajs/react";
import {Avatar, Button, Card, Form, Input, Modal, Progress, Tag, Typography, Upload} from "antd";
import {useEffect, useMemo, useRef, useState} from "react";

const {Title, Paragraph, Text} = Typography;
const ACCEPTED_IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|bmp|avif|heic|heif|tif|tiff)$/i;
const ACCEPTED_IMAGE_MIME_PREFIX = "image/";
const MAX_PROFILE_PHOTO_SIZE_MB = 5;
const PROFILE_PHOTO_FORMAT_HELP = "Format yang diterima: JPG, JPEG, PNG, GIF, WEBP, BMP, AVIF, HEIC, HEIF, TIF, TIFF, dan format gambar lain yang didukung browser.";
const BRAND = "var(--app-color-brand)";
const TEXT = "var(--app-color-foreground)";
const MUTED = "var(--app-color-muted)";
const BORDER = "rgba(255, 255, 255, 0.08)";
const SOFT_BORDER = "rgba(255, 255, 255, 0.06)";
const SURFACE = "linear-gradient(180deg, rgba(16, 16, 16, 0.96) 0%, rgba(8, 8, 8, 0.98) 100%)";
const INNER_SURFACE = "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)";

const roleConfig = {
    super_admin: {
        label: "Super Admin",
        accent: "#ff7a1a",
        softAccent: "rgba(255, 122, 26, 0.16)",
        summary: "Mengendalikan akses, identitas akun, dan keputusan operasional lintas area sistem.",
    },
    kasir: {
        label: "Kasir",
        accent: "#22c55e",
        softAccent: "rgba(34, 197, 94, 0.16)",
        summary: "Menjaga ritme transaksi tetap cepat, jelas, dan akurat sepanjang operasional harian.",
    },
    admin_gudang: {
        label: "Admin Gudang",
        accent: "#38bdf8",
        softAccent: "rgba(56, 189, 248, 0.16)",
        summary: "Memastikan stok, perpindahan barang, dan data inventori tetap presisi setiap saat.",
    },
};

const pageShellStyle = {
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    padding: "32px 24px 40px",
    background: [
        "radial-gradient(circle at top left, rgba(255, 106, 0, 0.18), transparent 26%)",
        "radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.06), transparent 18%)",
        "linear-gradient(180deg, #050505 0%, #090909 100%)",
    ].join(", "),
};

const panelStyle = {
    borderRadius: 32,
    border: `1px solid ${BORDER}`,
    background: SURFACE,
    boxShadow: "0 24px 56px rgba(0, 0, 0, 0.42)",
    overflow: "hidden",
};

const insetPanelStyle = {
    borderRadius: 24,
    border: `1px solid ${SOFT_BORDER}`,
    background: INNER_SURFACE,
};

function getRoleMeta(role) {
    return roleConfig[role] ?? {
        label: "Unknown Role",
        accent: "#a3a3a3",
        softAccent: "rgba(163, 163, 163, 0.16)",
        summary: "Role belum dikenali oleh dashboard.",
    };
}

function getCompleteness({name, email, profile}) {
    const total = [name, email, profile].filter(Boolean).length;

    return Math.round((total / 3) * 100);
}

function getHealthLabel(score) {
    if (score >= 100) {
        return "Excellent";
    }

    if (score >= 67) {
        return "Strong";
    }

    return "Needs attention";
}

function getAvatarFallback(name) {
    if (!name) {
        return <UserOutlined/>;
    }

    return name.trim().charAt(0).toUpperCase();
}

function SectionEyebrow({children}) {
    return (
        <Text
            style={{
                display: "block",
                color: "rgba(255, 255, 255, 0.56)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
            }}
        >
            {children}
        </Text>
    );
}

function DataField({label, value, helper, accent}) {
    return (
        <div
            style={{
                ...insetPanelStyle,
                padding: 20,
            }}
        >
            <Text
                style={{
                    display: "block",
                    color: "rgba(255, 255, 255, 0.46)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                }}
            >
                {label}
            </Text>
            <Text
                style={{
                    display: "block",
                    marginTop: 10,
                    color: accent ?? TEXT,
                    fontSize: 20,
                    lineHeight: 1.3,
                    fontWeight: 700,
                }}
            >
                {value}
            </Text>
            {helper ? (
                <Text
                    style={{
                        display: "block",
                        marginTop: 10,
                        color: MUTED,
                        lineHeight: 1.7,
                    }}
                >
                    {helper}
                </Text>
            ) : null}
        </div>
    );
}

function SignalCard({label, value, hint, accent}) {
    return (
        <div
            style={{
                ...insetPanelStyle,
                padding: 18,
            }}
        >
            <Text style={{display: "block", color: "rgba(255, 255, 255, 0.5)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase"}}>
                {label}
            </Text>
            <Text style={{display: "block", marginTop: 8, color: accent ?? "#ffffff", fontSize: 22, fontWeight: 700}}>
                {value}
            </Text>
            <Text style={{display: "block", marginTop: 8, color: MUTED, lineHeight: 1.6}}>
                {hint}
            </Text>
        </div>
    );
}

export default function Profile({profile, name, email, role}) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [profilePreview, setProfilePreview] = useState(profile ?? null);
    const [uploadFileList, setUploadFileList] = useState([]);
    const [localUploadError, setLocalUploadError] = useState(null);
    const previewObjectUrlRef = useRef(null);
    const [form] = Form.useForm();

    const {data, setData, patch, processing, errors, clearErrors, transform} = useForm({
        name: name ?? "",
        email: email ?? "",
        profile_photo: null,
    });

    useEffect(() => {
        const nextValues = {
            name: name ?? "",
            email: email ?? "",
            profile_photo: null,
        };

        setData(nextValues);
        form.setFieldsValue({
            name: nextValues.name,
            email: nextValues.email,
        });
        setUploadFileList([]);
        setLocalUploadError(null);
        clearPreviewObjectUrl();
        setProfilePreview(profile ?? null);
    }, [email, form, name, profile, setData]);

    useEffect(() => {
        return () => {
            clearPreviewObjectUrl();
        };
    }, []);

    const roleMeta = getRoleMeta(role);
    const profileHealth = getCompleteness({name, email, profile});
    const profileHealthLabel = getHealthLabel(profileHealth);
    const readinessLabel = profile ? "Avatar tersambung" : "Avatar belum diatur";
    const signalCards = useMemo(() => ([
        {
            label: "Profile health",
            value: `${profileHealth}%`,
            hint: profileHealth === 100 ? "Semua titik identitas utama sudah lengkap." : "Lengkapi avatar agar akun tampil konsisten di seluruh panel.",
            accent: BRAND,
        },
        {
            label: "Access layer",
            value: roleMeta.label,
            hint: "Hak akses mengikuti role aktif pada sesi ini.",
            accent: roleMeta.accent,
        },
        {
            label: "Avatar status",
            value: profile ? "Connected" : "Missing",
            hint: profile ? "Foto profil akan muncul pada navbar dan area identitas." : "Upload foto agar pengenalan akun lebih cepat.",
            accent: profile ? "#22c55e" : "#f59e0b",
        },
    ]), [profile, profileHealth, roleMeta.accent, roleMeta.label]);

    const detailFields = useMemo(() => ([
        {
            label: "Nama lengkap",
            value: name || "Belum diisi",
            helper: "Nama ini dipakai sebagai identitas utama pada area admin dan navigasi akun.",
        },
        {
            label: "Email utama",
            value: email || "Belum diisi",
            helper: "Alamat email menentukan kontak resmi akun dan dipakai untuk sinkronisasi identitas.",
        },
        {
            label: "Role aktif",
            value: roleMeta.label,
            helper: roleMeta.summary,
            accent: roleMeta.accent,
        },
        {
            label: "Status akun",
            value: profileHealthLabel,
            helper: profileHealth >= 67 ? "Struktur identitas akun sudah stabil untuk operasional harian." : "Masih ada elemen identitas yang perlu dilengkapi agar tampil meyakinkan.",
            accent: profileHealth >= 67 ? "#22c55e" : "#f59e0b",
        },
    ]), [email, name, profileHealth, profileHealthLabel, roleMeta]);

    function clearPreviewObjectUrl() {
        if (previewObjectUrlRef.current) {
            URL.revokeObjectURL(previewObjectUrlRef.current);
            previewObjectUrlRef.current = null;
        }
    }

    function resetPhotoSelection(nextPreview = profile ?? null) {
        clearPreviewObjectUrl();
        setUploadFileList([]);
        setLocalUploadError(null);
        setProfilePreview(nextPreview);
        setData("profile_photo", null);
    }

    function updatePhotoPreview(file) {
        clearPreviewObjectUrl();

        const objectUrl = URL.createObjectURL(file);

        previewObjectUrlRef.current = objectUrl;
        setProfilePreview(objectUrl);
    }

    function isAcceptedImage(file) {
        if (file.type && file.type.toLowerCase().startsWith(ACCEPTED_IMAGE_MIME_PREFIX)) {
            return true;
        }

        return ACCEPTED_IMAGE_EXTENSIONS.test(file.name);
    }

    const openEditModal = () => {
        const nextValues = {
            name: name ?? "",
            email: email ?? "",
            profile_photo: null,
        };

        clearErrors();
        setData(nextValues);
        form.setFieldsValue({
            name: nextValues.name,
            email: nextValues.email,
        });
        resetPhotoSelection(profile ?? null);
        setIsEditOpen(true);
    };

    const closeEditModal = () => {
        clearErrors();
        resetPhotoSelection(profile ?? null);
        setIsEditOpen(false);
    };

    const handleValuesChange = (_, allValues) => {
        setData((currentData) => ({
            ...currentData,
            ...allValues,
        }));
    };

    const handleBeforeUpload = (file) => {
        if (!isAcceptedImage(file)) {
            setLocalUploadError("Gunakan file foto/gambar seperti JPG, JPEG, PNG, GIF, WEBP, BMP, AVIF, HEIC, HEIF, TIF, atau TIFF.");
            return Upload.LIST_IGNORE;
        }

        if ((file.size / 1024 / 1024) > MAX_PROFILE_PHOTO_SIZE_MB) {
            setLocalUploadError(`Ukuran foto maksimal ${MAX_PROFILE_PHOTO_SIZE_MB} MB.`);
            return Upload.LIST_IGNORE;
        }

        setLocalUploadError(null);
        return false;
    };

    const handleUploadChange = ({fileList: nextFileList}) => {
        const latestFile = nextFileList.at(-1);

        if (!latestFile) {
            resetPhotoSelection(profile ?? null);
            return;
        }

        const nextFile = latestFile.originFileObj ?? latestFile;

        setUploadFileList([latestFile]);

        if (nextFile instanceof File) {
            setLocalUploadError(null);
            setData("profile_photo", nextFile);
            updatePhotoPreview(nextFile);
        }
    };

    const handleRemoveUpload = () => {
        resetPhotoSelection(profile ?? null);
        return true;
    };

    const handleSubmit = (values) => {
        transform((currentData) => ({
            ...currentData,
            ...values,
        }));

        patch("/super-admin/profile", {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                clearErrors();
                resetPhotoSelection(profile ?? null);
                setIsEditOpen(false);
            },
        });
    };

    return (
        <>
            <Head title="Super Admin Profile"/>

            <div style={pageShellStyle}>
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                        maskImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.86), transparent 94%)",
                    }}
                />

                <div className="relative mx-auto flex max-w-7xl flex-col gap-6">
                    <Card variant="borderless" style={panelStyle} styles={{body: {padding: 0}}}>
                        <div className="grid gap-0 xl:grid-cols-[1.35fr_0.9fr]">
                            <div className="relative overflow-hidden p-8 md:p-10 xl:p-12">
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "radial-gradient(circle at 20% 10%, rgba(255, 106, 0, 0.18), transparent 26%)",
                                        pointerEvents: "none",
                                    }}
                                />
                                <div className="relative flex flex-col gap-8">
                                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                                            <div
                                                style={{
                                                    padding: 8,
                                                    borderRadius: 999,
                                                    background: `linear-gradient(135deg, ${roleMeta.softAccent}, rgba(255, 255, 255, 0.06))`,
                                                    boxShadow: "0 20px 48px rgba(0, 0, 0, 0.28)",
                                                }}
                                            >
                                                <Avatar
                                                    size={118}
                                                    src={profile}
                                                    icon={!profile ? <UserOutlined/> : undefined}
                                                    style={{
                                                        backgroundColor: profile ? undefined : "#171717",
                                                        color: "#ffffff",
                                                        fontSize: 40,
                                                    }}
                                                >
                                                    {!profile ? getAvatarFallback(name) : null}
                                                </Avatar>
                                            </div>

                                            <div className="max-w-2xl">
                                                <SectionEyebrow>Profile command center</SectionEyebrow>
                                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                                    <Tag
                                                        style={{
                                                            margin: 0,
                                                            borderColor: "transparent",
                                                            borderRadius: 999,
                                                            background: roleMeta.softAccent,
                                                            color: roleMeta.accent,
                                                            fontWeight: 700,
                                                            paddingInline: 14,
                                                            paddingBlock: 7,
                                                        }}
                                                    >
                                                        <CrownOutlined style={{marginRight: 8}}/>
                                                        {roleMeta.label}
                                                    </Tag>
                                                    <Tag
                                                        style={{
                                                            margin: 0,
                                                            borderColor: SOFT_BORDER,
                                                            borderRadius: 999,
                                                            background: "rgba(255, 255, 255, 0.03)",
                                                            color: "rgba(255, 255, 255, 0.76)",
                                                            fontWeight: 700,
                                                            paddingInline: 14,
                                                            paddingBlock: 7,
                                                        }}
                                                    >
                                                        <SafetyCertificateOutlined style={{marginRight: 8}}/>
                                                        {profileHealthLabel}
                                                    </Tag>
                                                </div>
                                                <Title
                                                    level={1}
                                                    style={{
                                                        margin: "18px 0 0",
                                                        color: "#ffffff",
                                                        fontSize: "clamp(2.4rem, 4vw, 4rem)",
                                                        lineHeight: 0.98,
                                                        letterSpacing: "-0.05em",
                                                    }}
                                                >
                                                    {name}
                                                </Title>
                                                <Paragraph
                                                    style={{
                                                        margin: "18px 0 0",
                                                        maxWidth: 720,
                                                        color: "rgba(255, 255, 255, 0.7)",
                                                        fontSize: 16,
                                                        lineHeight: 1.8,
                                                    }}
                                                >
                                                    {roleMeta.summary} Halaman ini merangkum kualitas identitas akun, kesiapan avatar, dan jalur edit yang dipakai di seluruh area super admin.
                                                </Paragraph>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3 lg:max-w-xs lg:justify-end">
                                            <Button
                                                size="large"
                                                color="primary"
                                                variant="solid"
                                                icon={<EditOutlined/>}
                                                onClick={openEditModal}
                                                style={{height: 48, paddingInline: 20, fontWeight: 700}}
                                            >
                                                Edit profile
                                            </Button>
                                            <Button
                                                size="large"
                                                href={`mailto:${email}`}
                                                icon={<MailOutlined/>}
                                                style={{
                                                    height: 48,
                                                    paddingInline: 20,
                                                    borderColor: BORDER,
                                                    color: TEXT,
                                                    background: "rgba(255, 255, 255, 0.03)",
                                                }}
                                            >
                                                Email account
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-3">
                                        {signalCards.map((signal) => (
                                            <SignalCard
                                                key={signal.label}
                                                label={signal.label}
                                                value={signal.value}
                                                hint={signal.hint}
                                                accent={signal.accent}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    borderLeft: `1px solid ${SOFT_BORDER}`,
                                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
                                }}
                                className="p-8 md:p-10"
                            >
                                <div className="flex h-full flex-col gap-6">
                                    <div>
                                        <SectionEyebrow>Signal strength</SectionEyebrow>
                                        <Title level={3} style={{margin: "16px 0 10px", color: "#ffffff"}}>
                                            Identitas akun harus terbaca cepat.
                                        </Title>
                                        <Paragraph style={{margin: 0, color: MUTED, lineHeight: 1.8}}>
                                            Nama, email, dan avatar adalah tiga penanda yang paling sering muncul di permukaan produk. Saat salah satunya kosong, kualitas persepsi akun turun.
                                        </Paragraph>
                                    </div>

                                    <div
                                        style={{
                                            ...insetPanelStyle,
                                            padding: 24,
                                        }}
                                        className="flex flex-col gap-5"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <Text style={{display: "block", color: "rgba(255, 255, 255, 0.5)", letterSpacing: "0.08em", textTransform: "uppercase"}}>
                                                    Readiness score
                                                </Text>
                                                <Text style={{display: "block", marginTop: 8, color: "#ffffff", fontSize: 28, fontWeight: 700}}>
                                                    {profileHealthLabel}
                                                </Text>
                                            </div>
                                            <Progress
                                                type="circle"
                                                percent={profileHealth}
                                                size={92}
                                                strokeColor={roleMeta.accent}
                                                trailColor="rgba(255, 255, 255, 0.08)"
                                                format={(value) => `${value}%`}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <div className="flex items-start gap-3">
                                                <CheckCircleFilled style={{marginTop: 4, color: name ? "#22c55e" : "#f59e0b"}}/>
                                                <div>
                                                    <Text style={{display: "block", color: "#ffffff", fontWeight: 600}}>Nama tampil utama</Text>
                                                    <Text style={{display: "block", color: MUTED, lineHeight: 1.7}}>Dipakai pada panel admin, dropdown akun, dan area identitas utama.</Text>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircleFilled style={{marginTop: 4, color: email ? "#22c55e" : "#f59e0b"}}/>
                                                <div>
                                                    <Text style={{display: "block", color: "#ffffff", fontWeight: 600}}>Email siap kontak</Text>
                                                    <Text style={{display: "block", color: MUTED, lineHeight: 1.7}}>Alamat email dipakai sebagai referensi resmi akun untuk komunikasi.</Text>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircleFilled style={{marginTop: 4, color: profile ? "#22c55e" : "#f59e0b"}}/>
                                                <div>
                                                    <Text style={{display: "block", color: "#ffffff", fontWeight: 600}}>Avatar surface state</Text>
                                                    <Text style={{display: "block", color: MUTED, lineHeight: 1.7}}>{readinessLabel}. Avatar membantu pengenalan cepat pada navigasi atas.</Text>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            ...insetPanelStyle,
                                            padding: 22,
                                        }}
                                    >
                                        <Text style={{display: "block", color: "rgba(255, 255, 255, 0.5)", letterSpacing: "0.08em", textTransform: "uppercase"}}>
                                            Current surface
                                        </Text>
                                        <div className="mt-4 flex items-center gap-4 rounded-[22px] border border-white/8 bg-white/5 p-4">
                                            <Avatar
                                                size={64}
                                                src={profile}
                                                icon={!profile ? <UserOutlined/> : undefined}
                                                style={{backgroundColor: profile ? undefined : "#171717", color: "#ffffff", fontSize: 26}}
                                            >
                                                {!profile ? getAvatarFallback(name) : null}
                                            </Avatar>
                                            <div className="min-w-0">
                                                <Text style={{display: "block", color: "#ffffff", fontSize: 17, fontWeight: 700}}>{name}</Text>
                                                <Text style={{display: "block", marginTop: 4, color: MUTED}}>{email}</Text>
                                                <Text style={{display: "block", marginTop: 6, color: roleMeta.accent, fontWeight: 600}}>{roleMeta.label}</Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                        <Card
                            title={<span style={{color: "#ffffff", fontWeight: 700}}>Identity matrix</span>}
                            extra={
                                <Button type="text" icon={<EditOutlined/>} onClick={openEditModal} style={{color: BRAND, fontWeight: 600}}>
                                    Ubah data
                                </Button>
                            }
                            variant="borderless"
                            style={panelStyle}
                            styles={{
                                header: {
                                    minHeight: 76,
                                    borderBottom: `1px solid ${SOFT_BORDER}`,
                                    display: "flex",
                                    alignItems: "center",
                                },
                                body: {
                                    padding: 28,
                                },
                            }}
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                {detailFields.map((field) => (
                                    <DataField
                                        key={field.label}
                                        label={field.label}
                                        value={field.value}
                                        helper={field.helper}
                                        accent={field.accent}
                                    />
                                ))}
                            </div>
                        </Card>

                        <div className="grid gap-6">
                            <Card variant="borderless" style={panelStyle} styles={{body: {padding: 28}}}>
                                <SectionEyebrow>Preview strip</SectionEyebrow>
                                <Title level={3} style={{margin: "16px 0 10px", color: "#ffffff"}}>
                                    Cara akun muncul di permukaan produk.
                                </Title>
                                <Paragraph style={{margin: 0, color: MUTED, lineHeight: 1.8}}>
                                    Tujuannya sederhana: identitas terbaca dalam beberapa detik tanpa perlu membuka detail akun.
                                </Paragraph>

                                <div className="mt-6 grid gap-4">
                                    <div style={{...insetPanelStyle, padding: 18}}>
                                        <Text style={{display: "block", color: "rgba(255, 255, 255, 0.46)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase"}}>
                                            Navbar identity
                                        </Text>
                                        <div className="mt-4 flex items-center justify-between gap-4 rounded-[20px] border border-white/8 bg-black/20 px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    size={48}
                                                    src={profile}
                                                    icon={!profile ? <UserOutlined/> : undefined}
                                                    style={{backgroundColor: profile ? undefined : "#171717", color: "#ffffff"}}
                                                >
                                                    {!profile ? getAvatarFallback(name) : null}
                                                </Avatar>
                                                <div>
                                                    <Text style={{display: "block", color: "#ffffff", fontWeight: 700}}>{name}</Text>
                                                    <Text style={{display: "block", color: MUTED}}>{roleMeta.label}</Text>
                                                </div>
                                            </div>
                                            <Tag style={{margin: 0, border: "none", borderRadius: 999, background: roleMeta.softAccent, color: roleMeta.accent, fontWeight: 700}}>
                                                Active
                                            </Tag>
                                        </div>
                                    </div>

                                    <div style={{...insetPanelStyle, padding: 18}}>
                                        <Text style={{display: "block", color: "rgba(255, 255, 255, 0.46)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase"}}>
                                            Profile guidance
                                        </Text>
                                        <div className="mt-4 grid gap-3">
                                            <div className="rounded-[18px] border border-white/8 bg-white/4 p-4">
                                                <Text style={{display: "block", color: "#ffffff", fontWeight: 700}}>Gunakan nama yang konsisten</Text>
                                                <Text style={{display: "block", marginTop: 8, color: MUTED, lineHeight: 1.7}}>Hindari variasi nama antar halaman agar akun mudah dikenali oleh tim operasional.</Text>
                                            </div>
                                            <div className="rounded-[18px] border border-white/8 bg-white/4 p-4">
                                                <Text style={{display: "block", color: "#ffffff", fontWeight: 700}}>Pilih avatar yang jelas</Text>
                                                <Text style={{display: "block", marginTop: 8, color: MUTED, lineHeight: 1.7}}>Foto dengan framing rapat dan kontras baik mempercepat identifikasi pada navbar yang padat.</Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={isEditOpen}
                onCancel={closeEditModal}
                footer={null}
                centered
                width={860}
                destroyOnHidden
                mask={{blur: true, closable: true}}
                styles={{
                    content: {
                        padding: 0,
                        overflow: "hidden",
                        background: "linear-gradient(180deg, rgba(15, 15, 15, 0.99) 0%, rgba(9, 9, 9, 0.99) 100%)",
                        border: `1px solid ${BORDER}`,
                        boxShadow: "0 28px 70px rgba(0, 0, 0, 0.56)",
                    },
                    header: {
                        margin: 0,
                        padding: "24px 28px 20px",
                        background: "transparent",
                        borderBottom: `1px solid ${SOFT_BORDER}`,
                    },
                    body: {
                        padding: 0,
                    },
                }}
                title={
                    <div>
                        <SectionEyebrow>Edit profile</SectionEyebrow>
                        <Title level={3} style={{margin: "12px 0 0", color: "#ffffff"}}>
                            Rapikan identitas akun tanpa mengubah alur kerja.
                        </Title>
                    </div>
                }
            >
                <div className="grid gap-0 lg:grid-cols-[0.88fr_1.12fr]">
                    <div
                        style={{
                            borderRight: `1px solid ${SOFT_BORDER}`,
                            background: "linear-gradient(180deg, rgba(255, 106, 0, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%)",
                        }}
                        className="p-7"
                    >
                        <SectionEyebrow>Live preview</SectionEyebrow>
                        <div style={{...insetPanelStyle, marginTop: 18, padding: 22}}>
                            <div className="flex items-center gap-4">
                                <Avatar
                                    size={88}
                                    src={profilePreview}
                                    icon={!profilePreview ? <UserOutlined/> : undefined}
                                    style={{backgroundColor: profilePreview ? undefined : "#171717", color: "#ffffff", fontSize: 30}}
                                >
                                    {!profilePreview ? getAvatarFallback(data.name) : null}
                                </Avatar>
                                <div className="min-w-0">
                                    <Text style={{display: "block", color: "#ffffff", fontSize: 20, fontWeight: 700}}>
                                        {data.name || "Your name"}
                                    </Text>
                                    <Text style={{display: "block", marginTop: 6, color: MUTED}}>
                                        {data.email || "your@email.com"}
                                    </Text>
                                    <Tag
                                        style={{
                                            margin: "12px 0 0",
                                            border: "none",
                                            borderRadius: 999,
                                            background: roleMeta.softAccent,
                                            color: roleMeta.accent,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {roleMeta.label}
                                    </Tag>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-3">
                            <div style={{...insetPanelStyle, padding: 16}}>
                                <Text style={{display: "block", color: "#ffffff", fontWeight: 700}}>Kualitas tampilan</Text>
                                <Text style={{display: "block", marginTop: 8, color: MUTED, lineHeight: 1.7}}>
                                    Nama dan avatar baru akan menggantikan identitas lama setelah perubahan disimpan berhasil.
                                </Text>
                            </div>
                            <div style={{...insetPanelStyle, padding: 16}}>
                                <Text style={{display: "block", color: "#ffffff", fontWeight: 700}}>Panduan upload</Text>
                                <Text style={{display: "block", marginTop: 8, color: MUTED, lineHeight: 1.7}}>
                                    Gunakan foto persegi atau potret dengan subjek jelas agar hasil crop avatar tetap terbaca pada ukuran kecil.
                                </Text>
                            </div>
                        </div>
                    </div>

                    <div className="p-7">
                        <Form
                            form={form}
                            layout="vertical"
                            requiredMark={false}
                            size="large"
                            variant="filled"
                            onFinish={handleSubmit}
                            onValuesChange={handleValuesChange}
                            initialValues={data}
                            scrollToFirstError={{focus: true}}
                        >
                            <Form.Item
                                label={<span style={{color: "rgba(255, 255, 255, 0.84)", fontWeight: 600}}>Nama lengkap</span>}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Nama wajib diisi.",
                                    },
                                ]}
                                validateStatus={errors.name ? "error" : ""}
                                help={errors.name}
                            >
                                <Input allowClear maxLength={255} placeholder="Masukkan nama lengkap"/>
                            </Form.Item>

                            <Form.Item
                                label={<span style={{color: "rgba(255, 255, 255, 0.84)", fontWeight: 600}}>Email</span>}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Email wajib diisi.",
                                    },
                                    {
                                        type: "email",
                                        message: "Format email tidak valid.",
                                    },
                                ]}
                                validateStatus={errors.email ? "error" : ""}
                                help={errors.email}
                            >
                                <Input
                                    allowClear
                                    maxLength={255}
                                    placeholder="Masukkan alamat email"
                                    prefix={<MailOutlined style={{color: "rgba(255,255,255,0.34)"}}/>}
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span style={{color: "rgba(255, 255, 255, 0.84)", fontWeight: 600}}>File avatar</span>}
                                extra={<span style={{color: "rgba(255, 255, 255, 0.46)"}}>{PROFILE_PHOTO_FORMAT_HELP} Maksimal {MAX_PROFILE_PHOTO_SIZE_MB} MB.</span>}
                                validateStatus={errors.profile_photo || localUploadError ? "error" : ""}
                                help={errors.profile_photo ?? localUploadError}
                            >
                                <Upload
                                    accept="image/*,.jpg,.jpeg,.png,.gif,.webp,.bmp,.avif,.heic,.heif,.tif,.tiff"
                                    beforeUpload={handleBeforeUpload}
                                    fileList={uploadFileList}
                                    listType="picture-card"
                                    maxCount={1}
                                    onChange={handleUploadChange}
                                    onRemove={handleRemoveUpload}
                                    showUploadList={{showPreviewIcon: false}}
                                >
                                    {uploadFileList.length < 1 ? (
                                        <div style={{paddingInline: 10}}>
                                            <CameraOutlined style={{fontSize: 24, color: BRAND}}/>
                                            <div style={{marginTop: 12, color: "#ffffff", fontWeight: 600}}>Upload photo</div>
                                        </div>
                                    ) : null}
                                </Upload>
                            </Form.Item>

                            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <Button
                                    size="large"
                                    onClick={closeEditModal}
                                    style={{
                                        minWidth: 130,
                                        borderColor: BORDER,
                                        color: TEXT,
                                        background: "rgba(255, 255, 255, 0.03)",
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    htmlType="submit"
                                    size="large"
                                    color="primary"
                                    variant="solid"
                                    loading={processing}
                                    icon={<EditOutlined/>}
                                    style={{minWidth: 170, fontWeight: 700}}
                                >
                                    Save changes
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal>
        </>
    );
}
