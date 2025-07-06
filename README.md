Pratipan Butsaeng (Nat)
0989304171

run code type : node discount.js

//Example input
{
    "items" : [
        {
          "name" : "T-Shirt",
          "value" : 1
        },
        {
          "name" : "Hoodie",
          "value" : 1
        },
        {
          "name" : "Hat",
          "value" : 2
        },
        {
          "name" : "Watch",
          "value" : 1
        }
    ],
    "campaigns" : [
        {
            "name" : "Special campaigns",
            "every" : 500,
            "discount" : 10
        },
        {
            "name" : "Percentage discount",
            "percentage" : 10
        },
        {
            "name" : "Percentage discount by item category",
            "category" : "Clothing",
            "percentage" : 10
        }
    ]
}

//Parametors of Campaigns
        {
            "name" : "Fixed amount",
            "amount" : 500,
        },
        {
            "name" : "Percentage discount",
            "percentage" : 500
        },
        {
            "name" : "Percentage discount by item category",
            "category" : "Clothing",
            "percentage" : 10
        },
        {
            "name" : "Discount by points",
            "customerPoints" : 10
        },
        {
            "name" : "Special campaigns",
            "every" : 20,
            "discount" : 10
        }