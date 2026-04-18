import {Image, Layout, Menu} from 'antd';
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from "@ant-design/icons";
import {theme} from "../theme.js";

const {Sider} = Layout;
export const Sidebar = ({collapsed,menuItems  }) => {

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
                background: '#0b0b0b',
                borderRight: '1px solid #202020',
                boxShadow: 'inset -1px 0 0 rgba(255, 255, 255, 0.03)',
            }}
        >
            <div
                style={{
                    height: 64,
                    margin: 12,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #111111 0%, #171717 100%)',
                    border: '1px solid #232323',
                }}
                className={"flex items-center"}
            >
                <div className="w-full h-full flex items-center justify-center">
                    <Image
                        width={50}
                        height={50}
                        src={"/images/logo-satria.png"}
                        className={collapsed ? "mx-0" : "mx-2"}
                    />
                </div>
                {collapsed || (
                    <div className="mx-4">
                        <p className={"ant-btn-color-primary text-lg font-bold text-white"}>Satria<span className={"text-brand"}>Pos</span></p>
                        <p className={"text-white text-[10px]"}>By SatriaCorp</p>
                    </div>
                )}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{
                    background: '#0b0b0b',
                    borderInlineEnd: 'none',
                }}
                items={menuItems}
            />
        </Sider>
    )
}
