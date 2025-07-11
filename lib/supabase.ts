import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface UserFeedback {
  id?: number
  name: string
  career: string
  faculty: string
  opinion: "Regular" | "Bueno" | "Excelente"
}

// Función para insertar feedback
export async function insertFeedback(feedback: Omit<UserFeedback, "id">) {
  const { data, error } = await supabase.from("user_feedback").insert([feedback]).select()

  if (error) {
    throw error
  }

  return data
}
