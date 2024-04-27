import NavbarUser from '../components/NavbarUser';
import Hero from '../components/Hero';
import JobFetching from '../components/JobFetching';
import ViewAllJobs from '../components/ViewAllJobs';

const UserDashboard = () => {
  return (
    <>
      <NavbarUser />
      <Hero />
      <JobFetching isHome={true} />
      <ViewAllJobs />
    </>
  );
};

export default UserDashboard;
