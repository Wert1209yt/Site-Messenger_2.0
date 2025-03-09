module.exports = {
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET_KEY || 'YOUR_SECRET_KEY',
    adminPassword: process.env.ADMIN_PASSWORD || '1425@#$nj)',
    usersFile: './users.json',
    textFile: './shared_text.txt',
    uploadDir: './uploads/',
};
