const { items, campaigns } = require('./input.json')
const { products: productInfoList } = require('./products.json')
const { campaigns: campaignInfoList } = require('./campaigns.json')

// console.log(items);
// console.log(products);
// console.log(campaigns);

const fixedAmount = (totalPrice, campaign) => {
    console.log("Use campaign : Fixed amount");
    if (!campaign.amount) throw "Invalid parameter amount"
    if (campaign.amount < 0) throw "Min amount is 0"

    let discount = campaign.amount
    return totalPrice - discount
}

const percentageDiscount = (totalPrice, campaign) => {
    console.log("Use campaign : Percentage discount");
    if (!campaign.percentage) throw "Invalid parameter percentage"
    if (campaign.percentage < 0) throw "Min percentage is 0"

    let discount = (campaign.percentage / 100) * totalPrice
    return totalPrice - discount
}

const percentageDiscountByItemCategory = (totalPrice, campaign, items, productInfoList) => {
    console.log("Use campaign : Percentage discount by item category");
    if (!campaign.category) throw "Invalid parameter category"
    if (!campaign.percentage) throw "Invalid parameter percentage"
    if (campaign.percentage < 0) throw "Min percentage is 0"
    let discount = 0;
    items.forEach((item) => {
        const productInfo = productInfoList.find(p => p.name === item.name)
        if (productInfo.category === campaign.category) {
            discount = discount + (productInfo.price * item.value) * (campaign.percentage / 100)
        }
    })
    return totalPrice - discount
}

const discountByPoints = (totalPrice, campaign) => {
    console.log("Use campaign : Discount by points");
    if (!campaign.customerPoints) throw "Invalid parameter customerPoints"
    if (campaign.customerPoints <= 0) throw "Please enter a value greater than 0"

    let maxDiscount = (20 / 100) * totalPrice
    let discount = campaign.customerPoints
    if (discount <= maxDiscount) {
        totalPrice = totalPrice - discount
    } else {
        totalPrice = totalPrice - maxDiscount
        console.log(`You attempted to use ${campaign.customerPoints} points, but only ${maxDiscount} points were applied (20% of your order total). The remaining ${campaign.customerPoints - maxDiscount} points have been returned to your account.`);
    }
    return totalPrice
}

const specialCampaigns = (totalPrice, campaign) => {
    console.log("Use campaign : Special campaigns");
    if (!campaign.every || campaign.every < 0) throw "Invalid parameter every"
    if (!campaign.discount || campaign.discount < 0) throw "Invalid parameter discount"

    let steps = Math.floor(totalPrice / campaign.every)
    let discount = campaign.discount * steps

    return totalPrice - discount
}

const calculateTotalPrice = (items) => {
    let totalPrice = 0
    items.forEach(item => {
        const productInfo = productInfoList.find(p => p.name === item.name)
        if (!productInfo) throw "Product not found"
        if (item.value <= 0) throw `The value of ${productInfo.name} must be greater than 0`

        totalPrice = totalPrice + (productInfo.price * item.value)
    });
    return totalPrice
}

const discount = (items, campaigns) => {
    try {
        let totalPrice = calculateTotalPrice(items);

        if (Array.isArray(campaigns) && campaigns.length) {
            let categoryCampaign = new Map();
            campaigns.forEach(campaign => {
                const campaignInfo = campaignInfoList.find(c => c.name === campaign.name)
                if (!campaignInfo) throw "Campaign not found"

                if (categoryCampaign.has(campaignInfo.category)) {
                    throw "Use only one campaign from the same category,"
                } else {
                    categoryCampaign.set(campaignInfo.category, campaign)
                }
            });

            const campaignPriority = ["Coupon", "On Top", "Seasonal"]
            campaignPriority.forEach((categoryName) => {
                const campaign = categoryCampaign.get(categoryName)
                if (!campaign) return

                switch (campaign.name) {
                    case "Fixed amount":
                        totalPrice = fixedAmount(totalPrice, campaign)
                        break;
                    case "Percentage discount":
                        totalPrice = percentageDiscount(totalPrice, campaign)
                        break;
                    case "Percentage discount by item category":
                        totalPrice = percentageDiscountByItemCategory(totalPrice, campaign, items, productInfoList)
                        break;
                    case "Discount by points":
                        totalPrice = discountByPoints(totalPrice, campaign)
                        break;
                    case "Special campaigns":
                        totalPrice = specialCampaigns(totalPrice, campaign)
                        break;
                }
            })
        }

        if (totalPrice < 0) {
            totalPrice = 0
        }
        if (!totalPrice) throw "invalid type of input"
        console.log(`Total Price: ${totalPrice} THB`);
    } catch (error) {
        console.log(`error: ${error}`);
    }
}

discount(items, campaigns);

