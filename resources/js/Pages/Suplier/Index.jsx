import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Head, router, usePage } from "@inertiajs/react";
import { Button, Col, Empty, Input, Modal, Row, Space, Table, Tag, Typography, message } from "antd";
import { useState } from "react";
import { AddSuplierModal } from "../../Components/Suplier/AddSuplierModal.jsx";
import { LayoutAdminGudang } from "../../Layouts/LayoutAdminGudang.jsx";
import { LayoutSuperAdmin } from "../../Layouts/LayoutSuperAdmin.jsx";

const { Title, Text } = Typography;

export default function SuplierIndex({ supliers, filters }) {
    const { auth } = usePage().props;
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedSuplier, setSelectedSuplier] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const totalSupliers = supliers?.total ?? 0;
    const activeSearch = filters.search ?? "";
    const roleLabel = auth?.role === "admin_gudang" ? "Admin Gudang" : "Super Admin";

    const handleSearch = (value) => {
        router.get(
            "/suplier",
            {
                ...filters,
                search: value,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleOpenEditModal = (suplier) => {
        setSelectedSuplier(suplier);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedSuplier(null);
    };

    const handleDeleteSuplier = (suplier) => {
        Modal.confirm({
            title: "Hapus suplier ini?",
            icon: <ExclamationCircleFilled style={{ color: "#ff6a00" }} />,
            content: `Data ${suplier.name} akan dihapus permanen.`,
            okText: "Ya, hapus",
            cancelText: "Batal",
            okButtonProps: {
                danger: true,
            },
            onOk: () =>
                router.delete(`/suplier/${suplier.id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedRowKeys((current) => current.filter((id) => id !== suplier.id));
                        message.success("Suplier berhasil dihapus.");
                    },
                }),
        });
    };

    const handleBulkDelete = () => {
        Modal.confirm({
            title: "Hapus semua suplier terpilih?",
            icon: <ExclamationCircleFilled style={{ color: "#ff6a00" }} />,
            content: `${selectedRowKeys.length} data suplier akan dihapus permanen.`,
            okText: "Ya, hapus semua",
            cancelText: "Batal",
            okButtonProps: {
                danger: true,
            },
            onOk: () =>
                router.delete("/suplier", {
                    data: {
                        ids: selectedRowKeys,
                    },
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedRowKeys([]);
                        message.success("Suplier terpilih berhasil dihapus.");
                    },
                }),
        });
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => {
            setSelectedRowKeys(keys);
        },
        selections: true,
    };

    const columns = [
        {
            title: "Nama Suplier",
            dataIndex: "name",
            key: "name",
            render: (value) => <Text className="supplier-cell-title">{value}</Text>,
        },
        {
            title: "No. Telepon",
            dataIndex: "number_phone",
            key: "number_phone",
            render: (value) => <Text className="supplier-cell-text">{value || "-"}</Text>,
        },
        {
            title: "Kota",
            dataIndex: "city",
            key: "city",
            render: (value) => value || "-",
        },
        {
            title: "Provinsi",
            dataIndex: "province",
            key: "province",
            render: (value) => value || "-",
        },
        {
            title: "Alamat",
            dataIndex: "address",
            key: "address",
            render: (value) => value || "-",
        },
        {
            title: "Aksi",
            key: "action",
            width: 180,
            render: (_, record) => (
                <Space size={8}>
                    <Button
                        className="supplier-edit-button"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleOpenEditModal(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => handleDeleteSuplier(record)}
                    >
                        Hapus
                    </Button>
                </Space>
            ),
        },
    ];

    const page = (
        <>
            <Head title="Suplier" />
            <div className="supplier-page">
                <style>{`
                    .supplier-page {
                        min-height: 100vh;
                        padding: 24px;
                        background:
                            radial-gradient(circle at top left, rgba(255, 106, 0, 0.14), transparent 28%),
                            radial-gradient(circle at top right, rgba(255, 106, 0, 0.08), transparent 24%),
                            #050505;
                    }

                    .supplier-shell {
                        max-width: 1280px;
                        margin: 0 auto;
                    }

                    .supplier-header {
                        display: flex;
                        align-items: flex-end;
                        justify-content: space-between;
                        gap: 16px;
                        padding-bottom: 20px;
                        margin-bottom: 20px;
                        border-bottom: 1px solid rgba(255, 106, 0, 0.16);
                    }

                    .supplier-title {
                        margin: 8px 0 0 !important;
                        color: #ffffff !important;
                        letter-spacing: -0.03em;
                    }

                    .supplier-subtitle {
                        display: block;
                        margin-top: 8px;
                        color: rgba(255, 255, 255, 0.65);
                        font-size: 14px;
                    }

                    .supplier-role {
                        margin: 0;
                        border: 0;
                        border-radius: 999px;
                        background: rgba(255, 255, 255, 0.06);
                        color: rgba(255, 255, 255, 0.78);
                        padding: 6px 12px;
                        font-weight: 600;
                    }

                    .supplier-stats {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        gap: 12px;
                        min-width: 320px;
                    }

                    .supplier-stat {
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-radius: 18px;
                        padding: 14px 16px;
                        background: rgba(17, 17, 17, 0.92);
                    }

                    .supplier-stat-label {
                        display: block;
                        color: rgba(255, 255, 255, 0.48);
                        font-size: 12px;
                        font-weight: 600;
                        letter-spacing: 0.08em;
                        text-transform: uppercase;
                    }

                    .supplier-stat-value {
                        display: block;
                        margin-top: 6px;
                        color: #ffffff;
                        font-size: 22px;
                        font-weight: 700;
                    }

                    .supplier-search .ant-input-affix-wrapper,
                    .supplier-search .ant-input-group-addon {
                        background: #111111;
                        border-color: rgba(255, 255, 255, 0.12);
                        box-shadow: none;
                    }

                    .supplier-search .ant-input-affix-wrapper:hover,
                    .supplier-search .ant-input-affix-wrapper-focused {
                        border-color: rgba(255, 255, 255, 0.22);
                    }

                    .supplier-search input.ant-input {
                        color: #ffffff;
                        background: transparent;
                    }

                    .supplier-search input.ant-input::placeholder {
                        color: rgba(255, 255, 255, 0.36);
                    }

                    .supplier-search .ant-input-group-addon .ant-btn-primary {
                        background: #ff6a00;
                        border-color: #ff6a00;
                        color: #ffffff;
                    }

                    .supplier-search .ant-input-group-addon .ant-btn-primary:hover {
                        background: #ff7b1f;
                        border-color: #ff7b1f;
                    }

                    .supplier-actions {
                        display: flex;
                        width: 100%;
                        justify-content: flex-end;
                        flex-wrap: wrap;
                    }

                    .supplier-bulk-meta {
                        color: rgba(255, 255, 255, 0.62);
                        font-size: 13px;
                    }

                    .supplier-add-button {
                        background: #ff6a00;
                        border-color: #ff6a00;
                        color: #ffffff;
                    }

                    .supplier-add-button:hover,
                    .supplier-add-button:focus {
                        background: #ff7b1f !important;
                        border-color: #ff7b1f !important;
                        color: #ffffff !important;
                    }

                    .supplier-edit-button {
                        background: rgba(255, 106, 0, 0.12);
                        border-color: rgba(255, 106, 0, 0.32);
                        color: #ff8a3d;
                    }

                    .supplier-edit-button:hover,
                    .supplier-edit-button:focus {
                        background: rgba(255, 106, 0, 0.18) !important;
                        border-color: rgba(255, 106, 0, 0.48) !important;
                        color: #ff9a58 !important;
                    }

                    .supplier-bulk-delete-button {
                        border-color: rgba(239, 68, 68, 0.32);
                        background: rgba(239, 68, 68, 0.1);
                        color: #f87171;
                    }

                    .supplier-bulk-delete-button:hover,
                    .supplier-bulk-delete-button:focus {
                        border-color: rgba(239, 68, 68, 0.52) !important;
                        background: rgba(239, 68, 68, 0.16) !important;
                        color: #fca5a5 !important;
                    }

                    .supplier-table {
                        margin-top: 20px;
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-radius: 20px;
                        overflow: hidden;
                        background: #0b0b0b;
                    }

                    .supplier-table .ant-table {
                        background: #0b0b0b;
                        color: rgba(255, 255, 255, 0.88);
                    }

                    .supplier-table .ant-table-container,
                    .supplier-table .ant-table-content {
                        border-color: rgba(255, 255, 255, 0.08) !important;
                    }

                    .supplier-table .ant-table-thead > tr > th {
                        background: #111111 !important;
                        color: #ffffff !important;
                        border-color: rgba(255, 255, 255, 0.08) !important;
                        font-weight: 600;
                    }

                    .supplier-table .ant-table-tbody > tr > td {
                        background: #0b0b0b !important;
                        color: rgba(255, 255, 255, 0.84);
                        border-color: rgba(255, 255, 255, 0.08) !important;
                    }

                    .supplier-table .ant-table-tbody > tr:hover > td {
                        background: #111111 !important;
                    }

                    .supplier-table .ant-pagination,
                    .supplier-table .ant-pagination * {
                        color: rgba(255, 255, 255, 0.72);
                    }

                    .supplier-table .ant-empty-description {
                        color: rgba(255, 255, 255, 0.6);
                    }

                    .supplier-cell-title {
                        color: #ffffff !important;
                    }

                    .supplier-cell-text {
                        color: rgba(255, 255, 255, 0.62);
                    }

                    @media (max-width: 768px) {
                        .supplier-page {
                            padding: 16px;
                        }

                        .supplier-header {
                            align-items: flex-start;
                            flex-direction: column;
                        }

                        .supplier-stats {
                            width: 100%;
                            min-width: 0;
                            grid-template-columns: 1fr;
                        }
                    }
                `}</style>

                <div className="supplier-shell">
                    <div className="supplier-header">
                        <div>
                            <Tag className="supplier-role">{roleLabel}</Tag>
                            <Title level={2} className="supplier-title">
                                Suplier
                            </Title>
                            <Text className="supplier-subtitle">
                                Daftar suplier dalam tampilan gelap yang sederhana dan fokus ke data.
                            </Text>
                        </div>

                        <div className="supplier-stats">
                            <div className="supplier-stat">
                                <span className="supplier-stat-label">Total data</span>
                                <span className="supplier-stat-value">{totalSupliers}</span>
                            </div>
                            <div className="supplier-stat">
                                <span className="supplier-stat-label">Pencarian</span>
                                <span className="supplier-stat-value">{activeSearch || "Semua"}</span>
                            </div>
                        </div>
                    </div>

                    <Row gutter={[16, 16]} align="middle" justify="space-between">
                        <Col xs={24} lg={12}>
                            <Space size={12} wrap>
                                <Tag variant="filled" className="supplier-role">
                                    {totalSupliers} data
                                </Tag>
                                {activeSearch ? (
                                    <Tag variant="filled" className="supplier-role">
                                        Cari: {activeSearch}
                                    </Tag>
                                ) : null}
                            </Space>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Space className="supplier-actions" size={12} wrap>
                                {selectedRowKeys.length > 0 ? (
                                    <Text className="supplier-bulk-meta">
                                        {selectedRowKeys.length} data dipilih
                                    </Text>
                                ) : null}
                                <Input.Search
                                    allowClear
                                    className="supplier-search"
                                    defaultValue={activeSearch}
                                    placeholder="Cari nama suplier"
                                    enterButton={(
                                        <Button type="primary" icon={<SearchOutlined />}>
                                            Cari
                                        </Button>
                                    )}
                                    onSearch={handleSearch}
                                    size="large"
                                />
                                <Button
                                    className="supplier-bulk-delete-button"
                                    danger
                                    disabled={selectedRowKeys.length === 0}
                                    icon={<DeleteOutlined />}
                                    size="large"
                                    onClick={handleBulkDelete}
                                >
                                    Hapus Terpilih
                                </Button>
                                <Button
                                    className="supplier-add-button"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={() => setOpenAddModal(true)}
                                >
                                    Tambah Suplier
                                </Button>
                            </Space>
                        </Col>
                    </Row>

                    <Table
                        bordered
                        className="supplier-table"
                        rowKey="id"
                        columns={columns}
                        dataSource={supliers?.data ?? []}
                        rowSelection={rowSelection}
                        pagination={{
                            current: supliers?.current_page ?? 1,
                            pageSize: supliers?.per_page ?? 10,
                            total: totalSupliers,
                            showSizeChanger: false,
                            onChange: (page) => {
                                router.get(
                                    "/suplier",
                                    {
                                        ...filters,
                                        page,
                                    },
                                    {
                                        preserveState: true,
                                        replace: true,
                                    },
                                );
                            },
                        }}
                        locale={{
                            emptyText: <Empty description="Belum ada data suplier" />,
                        }}
                        scroll={{ x: 960 }}
                        size="middle"
                    />
                    <AddSuplierModal
                        open={openAddModal}
                        onClose={() => setOpenAddModal(false)}
                    />
                    <AddSuplierModal
                        mode="edit"
                        open={openEditModal}
                        onClose={handleCloseEditModal}
                        suplier={selectedSuplier}
                    />
                </div>
            </div>
        </>
    );

    if (auth?.role === "admin_gudang") {
        return <LayoutAdminGudang>{page}</LayoutAdminGudang>;
    }

    return <LayoutSuperAdmin>{page}</LayoutSuperAdmin>;
}
