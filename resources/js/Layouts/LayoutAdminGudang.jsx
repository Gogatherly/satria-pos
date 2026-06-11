import {HomeOutlined, ShopOutlined} from "@ant-design/icons";
import {Layout} from "antd";
import {Sidebar} from "../Components/Sidebar.jsx";
import {Navbar} from "../Components/Navbar.jsx";
import {ContentLayout} from "../Components/ContentLayout.jsx";
import {useState} from "react";
import {Link} from "@inertiajs/react";

export const LayoutAdminGudang = ({children}) => {
    const [collapse, setCollapsed] = useState(false);
    const menuItems =[
        {
            key: '/admin-gudang',
            icon: <HomeOutlined />,
            label: <Link href="/admin-gudang">Dashboard</Link>,
        },
        {
            key: '/suplier',
            icon: <ShopOutlined />,
            label: <Link href="/suplier">Suplier</Link>,
        },
    ]
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
