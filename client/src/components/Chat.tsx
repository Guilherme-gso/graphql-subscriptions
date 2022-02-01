import { FormEvent, useState } from 'react'
import { useMessage } from '../hooks'

export const Chat = (): JSX.Element => {
  const {
    messages,
    sendMessage,
    getMessagesPayload,
    postMessagePayload
  } = useMessage()
  const [message, setMessage] = useState('')

  function generateUserId(): string {
    return String(Math.floor(Math.random() * 10))
  }

  function onSubmit(ev: FormEvent): void {
    ev.preventDefault()
    sendMessage({ 
      user: generateUserId(), 
      content: message 
    })
    setMessage('')
  }

  return (
    <>
      {getMessagesPayload.loading ? (
        <h1>Loading Messages...</h1>
      ) : (
        messages.map(message => (
          <div style={{ border: '1px solid red' }} key={message.id}>
            <strong>User: {message.user}</strong>
            <p>{message.content}</p>
            <small>{message.dateAt}</small>
          </div>
        ))
      )}

      <form style={{ position: 'fixed', bottom: 0 }} onSubmit={onSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type our message!"
        />
        {postMessagePayload.error && <p>An Error has been ocurred.</p>}
        <button type="submit">
          {postMessagePayload.loading ? 'Loading...' : 'Send Message'}
        </button>
      </form>
    </>
  )
}