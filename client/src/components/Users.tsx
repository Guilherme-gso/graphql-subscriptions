import { gql, useQuery, useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"

const subscription = gql`
  subscription {
    userJoin {
      id,
      username,
      lastView,
      isOnline
    }
  }
`

const userLeft = gql`
  subscription {
    userLeft {
      id,
      username,
      lastView,
      isOnline
    }
  }
`

const query = gql`
  query {
    getUsers {
      id,
      username,
      lastView,
      isOnline
    }
  }
`

export const Users = (): JSX.Element => {
  const { data, error } = useSubscription(subscription)
  const { data: userLeftData } = useSubscription(userLeft)
  const { data: connectedUsers } = useQuery(query)

  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    if(connectedUsers) {
      setUsers(connectedUsers.getUsers)
    }
  }, [connectedUsers])

  useEffect(() => {
    if(data) {
      setUsers(prev => [...prev, data.userJoin])
    }
  }, [data])

  useEffect(() => {
    if(userLeftData) {
      console.log(userLeftData)
      setUsers(prev => {
        return prev.map(p => {
          if(p.id === userLeftData.userLeft.id) {
            return { ...p, isOnline: false }
          }
  
          return p
        })
      })
    }
  }, [userLeftData])

  if(error) {
    console.log({ error })
    return <h1>Error</h1>
  }

  if(!users.length) {
    return <h1>Not found</h1>
  }

  return (
    <div>
      {users.map(user => (
        <ul key={user.id}>
          <li>
            <strong>{user.username}</strong>
            <span>{user.lastView}</span>
            <small>{user.isOnline ? 'Online' : 'Offline'}</small>
          </li>
        </ul>
      ))}
    </div>
  )
}