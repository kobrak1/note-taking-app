import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from "./pages/Layout.jsx"
import FallBackUI from "./components/FallBackUI.jsx"
import ErrorBoundary from './components/ErrorBoundary.jsx'

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
        }
      ]
    }
  ])

  return (
    <ErrorBoundary>
      <Suspense fallback={ <FallBackUI /> }>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App