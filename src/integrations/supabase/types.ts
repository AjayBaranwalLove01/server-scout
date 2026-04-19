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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      servers: {
        Row: {
          affected_groups: Json
          alive: string
          backup_details_url: string
          build_date: string
          build_engineer: string
          business_function: string
          created_at: string
          day: string
          design_engineer: string
          domain: string
          essential8: string
          id: string
          ilo: string
          internet_facing: string
          ip_address: string
          is_patched: string
          last_collated: string
          location: string
          maintenance_comment: string
          model: string
          network: string
          notes: string
          os: string
          os_support_ends: string
          patch_category: string
          patch_contact: string
          patch_notes: string
          patch_sequence: string
          pci_asset: string
          primary_group_id: string | null
          priority: string
          serial_number: string
          server_description: string
          server_name: string
          soci_asset: string
          software_installed_url: string
          status: string
          time: string
          updated_at: string
        }
        Insert: {
          affected_groups?: Json
          alive?: string
          backup_details_url?: string
          build_date?: string
          build_engineer?: string
          business_function?: string
          created_at?: string
          day?: string
          design_engineer?: string
          domain?: string
          essential8?: string
          id: string
          ilo?: string
          internet_facing?: string
          ip_address?: string
          is_patched?: string
          last_collated?: string
          location?: string
          maintenance_comment?: string
          model?: string
          network?: string
          notes?: string
          os?: string
          os_support_ends?: string
          patch_category?: string
          patch_contact?: string
          patch_notes?: string
          patch_sequence?: string
          pci_asset?: string
          primary_group_id?: string | null
          priority?: string
          serial_number?: string
          server_description?: string
          server_name: string
          soci_asset?: string
          software_installed_url?: string
          status?: string
          time?: string
          updated_at?: string
        }
        Update: {
          affected_groups?: Json
          alive?: string
          backup_details_url?: string
          build_date?: string
          build_engineer?: string
          business_function?: string
          created_at?: string
          day?: string
          design_engineer?: string
          domain?: string
          essential8?: string
          id?: string
          ilo?: string
          internet_facing?: string
          ip_address?: string
          is_patched?: string
          last_collated?: string
          location?: string
          maintenance_comment?: string
          model?: string
          network?: string
          notes?: string
          os?: string
          os_support_ends?: string
          patch_category?: string
          patch_contact?: string
          patch_notes?: string
          patch_sequence?: string
          pci_asset?: string
          primary_group_id?: string | null
          priority?: string
          serial_number?: string
          server_description?: string
          server_name?: string
          soci_asset?: string
          software_installed_url?: string
          status?: string
          time?: string
          updated_at?: string
        }
        Relationships: []
      }
      support_groups: {
        Row: {
          created_at: string
          id: string
          manager: string
          members: string[]
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          manager: string
          members?: string[]
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          manager?: string
          members?: string[]
          name?: string
          updated_at?: string
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
