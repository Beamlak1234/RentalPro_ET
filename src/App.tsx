import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { AdminLayout } from './components/layout/AdminLayout'
import { AppShell } from './components/layout/AppShell'
import { AuthProvider } from './context/AuthProvider'
import { AdminConfigPage } from './pages/admin/AdminConfigPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminForgotPasswordPage } from './pages/admin/AdminForgotPasswordPage'
import { AdminSignInPage } from './pages/admin/AdminSignInPage'
import { AdminSubcityPage } from './pages/admin/AdminSubcityPage'
import { AdminSyntheticDataPage } from './pages/admin/AdminSyntheticDataPage'
import { AdminUsersPage } from './pages/admin/AdminUsersPage'
import { PublicForgotPasswordPage } from './pages/auth/PublicForgotPasswordPage'
import { PublicRoleAuthPage } from './pages/auth/PublicRoleAuthPage'
import { ContactPage } from './pages/contact/ContactPage'
import { LandlordContractDetailPage } from './pages/landlord/LandlordContractDetailPage'
import { LandlordContractNewPage } from './pages/landlord/LandlordContractNewPage'
import { LandlordContractsPage } from './pages/landlord/LandlordContractsPage'
import { LandlordDashboardPage } from './pages/landlord/LandlordDashboardPage'
import { LandlordNotificationsPage } from './pages/landlord/LandlordNotificationsPage'
import { LandlordPropertiesPage } from './pages/landlord/LandlordPropertiesPage'
import { LandlordPropertyWizardPage } from './pages/landlord/LandlordPropertyWizardPage'
import { LandlordReportsPage } from './pages/landlord/LandlordReportsPage'
import { OfficerAnomaliesPage } from './pages/officer/OfficerAnomaliesPage'
import { OfficerAppealsPage } from './pages/officer/OfficerAppealsPage'
import { OfficerContractsReviewPage } from './pages/officer/OfficerContractsReviewPage'
import { OfficerDashboardPage } from './pages/officer/OfficerDashboardPage'
import { OfficerMapPage } from './pages/officer/OfficerMapPage'
import { OfficerParticipantDetailPage } from './pages/officer/OfficerParticipantDetailPage'
import { OfficerParticipantsDirectoryPage } from './pages/officer/OfficerParticipantsDirectoryPage'
import { OfficerPropertiesReviewPage } from './pages/officer/OfficerPropertiesReviewPage'
import { OfficerReportsPage } from './pages/officer/OfficerReportsPage'
import { ParticipantProfilePage } from './pages/profile/ParticipantProfilePage'
import { TenantContractDetailPage } from './pages/tenant/TenantContractDetailPage'
import { TenantContractsPage } from './pages/tenant/TenantContractsPage'
import { TenantDashboardPage } from './pages/tenant/TenantDashboardPage'
import { TenantNotificationsPage } from './pages/tenant/TenantNotificationsPage'
import { GovernmentWelcomePage } from './pages/government/GovernmentWelcomePage'
import { WelcomePage } from './pages/landing/WelcomePage'

type PublicAuthMode = 'sign-in' | 'sign-up'

function PublicRoleAuthRoute({ mode }: { mode: PublicAuthMode }) {
  const { pathname } = useLocation()
  return <PublicRoleAuthPage key={pathname} mode={mode} />
}

function AdminSignInRoute() {
  const { key } = useLocation()
  return <AdminSignInPage key={key} />
}

function PublicForgotPasswordKeyedRoute() {
  const { pathname } = useLocation()
  return <PublicForgotPasswordPage key={pathname} />
}

function AdminForgotPasswordKeyedRoute() {
  const { key } = useLocation()
  return <AdminForgotPasswordPage key={key} />
}

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
                <PublicRoleAuthRoute mode="sign-in" />
              </AppShell>
            }
          />
          <Route
            path="/auth/:role/sign-up"
            element={
              <AppShell>
                <PublicRoleAuthRoute mode="sign-up" />
              </AppShell>
            }
          />
          <Route
            path="/auth/:role/forgot-password"
            element={
              <AppShell>
                <PublicForgotPasswordKeyedRoute />
              </AppShell>
            }
          />

          <Route
            path="/tenant/dashboard"
            element={
              <AppShell>
                <ProtectedRoute role="tenant">
                  <TenantDashboardPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/tenant/contracts"
            element={
              <AppShell>
                <ProtectedRoute role="tenant">
                  <TenantContractsPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/tenant/contracts/:contractId"
            element={
              <AppShell>
                <ProtectedRoute role="tenant">
                  <TenantContractDetailPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/tenant/profile"
            element={
              <AppShell>
                <ProtectedRoute role="tenant">
                  <ParticipantProfilePage expectedRole="tenant" />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/tenant/notifications"
            element={
              <AppShell>
                <ProtectedRoute role="tenant">
                  <TenantNotificationsPage />
                </ProtectedRoute>
              </AppShell>
            }
          />

          <Route
            path="/landlord/dashboard"
            element={
              <AppShell>
                <ProtectedRoute role="landlord">
                  <LandlordDashboardPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/landlord/profile"
            element={
              <AppShell>
                <ProtectedRoute role="landlord">
                  <ParticipantProfilePage expectedRole="landlord" />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/landlord/properties"
            element={
              <AppShell>
                <ProtectedRoute role="landlord">
                  <LandlordPropertiesPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/landlord/properties/new"
            element={
              <AppShell>
                <ProtectedRoute role="landlord">
                  <LandlordPropertyWizardPage variant="create" />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/landlord/properties/:propertyId/edit"
            element={
              <AppShell>
                <ProtectedRoute role="landlord">
                  <LandlordPropertyWizardPage variant="edit" />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/landlord/contracts"
            element={
              <AppShell>
                <ProtectedRoute role="landlord">
                  <LandlordContractsPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/landlord/contracts/new"
            element={
              <AppShell>
                <ProtectedRoute role="landlord">
                  <LandlordContractNewPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/landlord/contracts/:contractId"
            element={
              <AppShell>
                <ProtectedRoute role="landlord">
                  <LandlordContractDetailPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/landlord/reports"
            element={
              <AppShell>
                <ProtectedRoute role="landlord">
                  <LandlordReportsPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/landlord/notifications"
            element={
              <AppShell>
                <ProtectedRoute role="landlord">
                  <LandlordNotificationsPage />
                </ProtectedRoute>
              </AppShell>
            }
          />

          <Route
            path="/officer/dashboard"
            element={
              <AppShell>
                <ProtectedRoute role="officer">
                  <OfficerDashboardPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/officer/participants"
            element={
              <AppShell>
                <ProtectedRoute role="officer">
                  <OfficerParticipantsDirectoryPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/officer/participants/:participantId"
            element={
              <AppShell>
                <ProtectedRoute role="officer">
                  <OfficerParticipantDetailPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/officer/properties-review"
            element={
              <AppShell>
                <ProtectedRoute role="officer">
                  <OfficerPropertiesReviewPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/officer/contracts-review"
            element={
              <AppShell>
                <ProtectedRoute role="officer">
                  <OfficerContractsReviewPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/officer/map"
            element={
              <AppShell>
                <ProtectedRoute role="officer">
                  <OfficerMapPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/officer/anomalies"
            element={
              <AppShell>
                <ProtectedRoute role="officer">
                  <OfficerAnomaliesPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/officer/appeals"
            element={
              <AppShell>
                <ProtectedRoute role="officer">
                  <OfficerAppealsPage />
                </ProtectedRoute>
              </AppShell>
            }
          />
          <Route
            path="/officer/reports"
            element={
              <AppShell>
                <ProtectedRoute role="officer">
                  <OfficerReportsPage />
                </ProtectedRoute>
              </AppShell>
            }
          />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="sign-in" replace />} />
            <Route path="sign-in" element={<AdminSignInRoute />} />
            <Route
              path="forgot-password"
              element={<AdminForgotPasswordKeyedRoute />}
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute role="admin">
                  <AdminUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute role="admin">
                  <AdminConfigPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="sub-cities"
              element={
                <ProtectedRoute role="admin">
                  <AdminSubcityPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="synthetic"
              element={
                <ProtectedRoute role="admin">
                  <AdminSyntheticDataPage />
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
