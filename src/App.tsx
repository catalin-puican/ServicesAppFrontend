import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import { UserProvider } from "./contexts/User/UserProvider"
import { PublicRoute } from "./components/guards/PublicRoute"
import { PrivateRoute } from "./components/guards/PrivateRoute"
import { routes } from "./routes"

import { PostProvider } from "./contexts/Post/PostProvider"
import { ReviewProvider } from "./contexts/Review/ReviewProvider"

const AppContent = () => (
  <>
    <Toaster position="top-right" />
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.requiresUser ? (
              <PrivateRoute>
                <route.element />
              </PrivateRoute>
            ) : (
              <PublicRoute>
                <route.element />
              </PublicRoute>
            )
          }
        />
      ))}
    </Routes>
  </>
)

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <ReviewProvider>
          <BrowserRouter>
              <AppContent />
          </BrowserRouter>
        </ReviewProvider>
      </PostProvider>
    </UserProvider>
  )
}

export default App;