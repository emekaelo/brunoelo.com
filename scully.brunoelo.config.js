"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var scully_1 = require("@scullyio/scully");
require("prismjs/components/prism-git.js");
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
    // defaultPostRenderers: ['seoHrefOptimise'],
    puppeteerLaunchOptions: {
        args: ['--no-sandbox', '--disable-setuid--sandbox'],
    },
};
