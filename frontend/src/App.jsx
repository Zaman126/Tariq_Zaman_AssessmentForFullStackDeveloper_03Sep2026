import { Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell.jsx';
import { UserListPage } from './pages/UserListPage.jsx';
import { UserProfilePage } from './pages/UserProfilePage.jsx';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/users/:userId" element={<UserProfilePage />} />
      </Routes>
    </AppShell>
  );
}
