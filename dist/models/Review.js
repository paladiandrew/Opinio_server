"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
class Review {
    constructor(id, content, rating, datePosted, category, name, imageUrl, userId, // Добавлено
    recipientUserId, // Добавлено
    isTagged = false, isLiked = false, isDisliked = false) {
        this.id = id;
        this.content = content;
        this.rating = rating;
        this.datePosted = datePosted;
        this.category = category;
        this.name = name;
        this.imageUrl = imageUrl;
        this.userId = userId; // Инициализация
        this.recipientUserId = recipientUserId; // Инициализация
        this.isTagged = isTagged;
        this.isLiked = isLiked;
        this.isDisliked = isDisliked;
    }
}
exports.Review = Review;
