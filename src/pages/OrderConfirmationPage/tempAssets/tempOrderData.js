import koana_dark from "./order_koana_dark.png"
import chocolate_lava from "./order_chocolate_lava.png"

export const tempOrderData = {
    lineItems: [
        {
            uid: 'dkdxLcYJvZRRE8wz5MkqE',
            name: 'Koana Speciality Med-Dark Roast',
            quantity: '1',
            basePriceMoney: {price: '20.00'},
            image: koana_dark,
        },
        {
            uid: '0A4ZENpFSF0NixpQcO0kE',
            name: 'Chocolate Lava Mix',
            quantity: '2',
            basePriceMoney: {price: '36.00'},
            image: chocolate_lava,
        }
    ],
    fulfillments: [
      {
        shipmentDetails: {address: '1234 Main St. MiddleOfNowhere CA, 98765'}
      }
    ],
    netAmounts: {
        totalMoney: { amount: 56.00, currency: 'USD' },
        taxMoney: { amount: 0, currency: 'USD' },
    },
    totalMoney: { amount: 56.00, currency: 'USD' }, //(sub total)
    totalDiscountMoney: { amount: 5, currency: 'USD' },
    totalServiceChargeMoney: { amount: 12.50, currency: 'USD' }, //(shipping fee)
    netAmountDueMoney: { amount: 56.00, currency: 'USD' } // (grand total)
}