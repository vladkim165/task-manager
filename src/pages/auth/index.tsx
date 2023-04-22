import LoginForm from '@/components/LoginForm';
import { GetServerSideProps } from 'next';

export default function Auth() {
  return (
    <div className="container">
      <LoginForm />
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const token = req.cookies['token'];
//   // Если юзер уже авторизован, его перенаправит на главную страницу (со списком тасок)
//   if (token) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
