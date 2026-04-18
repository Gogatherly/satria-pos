import {DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SmileOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Dropdown, Layout, Space} from 'antd';
const { Header } = Layout;

export const Navbar = ({setCollapsed, collapsed}) => {
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '4',
            danger: true,
            label: 'a danger item',
        }];
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
                <Dropdown trigger={"click"} menu={{ items }}>
                    <Avatar size={40} icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}
