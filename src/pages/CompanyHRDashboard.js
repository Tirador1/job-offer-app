import HeroHr from '../components/HeroHr';
import HomeCards from '../components/HomeCards';
import JobFetching from '../components/JobFetching';
import NavbarHr from '../components/NavbarHr';

const CompanyHRDashboard = () => {
  return (
    <>
      <NavbarHr />
      <HeroHr />
      <HomeCards />
      <JobFetching isHome={true} isHr={true} />
    </>
  );
};
export default CompanyHRDashboard;
