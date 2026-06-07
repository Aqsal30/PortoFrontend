import { create } from "zustand"

const useMenuStore = create((set) => ({
  category: "coffee",

  setCategory: (category) =>
    set({ category })
}))

export default useMenuStore