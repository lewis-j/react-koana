import {
  chocolate,
  coffee_dark,
  coffee_light,
  merch,
  tea_earl,
  tea_green,
} from "../assets/images/products";

export const imagesData = [
  {
    id: 0,
    cat: "coffee",
    image: coffee_dark,
    name: "Koana Speciality Med-Dark Roast",
    price: 30,
    weight: 7,
    unit: "oz",
    desc: "Koana House Roasted Med-Dark Ka'u coffee",
  },
  {
    id: 1,
    cat: "coffee",
    image: coffee_light,
    name: "Koana Speciality Med-Light Roast",
    price: 30,
    weight: 7,
    unit: "oz",
    desc: "Koana House Roasted Med-Light Ka'u coffee",
  },
  {
    id: 2,
    cat: "tea",
    image: tea_green,
    name: "Koana's Volcano Green Tea",
    price: 19,
    weight: 20,
    unit: "g",
    desc: "Light gentle Volcano Green Tea from Second Alarm Farm",
  },
  {
    id: 3,
    cat: "tea",
    image: tea_earl,
    name: "Koana's Volcano Earl Grey Tea",
    price: 19,
    weight: 20,
    unit: "g",
    desc: "Refreshing Volcano Earl Grey Tea from Second Alarm Farm",
  },
  {
    id: 4,
    cat: "food",
    image: chocolate,
    name: "Chocolate Lava Mix",
    price: 18,
    weight: 150,
    unit: "g",
    desc: "Koana's own special belnd of spicy chocolate mix, vegan-friendly",
  },
  {
    id: 5,
    cat: "merch",
    image: merch,
    name: "Koana's Coffee Flower",
    price: 16,
    weight: undefined,
    unit: undefined,
    desc: "Pin exclusively designed for Koana, exactly size of a coffee flower blossom, so you can share your love for coffee and nature wherever you go.",
  },
];
