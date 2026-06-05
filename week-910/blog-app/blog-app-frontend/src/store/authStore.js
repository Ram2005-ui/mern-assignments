import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export const useAuth = create(
  persist(
    (set) => ({
      currentUser: null,
      loading: false,
      isAuthenticated: false,
      error: null,
      hasCheckedAuth:false,

      // Login: POST /common-api/authenticate
      // On success: stores user object and sets isAuthenticated = true
      login: async (userCredWithRole) => {
        const { role, ...userCredObj } = userCredWithRole // strip role if present
        console.log("LOGIN called with:", userCredObj)          // ← add
  console.log("Hitting URL:", `${API_BASE_URL}/common-api/authenticate`) 
        try {
          set({ loading: true, error: null })
          let res = await axios.post(
            `${API_BASE_URL}/common-api/authenticate`,
            userCredObj,
            { withCredentials: true }
          )
          console.log("LOGIN success:", res.data)
          // Store the logged-in user and mark as authenticated
          set({
            loading: false,
            isAuthenticated: true,
            currentUser: res.data.payload,
            hasCheckedAuth:true
          })
        } catch (err) {
          console.log("LOGIN error:", err)                      // ← add
    console.log("LOGIN error response:", err.response)
          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            hasCheckedAuth:true,
            error: err.response?.data?.error || err.response?.data?.message || 'Login Failed',
          })
        }
      },

      // Logout: GET /common-api/logout
      // Clears the httpOnly cookie on the backend
      // On success: resets all auth state (BUG FIX: was incorrectly setting isAuthenticated:true)
      logout: async () => {
        try {
          set({ loading: true, error: null })
          await axios.get(`${API_BASE_URL}/common-api/logout`, {
            withCredentials: true,
          })
          // Clear auth state — user is now logged out
          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            hasCheckedAuth:true
          })
        } catch (err) {
          // Even if the API call fails, clear the local state
          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            hasCheckedAuth:true,
            error: err.response?.data?.error || err.response?.data?.message || 'Logout Failed',
          })
        }
      },
      // authStore.js — add inside the store
      clearError: () => set({ error: null }),
      checkAuth: async () => {
        try {
          set({ loading: true, error: null })
          let res = await axios.get(`${API_BASE_URL}/common-api/check-auth`, {
            withCredentials: true,
          })
          if (res.data.authenticated) {
            set({
              loading: false,
              isAuthenticated: true,
              currentUser: res.data.payload,
              hasCheckedAuth: true,
            })
          } else {
            set({
              loading: false,
              isAuthenticated: false,
              currentUser: null,
              hasCheckedAuth: true,
            })
          }
        } catch (err) {
          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            hasCheckedAuth: true,
            error: err.response?.data?.error || err.response?.data?.message || 'Check auth failed',
          })
        }
      },
    }),
    {
      // persist middleware: saves selected fields to localStorage
      // This solves the "page refresh" problem — state is restored from localStorage
      name: 'blog-auth-storage', // key used in localStorage
      partialize: (state) => ({
        // Only persist these fields; exclude loading/error and functions
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)