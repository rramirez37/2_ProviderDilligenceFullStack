import { Fragment, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { LoginForm } from './components/loginForm'
import SupplierTable from './components/supplierTable'
import DeleteDialog from './components/deleteDialog'
import EditDialog from './components/editDialog'
import { getCountries } from './api/countryApi'

function App() {
  const [count, setCount] = useState(0)
  const [isLogged, setIsLogged] = useState(false)
  const [token, setToken] = useState('');
  const [countryList, setCountryList] = useState([])
  const [deleteDialogItems, setDeleteDialogItems] = useState({
    data: {},
    actions: {},
    state: false
  })
  const [editDialogItems, setEditDialogItems] = useState({
    data: {},
    actions: {},
    state: false
  })

  useEffect(() => {
    console.log(countryList)
  }, [countryList])

  return (
    <>
      {isLogged ?
        (<Fragment>
          <SupplierTable countryList={countryList} setCountryList={setCountryList} token={token} setDeleteDialogItems={setDeleteDialogItems} setEditDialogItems={setEditDialogItems}></SupplierTable>
          <DeleteDialog dialogItems={deleteDialogItems} setDeleteDialogItems={setDeleteDialogItems}></DeleteDialog>
          <EditDialog dialogItems={editDialogItems} setEditDialogItems={setEditDialogItems} token={token} countryList={countryList}></EditDialog>
        </Fragment>
        ) :
        (<LoginForm setIsLogged={setIsLogged} setToken={setToken}></LoginForm>)
      }
    </>
  )
}

export default App
