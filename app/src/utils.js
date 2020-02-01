const convertResponseToJSON = response => {
  if (!response.ok) {
    throw response.statusText
  }
  return response.json()
}

export { convertResponseToJSON }
