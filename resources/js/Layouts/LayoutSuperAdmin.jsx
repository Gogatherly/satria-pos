import {Layout} from "antd";
import {useState} from "react";
import {Link} from "@inertiajs/react";
import {HomeOutlined, ShopOutlined, UserOutlined} from "@ant-design/icons";
import {Sidebar} from "../Components/Sidebar.jsx";
import {Navbar} from "../Components/Navbar.jsx";
import {ContentLayout} from "../Components/ContentLayout.jsx";

export const LayoutSuperAdmin = ({children}) => {
    const [collapse, setCollapsed] = useState(false);
    const menuItems = [
        {
            key: '/super-admin',
            icon: <HomeOutlined/>,
            label: <Link href="/super-admin">Dashboard</Link>,
        },
        {
            key: '/super-admin/profile',
            icon: <UserOutlined/>,
            label: <Link href="/super-admin/profile">Profile</Link>,
        },
        {
            key: '/suplier',
            icon: <ShopOutlined/>,
            label: <Link href="/suplier">Suplier</Link>,
        },
    ];
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sidebar menuItems={menuItems} collapsed={collapse}/>
            <Layout>
                <Navbar collapsed={collapse} setCollapsed={setCollapsed}/>
                <ContentLayout>
                    {children}
                </ContentLayout>
            </Layout>
        </Layout>
    )
}
