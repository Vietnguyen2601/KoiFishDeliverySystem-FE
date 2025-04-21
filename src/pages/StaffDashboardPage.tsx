import { Outlet } from 'react-router-dom';
import StaffDashboardLayout from '../components/layouts/StaffDashboardLayout';

const StaffDashboardPage = () => {
  return (
    <StaffDashboardLayout>
      <Outlet />
    </StaffDashboardLayout>
  );
};

export default StaffDashboardPage;