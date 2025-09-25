export const categories = ["Electronics", "Clothing", "Books", "Home", "Sports", "Beauty"]

export const sortingOptions = [
    "Sort by: Default",
    "Price: Low to High",
    "Price: High to Low",
    "Name: A to Z",
    "Name: Z to A",
]

export const productVariants = [
    "red",
    "blue",
    "green",
    "black",
    "yellow",
    "gray",
]

export const products = [
    {
        id : "1",
        name : "Wireless Headphones",
        description : "Premium sound quality with noise cancellation and 30-hour battery life.",
        category : {id : "1", name : "Electronics"} ,
        price : "129.99",
        variants : ["red", "blue", "green", "gray"],
        images : [
            {
                image : "/assets/images/photo1.jpg",
                altText : "nothing",
                isPrimary : false,
            }
        ],
    },
    {
        id : "2",
        name : "Casual T-Shirt",
        description : "100% cotton comfortable t-shirt for everyday wear. Available in multiple",
        category : {id : "2", name : "Clothing"} ,
        price : "24.99",
        variants : ["red", "blue", "gray"],
        images : [
            {
                image : "/assets/images/photo2.jpg",
                altText : "nothing",
                isPrimary : false,
            }
        ],
    },
    {
        id : "3",
        name : "Running Shoes",
        description : "Lightweight running shoes with extra cushioning for maximum comfort",
        category : {id : "3", name : "Home"} ,
        price : "89.99",
        variants : ["black", "yellow", "gray"],
        images : [
            {
                image : "/assets/images/photo3.jpg",
                altText : "nothing",
                isPrimary : false,
            }
        ],
    },
    {
        id : "4",
        name : "Wireless Headphones",
        description : "Premium sound quality with noise cancellation and 30-hour battery life.",
        category : {id : "4", name : "Sports"} ,
        price : "100.99",
        variants : ["red","black", "yellow"],
        images : [
            {
                image : "/assets/images/photo4.jpg",
                altText : "nothing",
                isPrimary : false,
            }
        ],
    },
    {
        id : "5",
        name : "Casual T-Shirt",
        description : "Premium sound quality with noise cancellation and 30-hour battery life.",
        category : {id : "5", name : "Beauty"} ,
        price : "102.99",
        variants : ["red", "blue",  "gray"],
        images : [
            {
                image : "/assets/images/photo5.jpg",
                altText : "nothing",
                isPrimary : false,
            }
        ],
    },
    {
        id : "6",
        name : "Running Shoes",
        description : "Premium sound quality with noise cancellation and 30-hour battery life.",
        category : {id : "6", name : "Books"} ,
        price : "178.99",
        variants : ["red", "gray"],
        images : [
            {
                image : "/assets/images/photo6.jpg",
                altText : "nothing",
                isPrimary : false,
            }
        ],
    },
    {
        id : "7",
        name : "Wireless Headphones",
        description : "Premium sound quality with noise cancellation and 30-hour battery life.",
        category : {id : "6", name : "Books"} ,
        price : "200.99",
        variants : ["red", "gray"],
        images : [
            {
                image : "/assets/images/photo1.jpg",
                altText : "nothing",
                isPrimary : false,
            }
        ],
    },
    {
        id : "8",
        name : "Casual T-Shirt",
        description : "Premium sound quality with noise cancellation and 30-hour battery life.",
        category : {id : "5", name : "Beauty"} ,
        price : "178.99",
        variants : ["red", "gray"],
        images : [
            {
                image : "/assets/images/photo4.jpg",
                altText : "nothing",
                isPrimary : false,
            }
        ],
    },
    {
        id : "9",
        name : "Wireless Headphones",
        description : "Premium sound quality with noise cancellation and 30-hour battery life.",
        category : {id : "3", name : "Home"} ,
        price : "178.99",
        variants : ["red", "gray"],
        images : [
            {
                image : "/assets/images/photo2.jpg",
                altText : "nothing",
                isPrimary : false,
            }
        ],
    },
    {
        id : "10",
        name : "Wireless Headphones",
        description : "Premium sound quality with noise cancellation and 30-hour battery life.",
        category : {id : "2", name : "Clothing"} ,
        price : "178.99",
        variants : ["red", "gray"],
        images : [
            {
                image : "/assets/images/photo5.jpg",
                altText : "nothing",
                isPrimary : false,
            }
        ],
    },
]