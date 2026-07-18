import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const Ctx = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signIn = (email, pw) => supabase.auth.signInWithPassword({ email, password: pw })
  const signUp = (email, pw) => supabase.auth.signUp({ email, password: pw })
  const signOut = () => supabase.auth.signOut()

  return <Ctx.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)
