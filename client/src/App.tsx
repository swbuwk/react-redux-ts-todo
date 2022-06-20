import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from './hooks/redux';
import {privateRoutes, publicRoutes} from "./router/index"

function App() {
  const user = useAppSelector(state => state.userReducer)

  return (
      <BrowserRouter>
        <Routes>
          {
            user.isAuth
            ?
            <>
            {privateRoutes.map(route => 
              <Route
                key={route.path}
                path={route.path}
                element={<route.page/>}
              />)}
            <Route path="*" element={<Navigate to="/events"/>}></Route>
            </>
            :
            <>
            {publicRoutes.map(route => 
              <Route
                key={route.path}
                path={route.path}
                element={<route.page/>}
              />)}
            <Route path="*" element={<Navigate to="/login"/>}></Route>
            </>
          }
        </Routes>
      </BrowserRouter>
  );
}

export default App;
