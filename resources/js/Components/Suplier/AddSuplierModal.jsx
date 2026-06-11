import { useForm } from "@inertiajs/react";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { useEffect } from "react";

const emptyForm = {
    name: "",
    number_phone: "",
    city: "",
    province: "",
    address: "",
};

export const AddSuplierModal = ({ open, onClose, mode = "create", suplier = null }) => {
    const { data, setData, post, patch, processing, reset, errors } = useForm({
        ...emptyForm,
    });

    useEffect(() => {
        if (!open) {
            return;
        }

        setData({
            name: suplier?.name ?? "",
            number_phone: suplier?.number_phone ?? "",
            city: suplier?.city ?? "",
            province: suplier?.province ?? "",
            address: suplier?.address ?? "",
        });
    }, [open, setData, suplier]);

    const isEditMode = mode === "edit";

    const handleClose = () => {
        if (processing) {
            return;
        }

        setData(emptyForm);
        reset();
        onClose();
    };

    const handleSubmit = () => {
        const endpoint = isEditMode ? `/suplier/${suplier.id}` : "/suplier";
        const successMessage = isEditMode
            ? "Suplier berhasil diperbarui."
            : "Suplier berhasil ditambahkan.";
        const submit = isEditMode ? patch : post;

        submit(endpoint, {
            preserveScroll: true,
            onSuccess: () => {
                message.success(successMessage);
                setData(emptyForm);
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal
            centered
            destroyOnClose
            open={open}
            title={isEditMode ? "Edit Suplier" : "Tambah Suplier"}
            okText={isEditMode ? "Update" : "Simpan"}
            cancelText="Batal"
            confirmLoading={processing}
            onOk={handleSubmit}
            onCancel={handleClose}
            width={720}
        >
            <Form layout="vertical" requiredMark={false} onFinish={handleSubmit}>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Nama Suplier"
                            required
                            validateStatus={errors.name ? "error" : ""}
                            help={errors.name}
                        >
                            <Input
                                value={data.name}
                                onChange={(event) => setData("name", event.target.value)}
                                placeholder="Contoh: PT Maju Jaya"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="No. Telepon"
                            required
                            validateStatus={errors.number_phone ? "error" : ""}
                            help={errors.number_phone}
                        >
                            <Input
                                value={data.number_phone}
                                onChange={(event) => setData("number_phone", event.target.value)}
                                placeholder="08xxxxxxxxxx"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Kota"
                            required
                            validateStatus={errors.city ? "error" : ""}
                            help={errors.city}
                        >
                            <Input
                                value={data.city}
                                onChange={(event) => setData("city", event.target.value)}
                                placeholder="Contoh: Bandung"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Provinsi"
                            required
                            validateStatus={errors.province ? "error" : ""}
                            help={errors.province}
                        >
                            <Input
                                value={data.province}
                                onChange={(event) => setData("province", event.target.value)}
                                placeholder="Contoh: Jawa Barat"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item
                            label="Alamat"
                            validateStatus={errors.address ? "error" : ""}
                            help={errors.address}
                        >
                            <Input.TextArea
                                rows={4}
                                value={data.address}
                                onChange={(event) => setData("address", event.target.value)}
                                placeholder="Alamat lengkap suplier"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Button htmlType="submit" style={{ display: "none" }} />
            </Form>
        </Modal>
    );
};
