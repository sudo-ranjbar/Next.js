"use client"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: []
}

export const cartSlice = createSlice({

    name: "cart",

    initialState: initialState,

    reducers: {

        addToCart: (state, action) => {

            const { product, qty } = action.payload

            state.cart = [...state.cart, { ...product, qty: qty }]

        },

        removeFromCart: (state, action) => {

            state.cart = state.cart.filter(p => p.id !== action.payload)

        },

        clearCart: (state) => {

            state.cart = []

        },

        increment: (state, action) => {

            state.cart = state.cart.map(p => p.id === action.payload ? { ...p, qty: p.qty + 1 } : p)

        },

        decrement: (state, action) => {

            state.cart = state.cart.map(p => p.id === action.payload ? { ...p, qty: p.qty - 1 } : p)

        },
    }
})

export const { addToCart, removeFromCart, increment, decrement, clearCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer
export const totalCartAmount = ({ shoppingCart }) => {
    return shoppingCart.cart.reduce((total, product) => {
        return product.is_sale ? total + (product.sale_price * product.qty) : total + (product.price * product.qty)
    }, 0)
}