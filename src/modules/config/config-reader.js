// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { existsSync, readFileSync } = require('fs');

let config;

module.exports = {
    readConfig() {
        if (config) {
            return config;
        }

        const configPath = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'configs',
            'appConfig.json',
        );

        if (!existsSync(configPath)) {
            throw new Error('Config file not found');
        }

        const configRaw = readFileSync(configPath, 'utf-8');

        config = JSON.parse(configRaw);

        return config;
    },
};
