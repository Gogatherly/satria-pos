import {Layout} from "antd";
import {useState} from "react";
import {Sidebar} from "../Components/Sidebar.jsx";
import {Navbar} from "../Components/Navbar.jsx";
import {ContentLayout} from "../Components/ContentLayout.jsx";
import {HomeOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined} from "@ant-design/icons";

export const LayoutAdmin = ({children}) => {
    const [collapse, setCollapsed] = useState(false);
    const menuItems = [
        {
            key: '1',
            icon: <HomeOutlined />,
            label: 'nav 1',
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
