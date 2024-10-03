/** @type {import('next').NextConfig} */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    webpack(config, options) { //include 
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            include: [path.join(__dirname, '../../packages/test')], 
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-typescript'],
                },
            }
        });

        config.resolve.extensions.push('.ts', '.tsx');

        return config;
    },
};

export default nextConfig;
