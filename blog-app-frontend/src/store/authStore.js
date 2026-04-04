import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

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
        try {
          set({ loading: true, error: null })
          let res = await axios.post(
            'http://localhost:4000/common-api/authenticate',
            userCredObj,
            { withCredentials: true }
          )
          // Store the logged-in user and mark as authenticated
          set({
            loading: false,
            isAuthenticated: true,
            currentUser: res.data.payload,
            hasCheckedAuth:true
          })
        } catch (err) {
          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            hasCheckedAuth:true,
            error: err.response?.data?.error || 'Login Failed',
          })
        }
      },

      // Logout: GET /common-api/logout
      // Clears the httpOnly cookie on the backend
      // On success: resets all auth state (BUG FIX: was incorrectly setting isAuthenticated:true)
      logout: async () => {
        try {
          set({ loading: true, error: null })
          await axios.get('http://localhost:4000/common-api/logout', {
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
            error: err.response?.data?.error || 'Logout Failed',
          })
        }
      },
      checkAuth: async () => {
        try {
          set({ loading: true, error: null })
          let res = await axios.get('http://localhost:4000/common-api/check-auth', {
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
            error: err.response?.data?.message || 'Check auth failed',
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
        hasCheckedAuth:state.hasCheckedAuth
      }),
    }
  )
)