import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_NAME } from '../constants'
import { useStorage } from '../hooks'

export const Login = (): JSX.Element => {
  const [value, setValue] = useState('')
  const { set } = useStorage()
  const navigation = useNavigate()

  function onSubmit(ev: FormEvent): void {
    ev.preventDefault()
    if(!value) return
    set(USER_NAME, value)
    navigation('/chat')
  }

  return (
    <form onSubmit={onSubmit}>
      <input 
        type="text" 
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder="Type our username" 
      />
      <button type="submit">Submit</button>
    </form>
  )
}