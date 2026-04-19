import { useState, useEffect, useCallback } from 'react'
import { snippetsAPI } from '../services/api'
import toast from 'react-hot-toast'

export function useSnippets() {
  const [snippets, setSnippets] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSnippets = useCallback(async () => {
    try {
      const res = await snippetsAPI.getAll()
      setSnippets(res.data)
    } catch {
      toast.error('Failed to load snippets')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchSnippets() }, [fetchSnippets])

  const createSnippet = useCallback(async (data) => {
    const res = await snippetsAPI.create(data)
    setSnippets(prev => [res.data, ...prev])
    toast.success('Snippet saved!')
    return res.data
  }, [])

  const updateSnippet = useCallback(async (id, data) => {
    const res = await snippetsAPI.update(id, data)
    setSnippets(prev => prev.map(s => s.id === id ? res.data : s))
    toast.success('Snippet updated!')
    return res.data
  }, [])

  const deleteSnippet = useCallback(async (id) => {
    await snippetsAPI.delete(id)
    setSnippets(prev => prev.filter(s => s.id !== id))
    toast.success('Snippet deleted')
  }, [])

  return { snippets, loading, createSnippet, updateSnippet, deleteSnippet, refetch: fetchSnippets }
}
