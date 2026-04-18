import './bootstrap';
import {createInertiaApp} from "@inertiajs/react";
import {ConfigProvider} from "antd";
import {renderToString} from "react-dom/server";
import {theme, themeCssVariables} from "./theme";

export default function render(page) {
    return createInertiaApp({
        page,
        render: renderToString,
        resolve: name => {
            const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
            return pages[`./Pages/${name}.jsx`]?.default;
        },
        progress: {
            color: '#ff5c00',
        },
        setup({App, props}) {
            return (
                <>
                    <style id="app-theme-vars">{themeCssVariables}</style>
                    <ConfigProvider theme={theme}>
                        <App {...props} />
                    </ConfigProvider>
                </>
            );
        },
    });
}
