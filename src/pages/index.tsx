import { GetServerSideProps } from 'next';

import Header from '@/components/Header';
import TaskTable from '@/components/TaskTable';

function Home() {
  return (
    <>
      <Header />
      <TaskTable />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies['token'];

  if (!token) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
