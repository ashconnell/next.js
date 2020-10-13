import { useEffect, useState } from 'react'

export function Data({ endpoint }) {
  const [data, setData] = useState(null)
  useEffect(() => {
    async function load() {
      const resp = await fetch(endpoint)
      const data = await resp.json()
      console.log(data)
      setData(data)
    }
    load()
  }, [endpoint])
  return (
    <p>
      {endpoint}: {JSON.stringify(data)}
    </p>
  )
}
