
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css'
import logo from './assets/img/Logo.svg';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';


import ProductList from './components/ProductList';
import Add from './components/Add';
import Show from './components/Show';
import Edit from './components/Edit';


const router = createBrowserRouter([
  {
    path: '/signin',
    element: <SignInForm logo={logo} />, 
  },
  {
    path: '/signup',
    element: <SignUpForm logo={logo} />, 
  },
  {
    path: '/',
    element: <ProductList />, 
    children: [
      {
        path: 'add',
        element: <Add/>
      },
      {
        path: 'Show/:id',
        element: <Show/>
      },
      {
        path: 'edit/:id',
        element: <Edit/>
      }
      
    ]
  },
]);

function App() {
  
  
  return (
  <RouterProvider router={router} />
  )
}

export default App
