import {
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Avatar, Button, Dropdown, Layout} from 'antd';
import {Link, usePage} from "@inertiajs/react";
const { Header } = Layout;

export const Navbar = ({setCollapsed, collapsed}) => {
    const {auth} = usePage().props;

    function getLinkProfile() {
        const role = auth?.role;

        if (role === "super_admin") {
            return "/super-admin/profile";
        }

        return null;
    }

    const profileLink = getLinkProfile();

    const items = [
        {
            key: '1',
            label: auth?.name ?? 'User',
        },
        {
            type: "divider"
        },
        profileLink && {
            key: '2',
            label: (
                <Link href={profileLink} className="block w-full">
                    Profile
                </Link>
            ),
            icon: <UserOutlined/>
        },
        {
            key: '3',
            label: 'Settings',
            icon: <SettingOutlined />,
            disabled: true,
        },
        {
            key: '4',
            label: (
                <Link href="/logout" method="post" as="button" className="block w-full text-left">
                    Logout
                </Link>
            ),
            icon: <LoginOutlined />,
            danger: true
        }
    ].filter(Boolean);

    return (
        <Header
            style={{
                padding: 0,
                background: 'linear-gradient(180deg, #0e0e0e 0%, #090909 100%)',
                borderBottom: '1px solid #202020',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.28)',
            }}
            className={"flex w-full"}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    color: 'rgba(255, 255, 255, 0.88)',
                    borderRadius: 0,
                }}
            />
            <div className="flex w-full items-center justify-end pr-8">
                <Dropdown trigger={["click"]} menu={{ items }}>
                    <button type="button" className="cursor-pointer border-0 bg-transparent p-0">
                        {auth?.profile ? <Avatar size={40} src={auth.profile} /> : <Avatar size={40} icon={<UserOutlined />} />}
                    </button>
                </Dropdown>
            </div>
        </Header>
    )
}
