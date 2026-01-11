export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      activity_streaks: {
        Row: {
          current_streak: number
          id: string
          last_activity_date: string | null
          longest_streak: number
          total_days: number
          updated_at: string
          user_id: string
        }
        Insert: {
          current_streak?: number
          id?: string
          last_activity_date?: string | null
          longest_streak?: number
          total_days?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          current_streak?: number
          id?: string
          last_activity_date?: string | null
          longest_streak?: number
          total_days?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      affirmations: {
        Row: {
          category: string | null
          created_at: string
          id: string
          is_active: boolean
          message: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          message: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          message?: string
        }
        Relationships: []
      }
      gentle_notes: {
        Row: {
          created_at: string
          from_user_id: string
          id: string
          message: string
          to_user_id: string
        }
        Insert: {
          created_at?: string
          from_user_id: string
          id?: string
          message: string
          to_user_id: string
        }
        Update: {
          created_at?: string
          from_user_id?: string
          id?: string
          message?: string
          to_user_id?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          allow_reader_access: boolean
          bookmark: Database["public"]["Enums"]["bookmark_type"] | null
          created_at: string
          entry_date: string
          help_request: Database["public"]["Enums"]["help_request_type"] | null
          id: string
          letter_to_self: string | null
          mood: Database["public"]["Enums"]["mood_type"] | null
          mood_intensity: number | null
          night_reflection: string | null
          no_words_today: boolean
          sweet_moments: string | null
          taking_space: boolean
          things_that_hurt: string | null
          thoughts_on_mind: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          allow_reader_access?: boolean
          bookmark?: Database["public"]["Enums"]["bookmark_type"] | null
          created_at?: string
          entry_date?: string
          help_request?: Database["public"]["Enums"]["help_request_type"] | null
          id?: string
          letter_to_self?: string | null
          mood?: Database["public"]["Enums"]["mood_type"] | null
          mood_intensity?: number | null
          night_reflection?: string | null
          no_words_today?: boolean
          sweet_moments?: string | null
          taking_space?: boolean
          things_that_hurt?: string | null
          thoughts_on_mind?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          allow_reader_access?: boolean
          bookmark?: Database["public"]["Enums"]["bookmark_type"] | null
          created_at?: string
          entry_date?: string
          help_request?: Database["public"]["Enums"]["help_request_type"] | null
          id?: string
          letter_to_self?: string | null
          mood?: Database["public"]["Enums"]["mood_type"] | null
          mood_intensity?: number | null
          night_reflection?: string | null
          no_words_today?: boolean
          sweet_moments?: string | null
          taking_space?: boolean
          things_that_hurt?: string | null
          thoughts_on_mind?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      morning_messages: {
        Row: {
          created_at: string
          created_by: string | null
          date: string
          id: string
          message: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          date?: string
          id?: string
          message: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          date?: string
          id?: string
          message?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      writer_settings: {
        Row: {
          allow_gentle_notes: boolean
          created_at: string
          id: string
          taking_space_until: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          allow_gentle_notes?: boolean
          created_at?: string
          id?: string
          taking_space_until?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          allow_gentle_notes?: boolean
          created_at?: string
          id?: string
          taking_space_until?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_reader: { Args: { _user_id: string }; Returns: boolean }
      is_writer: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      bookmark_type: "mattered" | "heavy" | "gentle"
      help_request_type:
        | "just_needed_to_write"
        | "maybe_later"
        | "yes_need_help"
      mood_type:
        | "happy"
        | "tired"
        | "overthinking"
        | "hurt"
        | "hopeful"
        | "quiet"
      user_role: "writer" | "reader" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      bookmark_type: ["mattered", "heavy", "gentle"],
      help_request_type: [
        "just_needed_to_write",
        "maybe_later",
        "yes_need_help",
      ],
      mood_type: ["happy", "tired", "overthinking", "hurt", "hopeful", "quiet"],
      user_role: ["writer", "reader", "admin"],
    },
  },
} as const
