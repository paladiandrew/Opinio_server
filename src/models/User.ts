export class User {
    userId: string;
    VKId: string;
    firstName: string;
    lastName: string;
    age: number; 
    city: string;
    profilePhoto: string;
    profileDescription: string;
    friendsList: number[]; 
    myReviews: number[]; 
    subscriptionStatus: string;
  
    constructor(userId: string, VKId: string, firstName: string, lastName: string, age: number, city: string, profilePhoto: string, profileDescription: string, friendsList: number[], myReviews: number[], subscriptionStatus: string) {
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
    addFriend(friendId: number): void {
        this.friendsList.push(friendId);
    }

    // Метод для добавления отзыва в список отзывов
    addReview(reviewId: number): void {
        this.myReviews.push(reviewId);
    }

    // Метод для получения всех друзей пользователя
    getAllFriends(): string[] { 
        return this.friendsList.map(friend => friend.toString());
    }

    // Метод для получения всех отзывов пользователя
    getAllReviews(): number[] {
        return this.myReviews;
    }
}
