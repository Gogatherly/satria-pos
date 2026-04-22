import {useForm} from "@inertiajs/react";
import {
    LockOutlined,
    LoginOutlined,
    MailOutlined,
    SafetyCertificateOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import {Button, Checkbox, Form, Input} from "antd";

const validationRules = {
    email: [
        {required: true, message: "Email wajib diisi."},
        {type: "email", message: "Format email tidak valid."},
    ],
    password: [{required: true, message: "Password wajib diisi."}],
};

export default function Login() {
    const {data, setData, post, processing, errors} = useForm({
        email: "",
        password: "",
        remember_me: false,
    });

    const handleValuesChange = (changedValues) => {
        Object.entries(changedValues).forEach(([field, value]) => {
            setData(field, value);
        });
    };

    const handleSubmit = () => {
        post("/login", {
            preserveScroll: true,
        });
    };

    return (
        <main className="login-page">
            <section className="login-brand-panel" aria-label="SatriaPOS">
                <div className="login-logo-mark">
                    <img src="/images/logo-satria.png" alt="SatriaPOS"/>
                </div>

                <div className="login-brand-copy">
                    <p className="login-kicker">SatriaPOS</p>
                    <h1>Point of Sale Koperasi</h1>
                    <p>Transaksi, inventori, dan operasional kasir dalam satu dashboard.</p>
                </div>

                <div className="login-preview" aria-hidden="true">
                    <div className="login-preview-header">
                        <span/>
                        <span/>
                        <span/>
                    </div>
                    <div className="login-preview-body">
                        <div className="login-preview-row is-accent"/>
                        <div className="login-preview-row"/>
                        <div className="login-preview-row is-short"/>
                        <div className="login-preview-total">
                            <ShoppingCartOutlined/>
                            <span/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="login-form-panel" aria-label="Form login">
                <div className="login-form-shell">
                    <div className="login-form-heading">
                        <div className="login-form-icon">
                            <SafetyCertificateOutlined/>
                        </div>
                        <div>
                            <p>Selamat datang</p>
                            <h2>Masuk ke akun</h2>
                        </div>
                    </div>

                    <Form
                        layout="vertical"
                        requiredMark={false}
                        size="large"
                        initialValues={data}
                        onFinish={handleSubmit}
                        onValuesChange={handleValuesChange}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={validationRules.email}
                            validateStatus={errors.email ? "error" : undefined}
                            help={errors.email}
                        >
                            <Input
                                prefix={<MailOutlined/>}
                                placeholder="nama@email.com"
                                autoComplete="email"
                                inputMode="email"
                                allowClear
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={validationRules.password}
                            validateStatus={errors.password ? "error" : undefined}
                            help={errors.password}
                        >
                            <Input.Password
                                prefix={<LockOutlined/>}
                                placeholder="Masukkan password"
                                autoComplete="current-password"
                            />
                        </Form.Item>

                        <div className="login-form-options">
                            <Form.Item
                                name="remember_me"
                                valuePropName="checked"
                                help={errors.remember_me}
                                validateStatus={errors.remember_me ? "error" : undefined}
                                className="login-remember-item"
                            >
                                <Checkbox>Ingat saya</Checkbox>
                            </Form.Item>
                        </div>

                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<LoginOutlined/>}
                            loading={processing}
                            block
                        >
                            Masuk
                        </Button>
                    </Form>
                </div>
            </section>
        </main>
    );
}
