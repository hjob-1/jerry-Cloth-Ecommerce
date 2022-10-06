



import { BrowserRouter,Route,Switch } from "react-router-dom";
import Home from './pages/Home';
import SingleProduct from "./pages/SingleProduct";
import LoginRegister from './pages/LoginRegister';
import ShoppingCart from "./pages/ShoppingCart";
import { Redirect } from "react-router";
import { ProfilePage } from "./pages/ProfilePage";
import { Profile } from "./pages/Profile";
import { Order } from "./pages/Order";
import { Modal } from "./pages/Modal";
const  App=()=> {
    const user=JSON.parse(localStorage.getItem("user"))
console.log(user);
    return (
        <body>
            <BrowserRouter>
                <Switch> 
                        <Route path='/shopping' exact >
                            <ShoppingCart  />
                        </Route>
                        <Route path='/product/:id'  >
                            <SingleProduct/>
                        </Route>
                        <Route path='/loginpage' > {user? <Redirect to="/"/> :<LoginRegister/>}</Route>
                        <Route path='/'  exact> 
                            <Home/> 
                        </Route> 
                        <Route path='/profile'>
                            <Profile/>
                        </Route> 
                        <Route path='/shopping/order' exact>
                            <Order/>
                        </Route>  
                        <Route path='/shopping/order/finshed'>
                            <Modal/>
                        </Route>  

                </Switch>     
            </BrowserRouter> 
        </body>
    )
}

export default App
