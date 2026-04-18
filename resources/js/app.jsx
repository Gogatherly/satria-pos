import './bootstrap';
import {createInertiaApp} from "@inertiajs/react";
import {ConfigProvider} from "antd";
import {theme} from "../theme.js";
createInertiaApp({
    pages: {
        path: './page',
        extension: '.tsx',
        lazy: true,
        transform: (name, page) => name.replace('/', '-'),
    },
    progress: {
        color : "#ff5c00"
    },
    withApp(app) {
        return(
            <ConfigProvider theme={theme}>
                {app}
            </ConfigProvider>
        )
    }
})
