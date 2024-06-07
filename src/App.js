import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/HomePage";
import Log_in from "./components/Log_in.jsx";

<<<<<<< HEAD
import './i18n';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Header from './components/Main.jsx';
import ShowTimes from './components/ShowTimes.jsx';
=======
import "./i18n";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Header from "./components/Main.jsx";
import ProfileEdit from "./components/ProfileEdit.jsx";
import MoviePage from "./components/MoviePage.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import FavoritesMovies from "./components/MoviesFavorites.jsx";
import MovieSeats from "./components/MovieSeats.jsx";
>>>>>>> 110dce8ee12aba4e37497ca2b65eee98bac2e13d

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header></Header>,
      children: [
        {
          index: true,
          element: <HomePage></HomePage>,
        },
        {
          path: "/login",
          element: <Log_in />,
        },
        {
<<<<<<< HEAD
          path: "/times",
          element:<ShowTimes/>
        },
        
        
      ]
    }
    
  ])
=======
          path: "/profile-edit",
          element: <ProfileEdit />,
        },
        {
          path: "/movie",
          element: <MoviePage />,
        },
        {
          path: "/favorites",
          element: <FavoritesMovies />,
        },
        {
          path: "/seats",
          element: <MovieSeats />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
>>>>>>> 110dce8ee12aba4e37497ca2b65eee98bac2e13d
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
