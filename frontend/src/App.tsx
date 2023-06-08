import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage, { loader as homeLoader } from './pages/Home';
import BookDetailPage from './pages/BookDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader
      },
      {
        path: 'book-detail',
        children: [
          {
            index: true,
            element: <BookDetailPage />
          },
          {
            path: ':bookId',
            element: <BookDetailPage />
          }
        ]

      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
