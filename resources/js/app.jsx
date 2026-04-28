import './bootstrap';
import {createInertiaApp} from "@inertiajs/react";
import {ConfigProvider} from "antd";
import {createRoot} from "react-dom/client";
import {theme, themeCssVariables} from "./theme";
import {LayoutAdminGudang} from "./Layouts/LayoutAdminGudang.jsx";
import {LayoutSuperAdmin} from "./Layouts/LayoutSuperAdmin.jsx";
import {LayoutKasir} from "./Layouts/LayoutKasir.jsx";

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        let page =  pages[`./Pages/${name}.jsx`];

        if(name.startsWith("AdminGudang")){
            page.default.layout = page => <LayoutAdminGudang>{page}</LayoutAdminGudang>
        }else if (name.startsWith("SuperAdmin")){
            page.default.layout = page => <LayoutSuperAdmin>{page}</LayoutSuperAdmin>
        }else if(name.startsWith("Kasir")){
            page.default.layout = page => <LayoutKasir>{page}</LayoutKasir>
        }
        return page;
    },
    progress: {
        color : "#ff5c00"
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <style id="app-theme-vars">{themeCssVariables}</style>
                <ConfigProvider theme={theme}>
                    <App {...props} />
                </ConfigProvider>
            </>
        );
    },
})
