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
            (cartItem) => 
              cartItem.menu_id === item.menu_id &&
              JSON.stringify(cartItem.option) === JSON.stringify(item.option)
          );

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === existingItem.id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + item.quantity,
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
                id : crypto.randomUUID()
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