import NavbarMain from '../components/NavbarUser';
import JobFetching from '../components/JobFetching';

const Jobs = () => {
  return (
    <>
      <NavbarMain />
      <section className="bg-blue-50 px-4 py-6">
        <JobFetching />
      </section>
    </>
  );
};

export default Jobs;
