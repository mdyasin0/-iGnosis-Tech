import { http, HttpResponse, delay } from 'msw'
import data from './data/products.json'
import type { Product, ListResponse } from '../types'


let products: Product[] = JSON.parse(JSON.stringify(data))

function paginate<T>(items: T[], page: number, limit: number) {
  const start = (page - 1) * limit
  return items.slice(start, start + limit)
}

export const handlers = [
  http.get('/products', async ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    const limit = Number(url.searchParams.get('limit') || 8)
    const query = url.searchParams.get('query')?.toLowerCase() || ''
    const category = url.searchParams.get('category') || ''
    const stock = url.searchParams.get('stock') || 'All'
    const sort = url.searchParams.get('sort') || 'name-asc'

    await delay(200)

    // Filter by search query
    let list = products.filter(p => p.name.toLowerCase().includes(query))

    // Filter by category
    if (category && category !== 'All') {
      list = list.filter(p => p.category === category)
    }

    // Filter by stock
    if (stock === 'Available') {
      list = list.filter(p => p.inStock === true)
    } else if (stock === 'Out of stock') {
      list = list.filter(p => p.inStock === false)
    }

    // Sorting
    switch (sort) {
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        list.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'stock-asc':
        // Out of stock first
        list.sort((a, b) => Number(a.inStock) - Number(b.inStock))
        break
      case 'stock-desc':
        // Available first
        list.sort((a, b) => Number(b.inStock) - Number(a.inStock))
        break
    }

    const body: ListResponse<Product> = {
      items: paginate(list, page, limit),
      page,
      limit,
      total: list.length
    }

    return HttpResponse.json(body)
  }),

  http.get('/products/:id', async ({ params }) => {
    await delay(150)
    const found = products.find(p => p.id === params.id)
    return found ? HttpResponse.json(found) : new HttpResponse(null, { status: 404 })
  })
]
