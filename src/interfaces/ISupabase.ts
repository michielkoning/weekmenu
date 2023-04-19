export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      recipe_ingredients: {
        Row: {
          amount: number | null
          id: string
          inserted_at: string
          recipe: string | null
          title: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          id?: string
          inserted_at?: string
          recipe?: string | null
          title: string
          user_id: string
        }
        Update: {
          amount?: number | null
          id?: string
          inserted_at?: string
          recipe?: string | null
          title?: string
          user_id?: string
        }
      }
      recipes: {
        Row: {
          content: string[] | null
          id: string
          ingredients: Json | null
          inserted_at: string
          persons: number
          preperationTime: number
          source: string | null
          title: string
          user_id: string
        }
        Insert: {
          content?: string[] | null
          id?: string
          ingredients?: Json | null
          inserted_at?: string
          persons?: number
          preperationTime?: number
          source?: string | null
          title: string
          user_id: string
        }
        Update: {
          content?: string[] | null
          id?: string
          ingredients?: Json | null
          inserted_at?: string
          persons?: number
          preperationTime?: number
          source?: string | null
          title?: string
          user_id?: string
        }
      }
      weekmenu: {
        Row: {
          id: string
          inserted_at: string
          user_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          user_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          user_id?: string
        }
      }
      weekmenu_recipes: {
        Row: {
          id: string
          inserted_at: string
          recipe: string | null
          user_id: string
          weekmenu: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          recipe?: string | null
          user_id: string
          weekmenu: string
        }
        Update: {
          id?: string
          inserted_at?: string
          recipe?: string | null
          user_id?: string
          weekmenu?: string
        }
      }
    }
    Views: {
      transcripts: {
        Row: {
          title: string | null
        }
        Insert: {
          title?: string | null
        }
        Update: {
          title?: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
