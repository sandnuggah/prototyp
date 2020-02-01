import React from 'react'
import { convertResponseToJSON } from '../utils'

function Form({ uploads, setUploads }) {
  const formRef = React.createRef()

  const handleSubmit = event => {
    event.preventDefault()

    fetch('/uploads', {
      method: 'post',
      body: new FormData(formRef.current)
    })
      .then(convertResponseToJSON)
      .then(upload => {
        setUploads([upload, ...uploads.slice(0, -1)])
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <input type="text" name="filename" placeholder="Filename" />

      <br />
      <input type="text" name="uploadedBy" placeholder="Uploaded by" />

      <br />
      <input type="text" name="description" placeholder="Description" />

      <br />
      <input type="file" name="file" />

      <br />
      <input type="submit" value="Submit!" />
    </form>
  )
}

export default Form
