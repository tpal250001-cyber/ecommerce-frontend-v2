
import './App.css'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Productpage } from './pages/Productpage'
import { Cart } from './pages/cart'
//import { Tushar } from './pages/tt'
import { CheckoutPage} from './pages/createorder'
//import { Address } from './pages/Address'
import { BrowserRouter,Routes , Route,Outlet} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { CreateProduct } from './components/CreateProduct'
   
 function Layout(){

return (<div>

<Navbar />
<Outlet />

</div>
)
}
  function App(){

  return <>
    <BrowserRouter>
    <Routes>
     <Route   element={<Layout />}>
     <Route path='/' element={ <Productpage/>} />
     <Route  path='/signup' element={<Signup />}  />
     <Route  path='/signin' element={<Signin />}  />
     <Route  path='/product' element={<Productpage />} />
     <Route  path='/cart' element={<Cart />} />
     <Route  path='/order' element={<CheckoutPage />} />
     <Route path='/create' element={<CreateProduct />} />
     < Route path='*' element={<Productpage />} />
   </Route>
   </Routes>
   </BrowserRouter>
    </>
  

}

export default App
