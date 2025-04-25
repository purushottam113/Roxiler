import { BrowserRouter, Route, Routes } from "react-router";
import Body from './Body';
import { Provider } from "react-redux"
import appStore from "../utils/appStore"
import Login from "./Login";
import SignUp from "./SignUp";
import OwnerDashboard from "./OwnerDashboard";
import User from "./User";


function App() {

  return (
    <Provider store={appStore}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Body/>}>
            <Route path="/login" element= {<Login/>}></Route>
            <Route path="/signUp" element= {<SignUp/>}></Route>
            <Route path="/owner/dashboard" element= {<OwnerDashboard/>}></Route>
            <Route path="/user/dashboard" element= {<User/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
