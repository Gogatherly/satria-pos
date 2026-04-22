import {Sidebar} from "../Components/Sidebar.jsx";
import {Layout} from "antd";
import {Navbar} from "../Components/Navbar.jsx";
import {ContentLayout} from "../Components/ContentLayout.jsx";
import {HomeOutlined} from "@ant-design/icons";
import {useState} from "react";

export const LayoutKasir = ({children}) => {
    const [collapse, setCollapsed] = useState(false);
    const menuItems =[
        {
            key: '1',
            icon: <HomeOutlined />,
            label: 'nav 1',
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
