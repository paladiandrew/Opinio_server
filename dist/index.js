"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const User_1 = require("./models/User"); // Импортируй свой класс User
const Review_1 = require("./models/Review"); // Импортируй свой класс Review
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
let users = []; // Массив для хранения пользователей
let reviews = []; // Массив для хранения отзывов
const loadData = () => {
    try {
        const usersData = fs_1.default.readFileSync(path_1.default.join(__dirname, '../src/data/users.json'), 'utf-8');
        users = JSON.parse(usersData);
        const reviewsData = fs_1.default.readFileSync(path_1.default.join(__dirname, '../src/data/reviews.json'), 'utf-8');
        reviews = JSON.parse(reviewsData);
    }
    catch (error) {
        console.error('Error loading data:', error);
    }
};
// Вызов функции загрузки данных
loadData();
app.post('/api/users', (req, res) => {
    const { userId, VKId, firstName, lastName, age, city, profilePhoto, profileDescription, friendsList, myReviews, subscriptionStatus } = req.body;
    // Проверка на существование пользователя
    const existingUserIndex = users.findIndex(user => user.VKId === VKId);
    if (existingUserIndex !== -1) {
        // Если пользователь существует, обновляем его данные
        users[existingUserIndex] = Object.assign(Object.assign({}, users[existingUserIndex]), req.body);
        return res.status(200).send(users[existingUserIndex]); // Возвращаем обновленного пользователя
    }
    else {
        // Если пользователя нет, создаем нового
        const newUser = new User_1.User(userId, VKId, firstName, lastName, age, city, profilePhoto, profileDescription, friendsList, myReviews, subscriptionStatus);
        users.push(newUser);
        return res.status(201).send(newUser); // Возвращаем созданного пользователя
    }
});
// Поиск пользователей
app.get('/api/users/search', (req, res) => {
    const { findUserNameString } = req.query;
    if (typeof findUserNameString !== 'string') {
        return res.status(400).send('Invalid query parameter');
    }
    const filteredUsers = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`;
        return fullName.startsWith(findUserNameString) || user.VKId.startsWith(findUserNameString);
    });
    res.send(filteredUsers);
});
// Создание отзыва
app.post('/api/reviews', (req, res) => {
    const { id, content, rating, datePosted, category, name, imageUrl, userId, recipientUserId } = req.body;
    const newReview = new Review_1.Review(id, content, rating, datePosted, category, name, imageUrl, userId, recipientUserId);
    reviews.push(newReview);
    res.status(201).send(newReview);
});
// Получение отзывов по VK ID
app.get('/api/reviews/lenta', (req, res) => {
    const { vkid } = req.query;
    if (typeof vkid !== 'string') {
        return res.status(400).send('Invalid query parameter');
    }
    // Найти пользователя с указанным VK ID
    const user = users.find(u => u.VKId === vkid);
    if (!user) {
        return res.status(404).send('User not found');
    }
    // Найти отзывы, соответствующие условиям
    const filteredReviews = reviews.filter(review => {
        return review.recipientUserId && user.getAllFriends().includes(review.recipientUserId);
    });
    res.send(filteredReviews);
});
// Обновление отзыва
app.patch('/api/reviews/update', (req, res) => {
    const { id, like, num } = req.body;
    if (typeof id !== 'string' || typeof like !== 'boolean' || typeof num !== 'number') {
        return res.status(400).send('Invalid request parameters');
    }
    // Найти отзыв по id
    const review = reviews.find(r => r.id === id);
    if (!review) {
        return res.status(404).send('Review not found');
    }
    // Обновить поля отзыва
    review.isLiked = like;
    review.isDisliked = !like; // Если like true, то isDisliked будет false
    review.rating += num; // Увеличить рейтинг на num
    res.send(review);
});
app.get('/api/reviews/profiles', (req, res) => {
    const { vkid } = req.query;
    if (typeof vkid !== 'string') {
        return res.status(400).send('Invalid query parameter');
    }
    // Найти пользователя с указанным VK ID
    const user = users.find(u => u.VKId === vkid);
    if (!user) {
        return res.status(404).send('User not found');
    }
    // Найти отзывы, соответствующие условиям
    const filteredReviews = reviews.filter(review => {
        return review.recipientUserId && review.recipientUserId === vkid;
    });
    res.send(filteredReviews);
});
// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
