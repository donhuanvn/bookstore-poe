import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import BookDetailPage from './pages/BookDetail';
import { action as logoutAction } from './pages/Logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: ':bookId',
        element: <BookDetailPage />
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
