res.clearCookie("token_chat_app", {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.VITE_MODE !== 'development',
})