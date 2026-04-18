import {Layout} from "antd";
const {Content} = Layout;
export const ContentLayout = ({children})=>{
    return (
        <Content
            style={{
                margin: 0,
                padding: 0,
                minHeight: '100vh',
            }}
        >
            {children}
        </Content>
    )
}
