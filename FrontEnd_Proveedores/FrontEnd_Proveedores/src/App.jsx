import { Fragment, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoginForm } from './components/loginForm'
import SupplierTable from './components/supplierTable'
import DeleteDialog from './components/deleteDialog'
import EditDialog from './components/editDialog'
import { getCountries } from './api/countryApi'
import CreateDialog from './components/createDialog'

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
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [reload, setReload] = useState({actions: {}})
  const timezone = 'America/Lima'

  useEffect(() => {
    console.log(countryList)
  }, [countryList])

  return (
    <>
      {isLogged ?
        (<Fragment>
          <SupplierTable setReload={setReload} countryList={countryList} setCountryList={setCountryList} token={token} setDeleteDialogItems={setDeleteDialogItems} setEditDialogItems={setEditDialogItems} setCreateDialogOpen={setCreateDialogOpen} timezone={timezone}></SupplierTable>
          <DeleteDialog dialogItems={deleteDialogItems} setDeleteDialogItems={setDeleteDialogItems}></DeleteDialog>
          <EditDialog dialogItems={editDialogItems} setEditDialogItems={setEditDialogItems} token={token} countryList={countryList}></EditDialog>
          <CreateDialog token={token} countryList={countryList} createDialogOpen={createDialogOpen} setCreateDialogOpen={setCreateDialogOpen} reload={reload}></CreateDialog>
        </Fragment>
        ) :
        (<LoginForm setIsLogged={setIsLogged} setToken={setToken}></LoginForm>)
      }
    </>
  )
}

export default App
