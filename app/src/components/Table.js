import React from 'react'
import { formatDistance } from 'date-fns'
import FileIcon from 'react-file-icon'
import config from '../config.js'

function Table({ uploads, setUploads }) {
  const handleEdit = id => {
    // noop
  }

  const handleRemove = id => {
    fetch(`/uploads/${id}`, { method: 'DELETE' }).then(() => {
      setUploads(uploads.filter(u => u.id !== id))
    })
  }

  const uploadRows = uploads.map(
    ({ id, filename, extension, description, uploadedBy, createdAt }) => {
      const relativeCreatedAt = formatDistance(
        // no-fmt
        new Date(createdAt),
        new Date()
      )

      return (
        <tr key={id}>
          <td>
            <FileIcon extension={extension} size={25} />
          </td>
          <td>
            <a href={`http://${config.API_URL}/uploads/${id}`}>{filename}</a>
          </td>
          <td>{description}</td>
          <td>{uploadedBy}</td>
          <td>{relativeCreatedAt}</td>
          <td>
            <button onClick={handleEdit.bind(null, id)} disabled>
              edit
            </button>
            <button onClick={handleRemove.bind(null, id)}>rm -rf /</button>
          </td>
        </tr>
      )
    }
  )

  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td>Filename</td>
          <td>Description</td>
          <td>Uploaded by</td>
          <td>Uploaded at</td>
          <td></td>
        </tr>
      </thead>
      <tbody>{uploadRows}</tbody>
    </table>
  )
}

export default Table
