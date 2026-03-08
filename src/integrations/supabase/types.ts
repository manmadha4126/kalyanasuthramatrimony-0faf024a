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
      consultations: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
          phone: string
          preferred_date: string
          preferred_time: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          phone: string
          preferred_date: string
          preferred_time: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string
          preferred_date?: string
          preferred_time?: string
          status?: string
        }
        Relationships: []
      }
      featured_profiles: {
        Row: {
          age: number
          city: string
          created_at: string
          gender: string
          id: string
          name: string
          profession: string
          profile_photo_url: string | null
        }
        Insert: {
          age: number
          city: string
          created_at?: string
          gender: string
          id?: string
          name: string
          profession: string
          profile_photo_url?: string | null
        }
        Update: {
          age?: number
          city?: string
          created_at?: string
          gender?: string
          id?: string
          name?: string
          profession?: string
          profile_photo_url?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profile_interests: {
        Row: {
          admin_notes: string | null
          created_at: string
          from_user_id: string
          id: string
          interest_type: string
          to_profile_id: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          from_user_id: string
          id?: string
          interest_type?: string
          to_profile_id: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          from_user_id?: string
          id?: string
          interest_type?: string
          to_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_interests_to_profile_id_fkey"
            columns: ["to_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_views: {
        Row: {
          id: string
          viewed_at: string
          viewed_profile_id: string
          viewer_user_id: string
        }
        Insert: {
          id?: string
          viewed_at?: string
          viewed_profile_id: string
          viewer_user_id: string
        }
        Update: {
          id?: string
          viewed_at?: string
          viewed_profile_id?: string
          viewer_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_views_viewed_profile_id_fkey"
            columns: ["viewed_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          about_me: string | null
          additional_photos: string[] | null
          annual_income: string | null
          blood_group: string | null
          caste: string | null
          citizenship: string | null
          city: string | null
          company_name: string | null
          complexion: string | null
          country: string
          created_at: string
          date_of_birth: string
          district: string | null
          dosham: string | null
          education: string | null
          education_detail: string | null
          email: string | null
          family_status: string | null
          family_type: string | null
          father_name: string | null
          father_occupation: string | null
          full_name: string
          gender: string
          gothra: string | null
          height_cm: number | null
          horoscope_url: string | null
          id: string
          is_featured: boolean
          marital_status: string
          mother_name: string | null
          mother_occupation: string | null
          mother_tongue: string | null
          native_place: string | null
          occupation: string | null
          partner_expectations: string | null
          phone: string | null
          profile_created_by: string | null
          profile_id: string | null
          profile_photo_url: string | null
          profile_status: string
          raasi: string | null
          religion: string
          residence_type: string | null
          siblings: string | null
          star: string | null
          state: string | null
          sub_caste: string | null
          subscription_type: string
          updated_at: string
          user_id: string | null
          visa_type: string | null
          weight_kg: number | null
          whatsapp: string | null
          working_city: string | null
        }
        Insert: {
          about_me?: string | null
          additional_photos?: string[] | null
          annual_income?: string | null
          blood_group?: string | null
          caste?: string | null
          citizenship?: string | null
          city?: string | null
          company_name?: string | null
          complexion?: string | null
          country?: string
          created_at?: string
          date_of_birth: string
          district?: string | null
          dosham?: string | null
          education?: string | null
          education_detail?: string | null
          email?: string | null
          family_status?: string | null
          family_type?: string | null
          father_name?: string | null
          father_occupation?: string | null
          full_name: string
          gender: string
          gothra?: string | null
          height_cm?: number | null
          horoscope_url?: string | null
          id?: string
          is_featured?: boolean
          marital_status?: string
          mother_name?: string | null
          mother_occupation?: string | null
          mother_tongue?: string | null
          native_place?: string | null
          occupation?: string | null
          partner_expectations?: string | null
          phone?: string | null
          profile_created_by?: string | null
          profile_id?: string | null
          profile_photo_url?: string | null
          profile_status?: string
          raasi?: string | null
          religion?: string
          residence_type?: string | null
          siblings?: string | null
          star?: string | null
          state?: string | null
          sub_caste?: string | null
          subscription_type?: string
          updated_at?: string
          user_id?: string | null
          visa_type?: string | null
          weight_kg?: number | null
          whatsapp?: string | null
          working_city?: string | null
        }
        Update: {
          about_me?: string | null
          additional_photos?: string[] | null
          annual_income?: string | null
          blood_group?: string | null
          caste?: string | null
          citizenship?: string | null
          city?: string | null
          company_name?: string | null
          complexion?: string | null
          country?: string
          created_at?: string
          date_of_birth?: string
          district?: string | null
          dosham?: string | null
          education?: string | null
          education_detail?: string | null
          email?: string | null
          family_status?: string | null
          family_type?: string | null
          father_name?: string | null
          father_occupation?: string | null
          full_name?: string
          gender?: string
          gothra?: string | null
          height_cm?: number | null
          horoscope_url?: string | null
          id?: string
          is_featured?: boolean
          marital_status?: string
          mother_name?: string | null
          mother_occupation?: string | null
          mother_tongue?: string | null
          native_place?: string | null
          occupation?: string | null
          partner_expectations?: string | null
          phone?: string | null
          profile_created_by?: string | null
          profile_id?: string | null
          profile_photo_url?: string | null
          profile_status?: string
          raasi?: string | null
          religion?: string
          residence_type?: string | null
          siblings?: string | null
          star?: string | null
          state?: string | null
          sub_caste?: string | null
          subscription_type?: string
          updated_at?: string
          user_id?: string | null
          visa_type?: string | null
          weight_kg?: number | null
          whatsapp?: string | null
          working_city?: string | null
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          approved_by: string | null
          bride_name: string
          city: string
          created_at: string
          created_by: string | null
          groom_name: string
          id: string
          image_url: string | null
          status: string
          story: string
        }
        Insert: {
          approved_by?: string | null
          bride_name: string
          city: string
          created_at?: string
          created_by?: string | null
          groom_name: string
          id?: string
          image_url?: string | null
          status?: string
          story: string
        }
        Update: {
          approved_by?: string | null
          bride_name?: string
          city?: string
          created_at?: string
          created_by?: string | null
          groom_name?: string
          id?: string
          image_url?: string | null
          status?: string
          story?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_profile_on_register:
        | {
            Args: {
              p_annual_income?: string
              p_caste?: string
              p_city?: string
              p_company_name?: string
              p_country?: string
              p_date_of_birth?: string
              p_dosham?: string
              p_education?: string
              p_education_detail?: string
              p_email: string
              p_family_status?: string
              p_family_type?: string
              p_father_name?: string
              p_father_occupation?: string
              p_full_name: string
              p_gender: string
              p_gothra?: string
              p_height_cm?: number
              p_marital_status?: string
              p_mother_name?: string
              p_mother_occupation?: string
              p_mother_tongue?: string
              p_native_place?: string
              p_occupation?: string
              p_phone: string
              p_profile_created_by?: string
              p_profile_photo_url?: string
              p_raasi?: string
              p_religion?: string
              p_siblings?: string
              p_star?: string
              p_state?: string
              p_sub_caste?: string
              p_user_id: string
              p_whatsapp?: string
            }
            Returns: string
          }
        | {
            Args: {
              p_annual_income?: string
              p_caste?: string
              p_citizenship?: string
              p_city?: string
              p_company_name?: string
              p_country?: string
              p_date_of_birth?: string
              p_dosham?: string
              p_education?: string
              p_education_detail?: string
              p_email: string
              p_family_status?: string
              p_family_type?: string
              p_father_name?: string
              p_father_occupation?: string
              p_full_name: string
              p_gender: string
              p_gothra?: string
              p_height_cm?: number
              p_marital_status?: string
              p_mother_name?: string
              p_mother_occupation?: string
              p_mother_tongue?: string
              p_native_place?: string
              p_occupation?: string
              p_phone: string
              p_profile_created_by?: string
              p_profile_photo_url?: string
              p_raasi?: string
              p_religion?: string
              p_residence_type?: string
              p_siblings?: string
              p_star?: string
              p_state?: string
              p_sub_caste?: string
              p_user_id: string
              p_visa_type?: string
              p_whatsapp?: string
            }
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
    Enums: {},
  },
} as const
