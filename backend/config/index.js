const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'default_secret'
}

export default config;