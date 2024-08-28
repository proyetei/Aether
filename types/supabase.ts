export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      entries: {
        Row: {
          created_at: string
          entry: string
          id: number
          question: string | null
          answer: string | null
          selection: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          entry: string
          id?: number
          question?: string | null
          answer?: string | null
          selection: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          entry?: string
          id?: number
          question?: string | null
          answer?: string | null
          selection?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]