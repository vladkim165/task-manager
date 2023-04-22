import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';

import { IAuthForm } from '@/models/IAuthForm';

import { TextField } from '@mui/material';
import Spinner from '@/components/Spinner';

import styles from './styles.module.scss';

const validationSchema = yup.object({
  username: yup.string().required('Обязательное поле'),
  password: yup.string().required('Обязательное поле'),
});

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: IAuthForm = { username: '', password: '' };
  const { errors, handleSubmit, handleChange, values } = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => handleAuth(),
  });

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/auth', { ...values });

      Cookies.set('token', data.data);
      router.push('/');
    } catch (e: any) {
      if (e?.response?.status === 401) {
        setFormError('Неверная пара логин/пароль');
        setIsLoading(false);
        return;
      }
      setFormError('Произошла непредвиденная ошибка, попробуйте позже');
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Авторизация</h2>
          <div className={styles.field}>
            <TextField
              id="username"
              label="Логин"
              name="username"
              variant="standard"
              value={values.username}
              onChange={handleChange}
              error={!!errors.username || !!formError}
              helperText={errors.username}
            />
          </div>

          <div className={styles.field}>
            <TextField
              id="password"
              label="Пароль"
              name="password"
              variant="standard"
              value={values.password}
              onChange={handleChange}
              error={!!errors.password || !!formError}
              helperText={errors.password}
            />
          </div>
          {formError && <div className={styles.error}>{formError}</div>}
          <button type="submit" className={styles.button}>
            Войти
          </button>
        </form>
      )}
    </>
  );
};

export default LoginForm;
