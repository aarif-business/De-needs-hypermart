export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; full_name: string | null; phone: string | null; address: string | null; role: 'customer' | 'admin'; created_at: string }
        Insert: { id: string; full_name?: string | null; phone?: string | null; address?: string | null; role?: 'customer' | 'admin' }
        Update: { full_name?: string | null; phone?: string | null; address?: string | null }
      }
      categories: {
        Row: { id: string; name: string; slug: string; icon: string | null; image_url: string | null; description: string | null; sort_order: number; created_at: string }
        Insert: { name: string; slug: string; icon?: string | null; image_url?: string | null; description?: string | null; sort_order?: number }
        Update: { name?: string; slug?: string; icon?: string | null; image_url?: string | null; sort_order?: number }
      }
      products: {
        Row: {
          id: string; name: string; slug: string; description: string | null
          price: number; compare_price: number | null; image_url: string | null
          images: string[]; category_id: string | null; stock_quantity: number
          unit: string; is_featured: boolean; is_fresh_arrival: boolean
          is_active: boolean; tags: string[]; created_at: string; updated_at: string
        }
        Insert: {
          name: string; slug: string; price: number; stock_quantity: number
          description?: string | null; compare_price?: number | null; image_url?: string | null
          images?: string[]; category_id?: string | null; unit?: string
          is_featured?: boolean; is_fresh_arrival?: boolean; is_active?: boolean; tags?: string[]
        }
        Update: {
          name?: string; price?: number; compare_price?: number | null; stock_quantity?: number
          description?: string | null; image_url?: string | null; is_featured?: boolean
          is_fresh_arrival?: boolean; is_active?: boolean; tags?: string[]
        }
      }
      orders: {
        Row: { id: string; user_id: string | null; status: string; total_amount: number; delivery_address: string | null; phone: string | null; notes: string | null; created_at: string; updated_at: string }
        Insert: { user_id?: string | null; total_amount: number; delivery_address?: string | null; phone?: string | null; notes?: string | null }
        Update: { status?: string; delivery_address?: string | null }
      }
      order_items: {
        Row: { id: string; order_id: string; product_id: string | null; product_name: string; product_image: string | null; quantity: number; unit_price: number; total_price: number }
        Insert: { order_id: string; product_id?: string | null; product_name: string; product_image?: string | null; quantity: number; unit_price: number }
        Update: never
      }
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row'] & {
  categories?: Category | null
}
export type Category = Database['public']['Tables']['categories']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']

export interface CartItem {
  id: string
  name: string
  price: number
  image_url: string | null
  quantity: number
  stock_quantity: number
  unit: string
}
