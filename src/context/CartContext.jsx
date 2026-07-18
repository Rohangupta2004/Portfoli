import { createContext, useContext, useReducer } from 'react'

const Ctx = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find((i) => i.id === action.payload.id)
      if (exists)
        return { ...state, items: state.items.map((i) => (i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i)), isOpen: true }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }], isOpen: true }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) }
    case 'UPDATE_QTY':
      return { ...state, items: state.items.map((i) => (i.id === action.payload.id ? { ...i, qty: Math.max(1, action.payload.qty) } : i)) }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false })
  const total = state.items.reduce((a, i) => a + i.price * i.qty, 0)
  const count = state.items.reduce((a, i) => a + i.qty, 0)
  return <Ctx.Provider value={{ ...state, total, count, dispatch }}>{children}</Ctx.Provider>
}

export const useCart = () => useContext(Ctx)
