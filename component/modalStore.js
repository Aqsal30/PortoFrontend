import {create} from "zustand"
import { persist } from "zustand/middleware"

const useModalStore = create(
    persist(
        (set) => ({
            cart: [],

            addToCart: (item) =>
                set((state) => {
                    const ExistItem = state.cart.find(
                        (CartItem) => CartItem.id == item.id
                    );
                    if (ExistItem) {
                        return {
                            cart: state.cart.map((CartItem) =>
                                CartItem.id === item.id
                                ?{
                                    ...CartItemtem,
                                    quantity:
                                        CartItem.quantity + item.quantity,
                                }
                                : CartItem
                            ),
                        };
                    }

                    return {
                        cart: [
                            ...state.cart,
                            {
                                ...item,
                            },
                        ],
                    };
                }),
            
            removeFromCart: (id) =>
                set((state) => ({
                    cart: state.cart.filter(
                        (item) => item.id !== id
                    ),
                })),
        }),
        {
            name: "cart",
        }
    )
);

export default useModalStore;