import {
    CameraOutlined,
    CrownOutlined,
    EditOutlined,
    MailOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {Head, useForm} from "@inertiajs/react";
import {Avatar, Button, Card, Form, Input, Modal, Tag, Typography, Upload} from "antd";
import {useEffect, useRef, useState} from "react";

const {Title, Paragraph, Text} = Typography;
const ACCEPTED_IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|bmp|avif|heic|heif|tif|tiff)$/i;
const ACCEPTED_IMAGE_MIME_PREFIX = "image/";
const MAX_PROFILE_PHOTO_SIZE_MB = 5;
const PROFILE_PHOTO_FORMAT_HELP = "Format yang diterima: JPG, JPEG, PNG, GIF, WEBP, BMP, AVIF, HEIC, HEIF, TIF, TIFF, dan format gambar lain yang didukung browser.";
const BORDER = "rgba(255, 255, 255, 0.08)";
const SOFT_BORDER = "rgba(255, 255, 255, 0.06)";
const TEXT = "var(--app-color-foreground)";
const MUTED = "var(--app-color-muted)";

const roleConfig = {
    super_admin: {
        label: "Super Admin",
        accent: "#ff7a1a",
        softAccent: "rgba(255, 122, 26, 0.16)",
    },
    kasir: {
        label: "Kasir",
        accent: "#22c55e",
        softAccent: "rgba(34, 197, 94, 0.16)",
    },
    admin_gudang: {
        label: "Admin Gudang",
        accent: "#38bdf8",
        softAccent: "rgba(56, 189, 248, 0.16)",
    },
};

const pageShellStyle = {
    minHeight: "100vh",
    padding: "32px 24px 40px",
    background: "linear-gradient(180deg, #050505 0%, #090909 100%)",
};

const cardStyle = {
    borderRadius: 28,
    border: `1px solid ${BORDER}`,
    background: "linear-gradient(180deg, rgba(16, 16, 16, 0.96) 0%, rgba(8, 8, 8, 0.98) 100%)",
    boxShadow: "0 24px 56px rgba(0, 0, 0, 0.42)",
};

function getRoleMeta(role) {
    return roleConfig[role] ?? {
        label: "Unknown Role",
        accent: "#a3a3a3",
        softAccent: "rgba(163, 163, 163, 0.16)",
    };
}

function getAvatarFallback(name) {
    if (!name) {
        return <UserOutlined/>;
    }

    return name.trim().charAt(0).toUpperCase();
}

function InfoRow({label, value}) {
    return (
        <div
            style={{
                padding: "18px 20px",
                borderRadius: 20,
                border: `1px solid ${SOFT_BORDER}`,
                background: "rgba(255, 255, 255, 0.03)",
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
                    color: "#ffffff",
                    fontSize: 18,
                    lineHeight: 1.4,
                    fontWeight: 700,
                }}
            >
                {value}
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
                <div className="mx-auto max-w-4xl">
                    <Card variant="borderless" style={cardStyle} styles={{body: {padding: 32}}}>
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                    <Avatar
                                        size={104}
                                        src={profile}
                                        icon={!profile ? <UserOutlined/> : undefined}
                                        style={{
                                            backgroundColor: profile ? undefined : "#171717",
                                            color: "#ffffff",
                                            fontSize: 36,
                                        }}
                                    >
                                        {!profile ? getAvatarFallback(name) : null}
                                    </Avatar>

                                    <div>
                                        <Tag
                                            style={{
                                                margin: 0,
                                                border: "none",
                                                borderRadius: 999,
                                                background: roleMeta.softAccent,
                                                color: roleMeta.accent,
                                                fontWeight: 700,
                                                paddingInline: 14,
                                                paddingBlock: 6,
                                            }}
                                        >
                                            <CrownOutlined style={{marginRight: 8}}/>
                                            {roleMeta.label}
                                        </Tag>
                                        <Title level={2} style={{margin: "16px 0 0", color: "#ffffff"}}>
                                            Informasi Akun
                                        </Title>
                                        <Paragraph style={{margin: "10px 0 0", color: MUTED}}>
                                            Halaman ini hanya menampilkan data akun yang aktif.
                                        </Paragraph>
                                    </div>
                                </div>

                                <Button
                                    size="large"
                                    color="primary"
                                    variant="solid"
                                    icon={<EditOutlined/>}
                                    onClick={openEditModal}
                                    style={{height: 46, paddingInline: 20, fontWeight: 700}}
                                >
                                    Edit akun
                                </Button>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <InfoRow label="Nama" value={name || "-"}/>
                                <InfoRow label="Email" value={email || "-"}/>
                                <InfoRow label="Role" value={roleMeta.label}/>
                                <InfoRow label="Avatar" value={profile ? "Tersedia" : "Belum ada"}/>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <Modal
                open={isEditOpen}
                onCancel={closeEditModal}
                footer={null}
                centered
                width={760}
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
                        <Text style={{display: "block", color: "rgba(255, 255, 255, 0.56)", letterSpacing: "0.12em", textTransform: "uppercase"}}>
                            Edit akun
                        </Text>
                        <Title level={3} style={{margin: "12px 0 0", color: "#ffffff"}}>
                            Perbarui informasi akun.
                        </Title>
                    </div>
                }
            >
                <div className="grid gap-0 lg:grid-cols-[0.84fr_1.16fr]">
                    <div
                        className="p-7"
                        style={{
                            borderRight: `1px solid ${SOFT_BORDER}`,
                            background: "linear-gradient(180deg, rgba(255, 106, 0, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%)",
                        }}
                    >
                        <Avatar
                            size={92}
                            src={profilePreview}
                            icon={!profilePreview ? <UserOutlined/> : undefined}
                            style={{
                                backgroundColor: profilePreview ? undefined : "#171717",
                                color: "#ffffff",
                                fontSize: 32,
                            }}
                        >
                            {!profilePreview ? getAvatarFallback(data.name) : null}
                        </Avatar>

                        <Title level={4} style={{margin: "20px 0 0", color: "#ffffff"}}>
                            {data.name || "Your name"}
                        </Title>
                        <Paragraph style={{margin: "8px 0 0", color: MUTED}}>
                            {data.email || "your@email.com"}
                        </Paragraph>
                        <Tag
                            style={{
                                margin: "16px 0 0",
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
                                label={<span style={{color: "rgba(255, 255, 255, 0.84)", fontWeight: 600}}>Foto profil</span>}
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
                                            <CameraOutlined style={{fontSize: 24, color: "var(--app-color-brand)"}}/>
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
