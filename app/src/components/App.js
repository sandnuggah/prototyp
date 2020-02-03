import React, { useState, useEffect } from 'react'
import { convertResponseToJSON } from '../utils'
import './App.css'
import Table from './Table'
import Form from './Form'

function App() {
  const [uploads, setUploads] = useState([])

  useEffect(() => {
    fetch('/uploads')
      .then(convertResponseToJSON)
      .then(({ rows: uploads }) => {
        setUploads(uploads)
      })
      .catch(console.error)
  }, [])

  return (
    <div className="App">
      <h1>Prototyp</h1>
      <hr />

      <Form uploads={uploads} setUploads={setUploads} />
      <hr />

      {uploads.length === 0 ? (
        <h5>No files to display</h5>
      ) : (
        <Table uploads={uploads} setUploads={setUploads} />
      )}
    </div>
  )
}

export default App
