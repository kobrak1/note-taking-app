import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from "./store.js"

// Components
import Layout from "./pages/Layout.jsx"
import FallBackUI from "./components/FallBackUI.jsx"
import ErrorBoundary from './components/ErrorBoundary.jsx'
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage"

// lazy loaded components
const HomePage = lazy(() => import(/* webpackChunkName: "HomePage" */ "./pages/HomePage.jsx"))
const ListPage = lazy(() => import(/* webpackChunkName: "ListPage" */ "./pages/ListPage.jsx"))
const SinglePage = lazy(() => import(/* webpackChunkName: "SinglePage" */ "./pages/SinglePage.jsx"))

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path:"/",
          element: <HomePage />
        },
        {
          path: "/notes",
          element: <ListPage />
        },
        {
          path: "/:id",
          element: <SinglePage />
        },
        {
          path: "/login",
          element: <LoginPage />
        },
        {
          path: "/register",
          element: <RegisterPage />
        }
      ]
    }
  ])

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Suspense fallback={ <FallBackUI /> }>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </Provider>
  )
}

export default App