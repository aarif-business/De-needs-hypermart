import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')
  const category = searchParams.get('category')
  const limit = parseInt(searchParams.get('limit') ?? '20')

  const supabase = createClient()
  let query = supabase
    .from('products')
    .select('id, name, price, compare_price, image_url, unit, stock_quantity, is_fresh_arrival')
    .eq('is_active', true)
    .limit(limit)

  if (q) query = query.ilike('name', `%${q}%`)
  if (category) {
    const { data: cat } = await supabase.from('categories').select('id').eq('slug', category).single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
