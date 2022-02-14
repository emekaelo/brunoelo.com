"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var scully_1 = require("@scullyio/scully");
(0, scully_1.setPluginConfig)('md', { enableSyntaxHighlighting: true });
exports.config = {
    projectRoot: './src',
    projectName: 'brunoelo',
    outDir: './dist/static',
    routes: {
        '/blog/:slug': {
            type: 'contentFolder',
            slug: {
                folder: './blog',
            },
        },
    },
};
