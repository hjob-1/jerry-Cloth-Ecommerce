import { Badge } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutCart } from '../redux/actions/cartAction';
import { signOut } from '../redux/actions/userAction';

import logo from '../assets/images/Jfashion_free-file.png'
import  './navbar.css';
const Navbar = ({setSearchBegin,handleFilter,products,sliceProducts}) => {
     const user=useSelector(state=>state.user.userData)
     const isLogedIn= useSelector(state=>state.user.isLogedIn)
    const cartLength=useSelector(state=>state.cart.cart.length);
    
    const handleSearch=(e)=>{
 if(e.target.value){
       setSearchBegin(true)
       const searchProducts=products.filter(product=>product.name.includes(e.target.value))
       handleFilter(searchProducts)
 }
 else{
     setSearchBegin(false)
     handleFilter(sliceProducts)
 }
 
    }
    return (
        <div className='nav-container'>
            <div className="left">
                  <div className='search-container'>
                      <input type="search" placeholder="Search Product " onChange={(e)=>setSearchBegin?handleSearch(e):""}/>
                    
                  </div>
                  
            </div>
            <div className="middle">
                  <Link to="/"><img src={logo} alt="logo" /></Link>
                
            </div>
            <div className="right">
               
                    <div className="button">
                        <Link to='/shopping'>
                        <Badge badgeContent={cartLength}
                            className="cart-wrapper"
                            color="secondary"
                       >
                          <ShoppingCartOutlinedIcon className="cart"/>
                        </Badge>
                        </Link>
                    </div> 
                    {isLogedIn?
                    <div className="avator-container">
                         <Link to="/profile"><span className={`avator ${user.img===null?"text":""}`} >  {user.img===null?user.name.charAt().toUpperCase():<img src={user.img} alt="img" />}
                         
                         
                         
                         </span></Link> 
            
                        
                     </div>
                     :<>
                    <div className="button">
                        <Link to='/loginpage'>Register</Link>
                        </div>
                    <div className="button"><Link to='/loginpage'>Login</Link></div>
                    </>
                    }
                    

            </div>
        </div>
    )
}

export default Navbar
