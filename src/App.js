import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import MissingPage from "./Pages/MissingPage";
import Unauthorized from "./Pages/Unauthorized";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import ShopPage from "./Pages/ShopPage";
import ProfilePage from "./Pages/ProfilePage";
import OrderPage from "./Pages/OrderPage";
import AddressPage from "./Pages/AddressPage";
import AdminPage from './Pages/AdminPage';
import Layout from './Components/Layout';
import PersistLogin from './Components/PersistLogin';
import RequireAuth from "./Components/RequireAuth";
import AuthorPage from './Pages/AuthorPage';
import WishlistPage from './Pages/WishlistPage';
import SearchPage from './Pages/SearchPage';
import CartPage from './Pages/CartPage';
import GenrePage from './Pages/GenrePage';
import ProductDetailPage from './Pages/ProductDetailPage';
import AuthorDetailContainer from './Components/AuthorDetailContainer';
import AddAddressPage from './Pages/AddAddressPage';
import EditAddressPage from './Pages/EditAddressPage';

const ROLES = {
  'Admin': "[ROLE_ADMIN]",
  'Customer': "[ROLE_CUSTOMER]"
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="authors" element={<AuthorPage />} />
        <Route path="/genre/:genre" element={<GenrePage/>} />
        <Route exact path='/search/:bookValue' element={<SearchPage />} />
        <Route path='/book/:bookId' element={<ProductDetailPage />} />
        <Route path='/author/:authorId' element={<AuthorDetailContainer />} />
        <Route path='/address/add' element={<AddAddressPage />} />
        <Route path='/address/edit/:addressId' element={<EditAddressPage />} />
        <Route path="/" exact element={<HomePage />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Customer, ROLES.Admin]} />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="address" element={<AddressPage />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
