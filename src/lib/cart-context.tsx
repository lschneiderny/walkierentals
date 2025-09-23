"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { CartItem, CartState } from "./types";

type CartAction =
  | { type: "add"; item: CartItem }
  | { type: "remove"; productSlug: string; startDate: string; endDate: string }
  | { type: "updateQty"; productSlug: string; startDate: string; endDate: string; quantity: number }
  | { type: "replace"; state: CartState };

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const existingIndex = state.items.findIndex(
        (i) => i.productSlug === action.item.productSlug && i.startDate === action.item.startDate && i.endDate === action.item.endDate
      );
      if (existingIndex >= 0) {
        const next = [...state.items];
        next[existingIndex] = { ...next[existingIndex], quantity: next[existingIndex].quantity + action.item.quantity };
        return { items: next };
      }
      return { items: [...state.items, action.item] };
    }
    case "remove": {
      return {
        items: state.items.filter(
          (i) => !(i.productSlug === action.productSlug && i.startDate === action.startDate && i.endDate === action.endDate)
        ),
      };
    }
    case "updateQty": {
      return {
        items: state.items.map((i) =>
          i.productSlug === action.productSlug && i.startDate === action.startDate && i.endDate === action.endDate
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case "replace":
      return action.state;
    default:
      return state;
  }
}

type CartContextValue = {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (productSlug: string, startDate: string, endDate: string) => void;
  updateQuantity: (productSlug: string, startDate: string, endDate: string, quantity: number) => void;
  totalQuantity: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "walkierentals.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        dispatch({ type: "replace", state: parsed });
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (item: CartItem) => dispatch({ type: "add", item });
    const removeItem = (productSlug: string, startDate: string, endDate: string) =>
      dispatch({ type: "remove", productSlug, startDate, endDate });
    const updateQuantity = (productSlug: string, startDate: string, endDate: string, quantity: number) =>
      dispatch({ type: "updateQty", productSlug, startDate, endDate, quantity });
    const totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
    return { state, addItem, removeItem, updateQuantity, totalQuantity };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


