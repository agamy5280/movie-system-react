import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import './i18n';
import Navbar from './components/Navbar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <HomePage></HomePage>
    }
  ])
  return (
    <div className="App">
      
      <Provider store={store}>
        <Navbar></Navbar>
        <RouterProvider router={router} />
      </Provider>
     
    </div>
  );
}

export default App;
