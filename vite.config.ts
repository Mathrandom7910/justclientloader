import { defineConfig } from 'vite';
import UserScript from "vite-userscript-plugin";
import { loaderVersion } from "./version";

export default defineConfig({
    build: {
        lib: {
            entry: __dirname + "/src/main.ts",
            name: "justclientloader",
            fileName: (format) => `JustClientLoader.${format}.js`
        }
    },
    plugins: [
        UserScript({
            entry: "./src/main.ts",
            header: {
                name: "JustClient Loader",
                version: loaderVersion,
                match: [
                    "*://*.moomoo.io/*"
                ],
                description: "Loads JustClient",
                author: "MathRandom7910"
            }
        })
    ]
});