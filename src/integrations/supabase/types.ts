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
      articles: {
        Row: {
          categorie: string
          date_ajout: string | null
          description: string | null
          id: string
          nom: string
          quantite: number
          unite: string | null
        }
        Insert: {
          categorie: string
          date_ajout?: string | null
          description?: string | null
          id?: string
          nom: string
          quantite?: number
          unite?: string | null
        }
        Update: {
          categorie?: string
          date_ajout?: string | null
          description?: string | null
          id?: string
          nom?: string
          quantite?: number
          unite?: string | null
        }
        Relationships: []
      }
      articles_sortie: {
        Row: {
          article_id: string
          bon_id: string
          categorie: string
          id: string
          nom: string
          quantite: number
        }
        Insert: {
          article_id: string
          bon_id: string
          categorie: string
          id?: string
          nom: string
          quantite: number
        }
        Update: {
          article_id?: string
          bon_id?: string
          categorie?: string
          id?: string
          nom?: string
          quantite?: number
        }
        Relationships: [
          {
            foreignKeyName: "articles_sortie_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_sortie_bon_id_fkey"
            columns: ["bon_id"]
            isOneToOne: false
            referencedRelation: "bons_sortie"
            referencedColumns: ["id"]
          },
        ]
      }
      bons_sortie: {
        Row: {
          date: string | null
          demandeur: string | null
          formatted_number: string | null
          id: string
          motif: string | null
        }
        Insert: {
          date?: string | null
          demandeur?: string | null
          formatted_number?: string | null
          id?: string
          motif?: string | null
        }
        Update: {
          date?: string | null
          demandeur?: string | null
          formatted_number?: string | null
          id?: string
          motif?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          description: string | null
          id: string
          nom: string
        }
        Insert: {
          description?: string | null
          id?: string
          nom: string
        }
        Update: {
          description?: string | null
          id?: string
          nom?: string
        }
        Relationships: []
      }
      demandeurs: {
        Row: {
          departement: string | null
          id: string
          nom: string
        }
        Insert: {
          departement?: string | null
          id?: string
          nom: string
        }
        Update: {
          departement?: string | null
          id?: string
          nom?: string
        }
        Relationships: []
      }
      mouvements: {
        Row: {
          article_id: string
          date: string | null
          id: string
          quantite: number
          reference_source: string | null
          source: string
          type: string
        }
        Insert: {
          article_id: string
          date?: string | null
          id?: string
          quantite: number
          reference_source?: string | null
          source: string
          type: string
        }
        Update: {
          article_id?: string
          date?: string | null
          id?: string
          quantite?: number
          reference_source?: string | null
          source?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "mouvements_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
