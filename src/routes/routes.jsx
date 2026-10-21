import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import RouteError from '../pages/RouteError'
import NotFound from '../pages/NotFound'
import { FACILITY_ANCHOR, PATHS, REDIRECTS } from './paths'

import Home from '../pages/Home'

// Lazy-load every page except Home for route-level code splitting
const About = lazy(() => import('../pages/About'))
const Products = lazy(() => import('../pages/Products'))
const Technology = lazy(() => import('../pages/Technology'))
const Quality = lazy(() => import('../pages/Quality'))
const Industries = lazy(() => import('../pages/Industries'))
const Contact = lazy(() => import('../pages/Contact'))

/**
 * Central route configuration.
 * Paths live in ./paths.js — never inline a route string here.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: PATHS.ABOUT, element: <About /> },
      { path: PATHS.PRODUCTS, element: <Products /> },
      { path: PATHS.TECHNOLOGY, element: <Technology /> },
      { path: PATHS.QUALITY, element: <Quality /> },
      { path: PATHS.INDUSTRIES, element: <Industries /> },
      { path: PATHS.CONTACT, element: <Contact /> },
      // "Our Facility" is a section of the About page today
      {
        path: PATHS.FACILITY,
        element: <Navigate to={`${PATHS.ABOUT}#${FACILITY_ANCHOR}`} replace />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
  // Legacy / alternative URLs — permanent, silent redirects
  ...REDIRECTS.map(({ from, to }) => ({
    path: from,
    element: <Navigate to={to} replace />,
  })),
])

export default router
