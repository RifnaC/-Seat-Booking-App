
import { Provider } from 'react-redux'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SeminarHall from './components/SeminarHall'
import { store } from '../src/app/store'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectRoute'
import Login from './components/Login'
import SeminarList from './components/SeminarList'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes >
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/seminar' element={
            <ProtectedRoute>
              <SeminarList />
            </ProtectedRoute>
          } />
          <Route
            path="/seminar/:seminarId"
            element={
              <ProtectedRoute>
                <SeminarHall />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <div className='main'>
      <SeminarHall />
    </div> */}
    </Provider>

  )
}

export default App
