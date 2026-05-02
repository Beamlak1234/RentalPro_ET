import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { AdminLayout } from './components/layout/AdminLayout'
import { AppShell } from './components/layout/AppShell'
import { AuthProvider } from './context/AuthProvider'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminSignInPage } from './pages/admin/AdminSignInPage'
import { PublicRoleAuthPage } from './pages/auth/PublicRoleAuthPage'
import { ContactPage } from './pages/contact/ContactPage'
import { ActorDashboardPage } from './pages/dashboards/ActorDashboardPage'
import { GovernmentWelcomePage } from './pages/government/GovernmentWelcomePage'
import { WelcomePage } from './pages/landing/WelcomePage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <AppShell>
                <WelcomePage />
              </AppShell>
            }
          />
          <Route
            path="/government"
            element={
              <AppShell>
                <GovernmentWelcomePage />
              </AppShell>
            }
          />
          <Route
            path="/contact"
            element={
              <AppShell>
                <ContactPage />
              </AppShell>
            }
          />
          <Route
            path="/auth/:role/sign-in"
            element={
              <AppShell>
                <PublicRoleAuthPage mode="sign-in" />
              </AppShell>
            }
          />
          <Route
            path="/auth/:role/sign-up"
            element={
              <AppShell>
                <PublicRoleAuthPage mode="sign-up" />
              </AppShell>
            }
          />

          <Route
            path="/tenant/dashboard"
            element={
              <AppShell>
                <ProtectedRoute role="tenant">
                  <ActorDashboardPage role="tenant" />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/landlord/dashboard"
            element={
              <AppShell>
                <ProtectedRoute role="landlord">
                  <ActorDashboardPage role="landlord" />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/officer/dashboard"
            element={
              <AppShell>
                <ProtectedRoute role="officer">
                  <ActorDashboardPage role="officer" />
                </ProtectedRoute>
              </AppShell>
            }
          />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="sign-in" replace />} />
            <Route path="sign-in" element={<AdminSignInPage />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
