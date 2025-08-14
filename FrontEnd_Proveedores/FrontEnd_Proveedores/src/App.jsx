import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { LoginForm } from './components/loginForm'
import SupplierTable from './components/supplierTable'

function App() {
  const [count, setCount] = useState(0)
  const [isLogged, setIsLogged] = useState(false)
  const [token, setToken] = useState('');

  return (
    <>
      {isLogged ?
        <SupplierTable token={token}></SupplierTable> :
        <LoginForm setIsLogged={setIsLogged} setToken={setToken}></LoginForm>
      }
    </>
  )
}

export default App
