import { useContext } from "react"
import { AppContext } from "../App"

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext)
  const totalPrice = cartItems.reduce((a, b) => a + b.price, 0)

  return { cartItems, setCartItems, totalPrice }
}
