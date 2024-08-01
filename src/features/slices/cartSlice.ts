import { Tables } from "@/database.types";
import { PizzaSize } from "@/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CartItems {
  id: number;
  image: string | null;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  size: PizzaSize | null;
}

export interface CartProps {
  cartItems: CartItems[];
  totalAmount: number;
  totalQuantity: number;
  sizes: PizzaSize | null;
  isPizza: boolean;
  togglePriceWithSize: number | null;
}
export interface CartProductProps {
  product: Tables<"products">;
  size: PizzaSize | null;
}
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  sizes: null,
  isPizza: false,
  togglePriceWithSize: null,
} as CartProps;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: CartProps, action: PayloadAction<CartProductProps>) {
      const { product, size } = action.payload;
      // check if product is in the cart

      const item: CartItems | undefined = state.cartItems.find(
        (p) => p.id === product.id
      );
      state.totalQuantity++;

      if (!item) {
        state.cartItems.push({
          id: product.id,
          image: product.image,
          name: product.name,
          price: state.togglePriceWithSize
            ? state.togglePriceWithSize
            : product.price,
          quantity: 1,
          totalPrice: product.price,
          size: state.isPizza ? (state.sizes ? state.sizes : "XL") : null,
        });
      } else {
        item.quantity++;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    deleteProduct(state: CartProps, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      // check if the product is in the cart
      const item = state.cartItems.find((p) => p.id === id);
      if (item) {
        state.cartItems = state.cartItems.filter((i) => i.id !== id);
      }
    },
    increaseQuantity(state: CartProps, action: PayloadAction<CartItems>) {
      const product = action.payload;
      // check if the item exists
      const existingItem = state.cartItems.find((p) => p.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
        state.totalAmount = state.totalAmount + existingItem.price;
      }
    },

    decreaseQuantity(state: CartProps, action: PayloadAction<CartItems>) {
      const product = action.payload;
      // check if the item exists
      const existingItem = state.cartItems.find((p) => p.id === product.id);
      if (existingItem) {
        if (existingItem.quantity > 0) {
          existingItem.quantity--;
          state.totalQuantity--;
          state.totalAmount = state.totalAmount - existingItem.price;
        }
        if (existingItem.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id != existingItem.id
          );
        }
      }
    },
    selectSize(
      state: CartProps,
      action: PayloadAction<{
        size: PizzaSize | null;
        product: Tables<"products">;
      }>
    ) {
      const { size, product } = action.payload;

      state.sizes = size;
      // check if the product exist
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        existingItem.size = size as PizzaSize;
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.sizes = "M";
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },

    updateCartTotalAfterSizeChange(state, action) {
      const { newTotal, changedItem, price } = action.payload;
      state.totalAmount = newTotal;

      const existingItem = state.cartItems.find((i) => i.id === changedItem.id);
      if (existingItem) {
        existingItem.price = price;
      }
    },
    setIsPizza(state, action: PayloadAction<{ isPizza: boolean }>) {
      const { isPizza } = action.payload;

      state.isPizza = isPizza;
    },
    setTogglePriceDependingOnSize(
      state,
      action: PayloadAction<{ price: number | null }>
    ) {
      const { price } = action.payload;

      state.togglePriceWithSize = price;
    },
  },
});

export const {
  addToCart,
  deleteProduct,
  increaseQuantity,
  decreaseQuantity,
  selectSize,
  clearCart,
  updateCartTotalAfterSizeChange,
  setIsPizza,
  setTogglePriceDependingOnSize,
} = cartSlice.actions;

export default cartSlice.reducer;
