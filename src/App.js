import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import Log_in from './components/Log_in.jsx';

import './i18n';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Header from './components/Main.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Header></Header>,
      children:[
        {
          index: true,
          element: <HomePage></HomePage>
        },
        {
          path: "/login",
          element:<Log_in/>
        },
        
        
      ]
    }
    
  ])
  return (
    <div className="App">
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
     
    </div>
  );
}

export default App;
