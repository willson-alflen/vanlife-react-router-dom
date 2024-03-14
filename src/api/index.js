export async function fetchAllVans() {
  const response = await fetch('http://localhost:8000/vans')
  if (!response.ok) {
    throw new Error(
      `Failed to fetch vans: ${response.status} ${response.statusText}`
    )
  }
  const data = await response.json()
  return data
}

export async function fetchVanById(id) {
  const response = await fetch(`http://localhost:8000/vans/${id}`)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch van: ${response.status} ${response.statusText}`
    )
  }
  const data = await response.json()
  return data
}

export async function fetchHostVans() {
  const response = await fetch('http://localhost:8000/vans')
  if (!response.ok) {
    throw new Error(
      `Failed to fetch vans: ${response.status} ${response.statusText}`
    )
  }
  const data = await response.json()
  return data.filter((van) => van.hostId === 123)
}

export async function fetchHostSingleVan(id) {
  const response = await fetch(`http://localhost:8000/vans/${id}`)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch van: ${response.status} ${response.statusText}`
    )
  }
  const data = await response.json()
  return data
}
