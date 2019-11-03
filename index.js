const app = require('express')();
const restfs = require('@hasnat/rest-fs');
const ftpfs = require('@hasnat/ftpfs');


restfs(app, {
    fs: ftpfs({
        user: process.env.FTP_USER || '',
        password: process.env.FTP_PASS || '',
        host: process.env.FTP_HOST || '127.0.0.1',
        port: process.env.FTP_PORT || 21,
        secure: process.env.FTP_SECURE === 'true',
    }),
    basePath: process.env.FTP_BASE_PATH || ''
});

app.listen(3000);