import './bootstrap';
import {createInertiaApp} from "@inertiajs/react";
import {ConfigProvider} from "antd";
import {createRoot} from "react-dom/client";
import {theme} from "./theme";

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    progress: {
        color : "#ff5c00"
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <ConfigProvider theme={theme}>
                <App {...props} />
            </ConfigProvider>
        );
    },
})
