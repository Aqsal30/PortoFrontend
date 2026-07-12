import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      order: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? {
                      ...cartItem,
                      quantity:
                        cartItem.quantity + item.quantity,
                    }
                  : cartItem
              )
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

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((cartItem) =>
          cartItem.id === id 
          ?{
            ...cartItem,
            quantity: cartItem.quantity + 1,
          } 
          : cartItem
          ),
        })),
        
      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((cartItem) =>
          cartItem.id === id 
          ?{
            ...cartItem,
            quantity: cartItem.quantity - 1,
          } 
          : cartItem
          ).filter((cartItem) => cartItem.quantity > 0)
        })),
        
      clearCart: () => set((state) => ({
        cart: []
      })),

      savedOrder: (OrderId) => 
        set((state) => ({
          order: [
            ...state.order,
            {
              OrderId,
              Tanggal: new Date().toLocaleString("id-ID"),
            }
          ]
        })),

      clearOrder: () => set((state) => ({
        order: []
      }))
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;