
import { Provider } from 'react-redux'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SeminarHall from './components/SeminarHall'
import {store} from '../src/app/store'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectRoute'
import Login from './components/Login'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes >
          <Route path='/register' element={<Register/> } />
          <Route path='/login' element={<Login/> } />
          <Route path='/' element={
            <ProtectedRoute>
              <SeminarHall/>
            </ProtectedRoute>
            }/>
        </Routes>
      </BrowserRouter>
         {/* <div className='main'>
      <SeminarHall />
    </div> */}
    </Provider>
 
  )
}

export default App
