export class Review {
    id: string;
    content: string;
    category: string;
    rating: number;
    datePosted: Date;
    isTagged: boolean;
    isLiked: boolean;
    isDisliked: boolean;
    name: string;
    imageUrl: string;
    userId: string; // ID пользователя, оставившего отзыв
    recipientUserId: string; // ID пользователя, которому оставили отзыв

    constructor(
        id: string,
        content: string,
        rating: number,
        datePosted: Date,
        category: string,
        name: string,
        imageUrl: string,
        userId: string, // Добавлено
        recipientUserId: string, // Добавлено
        isTagged: boolean = false,
        isLiked: boolean = false,
        isDisliked: boolean = false
    ) {
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