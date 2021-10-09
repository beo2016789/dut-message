const authRouter = require('./auth');
const userRouter = require('./user');
const conversationRouter = require('./conversation');
const route = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/conversation', conversationRouter);
}

module.exports = route