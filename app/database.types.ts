export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.2 (db9da0b)"
  }
  public: {
    Tables: {
      comp_basis: {
        Row: {
          address: string
          created_at: string
          id: string
          latitude: string
          longitude: string
          profile_id: string
          scan_id: string
          status: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          latitude: string
          longitude: string
          profile_id: string
          scan_id: string
          status?: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          latitude?: string
          longitude?: string
          profile_id?: string
          scan_id?: string
          status?: string
        }
        Relationships: []
      }
      comps: {
        Row: {
          comp_basis_id: string | null
          created_at: string
          id: string
          listing_id: string
          ninety_day: number | null
          overall_occupancy: number | null
          profile_id: string
          scan_id: string
          sixty_day: number | null
          thirty_day: number | null
        }
        Insert: {
          comp_basis_id?: string | null
          created_at?: string
          id?: string
          listing_id: string
          ninety_day?: number | null
          overall_occupancy?: number | null
          profile_id: string
          scan_id: string
          sixty_day?: number | null
          thirty_day?: number | null
        }
        Update: {
          comp_basis_id?: string | null
          created_at?: string
          id?: string
          listing_id?: string
          ninety_day?: number | null
          overall_occupancy?: number | null
          profile_id?: string
          scan_id?: string
          sixty_day?: number | null
          thirty_day?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comps_comp_basis_id_fkey"
            columns: ["comp_basis_id"]
            isOneToOne: false
            referencedRelation: "comp_basis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comps_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comps_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "comp_basis"
            referencedColumns: ["scan_id"]
          },
        ]
      }
      comps_analysis: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          property_id: string
          summary: Json
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          property_id: string
          summary: Json
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          property_id?: string
          summary?: Json
        }
        Relationships: [
          {
            foreignKeyName: "comps_analysis_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comps_analysis_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "str_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      features: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          name?: string | null
        }
        Relationships: []
      }
      listing_feedback_usage: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          property_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          property_id: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_feedback_usage_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_feedback_usage_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "str_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          created_at: string
          external_listing_id: string | null
          id: string
          listed_on: string | null
          profile_id: string | null
          property_id: string | null
        }
        Insert: {
          created_at?: string
          external_listing_id?: string | null
          id?: string
          listed_on?: string | null
          profile_id?: string | null
          property_id?: string | null
        }
        Update: {
          created_at?: string
          external_listing_id?: string | null
          id?: string
          listed_on?: string | null
          profile_id?: string | null
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      llm_usage: {
        Row: {
          completion_tokens: number | null
          cost: string | null
          created_at: string
          id: string
          llm_name: string | null
          name: string | null
          prompt_tokens: number | null
          run_id: string | null
          total_tokens: number | null
        }
        Insert: {
          completion_tokens?: number | null
          cost?: string | null
          created_at?: string
          id?: string
          llm_name?: string | null
          name?: string | null
          prompt_tokens?: number | null
          run_id?: string | null
          total_tokens?: number | null
        }
        Update: {
          completion_tokens?: number | null
          cost?: string | null
          created_at?: string
          id?: string
          llm_name?: string | null
          name?: string | null
          prompt_tokens?: number | null
          run_id?: string | null
          total_tokens?: number | null
        }
        Relationships: []
      }
      market_spy_runs: {
        Row: {
          address: string | null
          assessment_time_ms: number | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          execution_time_ms: number | null
          geocode: string | null
          id: string
          listings_assessed: number | null
          listings_found: number | null
          profile_id: string | null
          scan_id: string | null
          scraping_time_ms: number | null
          started_at: string | null
          status: string | null
          target_listings: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          assessment_time_ms?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          geocode?: string | null
          id?: string
          listings_assessed?: number | null
          listings_found?: number | null
          profile_id?: string | null
          scan_id?: string | null
          scraping_time_ms?: number | null
          started_at?: string | null
          status?: string | null
          target_listings?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          assessment_time_ms?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          geocode?: string | null
          id?: string
          listings_assessed?: number | null
          listings_found?: number | null
          profile_id?: string | null
          scan_id?: string | null
          scraping_time_ms?: number | null
          started_at?: string | null
          status?: string | null
          target_listings?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "market_spy_runs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          active: boolean | null
          created_at: string
          description: string | null
          id: string
          key: string
          name: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          key: string
          name?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          name?: string | null
        }
        Relationships: []
      }
      plans_features_map: {
        Row: {
          created_at: string
          feature_id: string | null
          id: string
          plan_id: string | null
        }
        Insert: {
          created_at?: string
          feature_id?: string | null
          id?: string
          plan_id?: string | null
        }
        Update: {
          created_at?: string
          feature_id?: string | null
          id?: string
          plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plans_features_map_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "features"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plans_features_map_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          billing_type: string | null
          current_period_end: string | null
          current_period_start: string | null
          current_tier: string | null
          full_name: string | null
          id: string
          listings_purchased: number | null
          market_spy_listings_limit: number | null
          market_spy_listings_used: number | null
          notification_preference: string | null
          plan_id: string | null
          primary_email: string | null
          primary_phone: string | null
          purchase_date: string | null
          secondary_email: string | null
          secondary_phone: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_quantity: number | null
          subscription_status: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          billing_type?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          current_tier?: string | null
          full_name?: string | null
          id: string
          listings_purchased?: number | null
          market_spy_listings_limit?: number | null
          market_spy_listings_used?: number | null
          notification_preference?: string | null
          plan_id?: string | null
          primary_email?: string | null
          primary_phone?: string | null
          purchase_date?: string | null
          secondary_email?: string | null
          secondary_phone?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_quantity?: number | null
          subscription_status?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          billing_type?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          current_tier?: string | null
          full_name?: string | null
          id?: string
          listings_purchased?: number | null
          market_spy_listings_limit?: number | null
          market_spy_listings_used?: number | null
          notification_preference?: string | null
          plan_id?: string | null
          primary_email?: string | null
          primary_phone?: string | null
          purchase_date?: string | null
          secondary_email?: string | null
          secondary_phone?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_quantity?: number | null
          subscription_status?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string | null
          notification_preference: string | null
          primary_contact: string | null
          primary_email: string | null
          primary_phone: string | null
          profile_id: string | null
          secondary_contact: string | null
          secondary_email: string | null
          secondary_phone: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          notification_preference?: string | null
          primary_contact?: string | null
          primary_email?: string | null
          primary_phone?: string | null
          profile_id?: string | null
          secondary_contact?: string | null
          secondary_email?: string | null
          secondary_phone?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          notification_preference?: string | null
          primary_contact?: string | null
          primary_email?: string | null
          primary_phone?: string | null
          profile_id?: string | null
          secondary_contact?: string | null
          secondary_email?: string | null
          secondary_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_ratings: {
        Row: {
          created_at: string
          id: string
          modified_at: string | null
          property_id: string
          ratings: Json
        }
        Insert: {
          created_at?: string
          id?: string
          modified_at?: string | null
          property_id: string
          ratings: Json
        }
        Update: {
          created_at?: string
          id?: string
          modified_at?: string | null
          property_id?: string
          ratings?: Json
        }
        Relationships: [
          {
            foreignKeyName: "property_ratings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "str_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      scan_mismatches: {
        Row: {
          created_at: string
          id: number
          message: string | null
          mismatch_date: string | null
          profile_id: string | null
          property_id: string | null
          scan_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
          mismatch_date?: string | null
          profile_id?: string | null
          property_id?: string | null
          scan_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
          mismatch_date?: string | null
          profile_id?: string | null
          property_id?: string | null
          scan_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "scan_mismatches_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scan_mismatches_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scan_mismatches_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "scans"
            referencedColumns: ["id"]
          },
        ]
      }
      scans: {
        Row: {
          created_at: string
          has_mismatch: boolean | null
          id: number
          profile_id: string | null
          property_id: string | null
        }
        Insert: {
          created_at?: string
          has_mismatch?: boolean | null
          id?: number
          profile_id?: string | null
          property_id?: string | null
        }
        Update: {
          created_at?: string
          has_mismatch?: boolean | null
          id?: number
          profile_id?: string | null
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scans_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scans_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      str_properties: {
        Row: {
          address: string | null
          amenities: Json | null
          average_rating: number | null
          bedrooms: string | null
          cancellation_policy: string | null
          city: string | null
          comp_id: string | null
          created_at: string
          description: string | null
          external_id: string
          hero_image_link: string | null
          id: string
          instant_book: boolean | null
          is_comp: boolean | null
          is_parent: boolean | null
          other_image_links: Json | null
          parent_id: string | null
          pets: string | null
          policies: string | null
          review_count: number | null
          state: string | null
          title: string
          updated_at: string | null
          url: string | null
          user_id: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          amenities?: Json | null
          average_rating?: number | null
          bedrooms?: string | null
          cancellation_policy?: string | null
          city?: string | null
          comp_id?: string | null
          created_at?: string
          description?: string | null
          external_id: string
          hero_image_link?: string | null
          id?: string
          instant_book?: boolean | null
          is_comp?: boolean | null
          is_parent?: boolean | null
          other_image_links?: Json | null
          parent_id?: string | null
          pets?: string | null
          policies?: string | null
          review_count?: number | null
          state?: string | null
          title: string
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          amenities?: Json | null
          average_rating?: number | null
          bedrooms?: string | null
          cancellation_policy?: string | null
          city?: string | null
          comp_id?: string | null
          created_at?: string
          description?: string | null
          external_id?: string
          hero_image_link?: string | null
          id?: string
          instant_book?: boolean | null
          is_comp?: boolean | null
          is_parent?: boolean | null
          other_image_links?: Json | null
          parent_id?: string | null
          pets?: string | null
          policies?: string | null
          review_count?: number | null
          state?: string | null
          title?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "str_properties_comp_id_fkey"
            columns: ["comp_id"]
            isOneToOne: false
            referencedRelation: "comps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "str_properties_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      str_property_ratings: {
        Row: {
          "30_day_occupancy": string | null
          "60_day_occupancy": string | null
          "90_day_occupancy": string | null
          amenities_rating_category: string | null
          amenities_rating_number: string | null
          created_at: string
          description_rating_category: string | null
          description_rating_number: string | null
          feedback: string | null
          hero_image_rating_category: string | null
          hero_image_rating_number: string | null
          id: string
          interior_rating_category: string | null
          interior_rating_number: string | null
          other_images_rating_category: string | null
          other_images_rating_number: string | null
          overall_photo_rating: string | null
          property_id: string
          suggestions: string | null
          title_rating_category: string | null
          title_rating_number: string | null
        }
        Insert: {
          "30_day_occupancy"?: string | null
          "60_day_occupancy"?: string | null
          "90_day_occupancy"?: string | null
          amenities_rating_category?: string | null
          amenities_rating_number?: string | null
          created_at?: string
          description_rating_category?: string | null
          description_rating_number?: string | null
          feedback?: string | null
          hero_image_rating_category?: string | null
          hero_image_rating_number?: string | null
          id?: string
          interior_rating_category?: string | null
          interior_rating_number?: string | null
          other_images_rating_category?: string | null
          other_images_rating_number?: string | null
          overall_photo_rating?: string | null
          property_id: string
          suggestions?: string | null
          title_rating_category?: string | null
          title_rating_number?: string | null
        }
        Update: {
          "30_day_occupancy"?: string | null
          "60_day_occupancy"?: string | null
          "90_day_occupancy"?: string | null
          amenities_rating_category?: string | null
          amenities_rating_number?: string | null
          created_at?: string
          description_rating_category?: string | null
          description_rating_number?: string | null
          feedback?: string | null
          hero_image_rating_category?: string | null
          hero_image_rating_number?: string | null
          id?: string
          interior_rating_category?: string | null
          interior_rating_number?: string | null
          other_images_rating_category?: string | null
          other_images_rating_number?: string | null
          overall_photo_rating?: string | null
          property_id?: string
          suggestions?: string | null
          title_rating_category?: string | null
          title_rating_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "str_property_ratings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "str_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_events: {
        Row: {
          created_at: string | null
          data: Json | null
          event_type: string
          id: string
          processed: boolean | null
          stripe_event_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          event_type: string
          id?: string
          processed?: boolean | null
          stripe_event_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          event_type?: string
          id?: string
          processed?: boolean | null
          stripe_event_id?: string
        }
        Relationships: []
      }
      stripe_price_mappings: {
        Row: {
          active: boolean
          amount_cents: number
          billing_type: string
          created_at: string
          id: string
          listing_count: number
          stripe_price_id: string
          tier: string
        }
        Insert: {
          active?: boolean
          amount_cents: number
          billing_type: string
          created_at?: string
          id?: string
          listing_count: number
          stripe_price_id: string
          tier: string
        }
        Update: {
          active?: boolean
          amount_cents?: number
          billing_type?: string
          created_at?: string
          id?: string
          listing_count?: number
          stripe_price_id?: string
          tier?: string
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
