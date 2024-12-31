import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch(`${process.env.VITE_BACK_URL}/getCount`)
      .then((res) => res.json())
      .then((data) => setCount(data.count))
  }, [])

  const onClick = () => {
    fetch(`${process.env.VITE_BACK_URL}/increment`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {
        count != null && (
          <div className="card">
            <button onClick={onClick}>
              count is {count}
            </button>
          </div>
        )
      }
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
