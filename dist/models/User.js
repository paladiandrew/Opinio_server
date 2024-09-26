"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userId, VKId, firstName, lastName, age, city, profilePhoto, profileDescription, friendsList, myReviews, subscriptionStatus) {
        this.userId = userId;
        this.VKId = VKId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.city = city;
        this.profilePhoto = profilePhoto;
        this.profileDescription = profileDescription;
        this.friendsList = friendsList;
        this.myReviews = myReviews;
        this.subscriptionStatus = subscriptionStatus;
    }
    // Метод для добавления друга
    addFriend(friendId) {
        this.friendsList.push(friendId);
    }
    // Метод для добавления отзыва в список отзывов
    addReview(reviewId) {
        this.myReviews.push(reviewId);
    }
    // Метод для получения всех друзей пользователя
    getAllFriends() {
        return this.friendsList.map(friend => friend.toString());
    }
    // Метод для получения всех отзывов пользователя
    getAllReviews() {
        return this.myReviews;
    }
}
exports.User = User;
