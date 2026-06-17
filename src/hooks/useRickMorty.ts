import { useState, useEffect, useCallback } from 'react'

interface UseDataResult<T> {
  data: T[]
  loading: boolean
  error: string | null
  page: number
  totalPages: number
  loadMore: () => void
}

export function useRickMorty<T>(fetchFn: (page: number) => Promise<{ results: T[]; info: { count: number; pages: number } }>, initialPage: number = 1): UseDataResult<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)

  const loadPage = useCallback((pageNum: number) => {
    setLoading(true)
    setError(null)
    fetchFn(pageNum)
      .then((res) => {
        setData((prev) => (pageNum === 1 ? res.results : [...prev, ...res.results]))
        setTotalPages(res.info.pages)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [fetchFn])

  useEffect(() => {
    loadPage(page)
  }, [page, loadPage])

  const loadMore = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages))
  }, [totalPages])

  return { data, loading, error, page, totalPages, loadMore }
}
