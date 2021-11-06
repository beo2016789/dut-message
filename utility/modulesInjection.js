const UserRepository = require('../repositories/Users'),
      AuthController = require('../controllers/auth'),
      AuthService = require('../services/authService'),
      UserController = require('../controllers/Users'),
      UserService = require('../services/userService'),
      AuthMiddleware = require('../middleware/auth'),
      RoomRepository = require('../repositories/Room'),
      RoomService = require('../services/roomService'),
      RoomController = require('../controllers/Rooms'),
      ConversationRepository = require('../repositories/Conversation'),
      ConversationService = require('../services/conversationService'),
      ConversationController = require('../controllers/Conversations'),
      MessageRepository = require('../repositories/Messages'),
      MessageService = require('../services/messageService')

let userRepo = new UserRepository();
let authService = new AuthService(userRepo);
let authController = new AuthController(authService);

let userService = new UserService(userRepo);
let userController = new UserController(userService);

let authMiddleware = new AuthMiddleware(userRepo);

let roomRepo = new RoomRepository();
let roomService = new RoomService(roomRepo);
let roomController = new RoomController(roomService);

let conversationRepo = new ConversationRepository();
let conversationService = new ConversationService(conversationRepo);
let conversationController = new ConversationController(conversationService);


let messageRepo = new MessageRepository();
let messageService = new MessageService(messageRepo, conversationRepo, roomRepo);

module.exports = {
    authController: authController,
    userController: userController,
    authMiddleware: authMiddleware,
    conversationController: conversationController,
    roomController: roomController,
    messageService: messageService,
}