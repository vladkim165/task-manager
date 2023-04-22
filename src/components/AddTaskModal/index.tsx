import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import type { IAuthor } from '@/models/IAuthor';
import { setAuthors } from '@/store/authors';
import { setTasks } from '@/store/tasks';
import { useDispatch } from '@/hooks/useDispatch';
import { useSelector } from '@/hooks/useSelector';

import { TextField, Select, MenuItem, FormHelperText } from '@mui/material';
import Modal from '@/components/Modal';

import styles from './styles.module.scss';

interface IProps {
  onClose: () => void;
}

const validationSchema = yup.object({
  status: yup.number().required('Обязательное поле'),
  priority: yup.number().required('Обязательное поле'),
  title: yup.string().required('Обязательное поле'),
  description: yup.string().required('Обязательное поле'),
  author_name: yup.string().required('Обязательное поле'),
});

const AddTaskModal = ({ onClose }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.data);
  const authors = useSelector((state) => state.authors.data);

  const handleCloseModal = () => {
    onClose();
    resetForm();
  };

  const getAuthors = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/api/authors');

      dispatch(setAuthors(data.data));
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }, [dispatch]);

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      status: 0,
      priority: 0,
      title: '',
      description: '',
      author_name: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: () => {
      handleCreateTask();
      handleCloseModal();
    },
  });

  const handleCreateTask = () => {
    // Создает уникальный id 10 символов
    const uniqueId = uuidv4().substring(0, 10);

    const newTask = {
      ...values,
      id: uniqueId,
      schedule: {
        creation_time: new Date().toISOString(),
      },
    };

    dispatch(setTasks([newTask, ...tasks]));
  };

  useEffect(() => {
    getAuthors();
  }, [getAuthors]);

  return (
    <>
      <Modal onClose={handleCloseModal} isLoading={isLoading}>
        <form className={styles.taskModal} onSubmit={handleSubmit}>
          <h3 className={styles.title}>Новая задача</h3>
          <div className={styles.formRow}>
            <TextField
              id="title"
              label="Название"
              name="title"
              variant="standard"
              value={values.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.rowTitle}>Исполнитель:&nbsp;</div>
            <Select
              id="author_name"
              name="author_name"
              value={values.author_name}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="standard"
              style={{ width: '100%' }}
              error={!!errors.author_name}
            >
              {authors.map((author: IAuthor) => (
                <MenuItem key={author.id} value={author.author_name}>
                  {author.author_name}
                </MenuItem>
              ))}
            </Select>
            {errors.author_name && (
              <FormHelperText style={{ color: 'rgb(211, 47, 47)' }}>
                {errors.author_name}
              </FormHelperText>
            )}
          </div>
          <div className={styles.formRow}>
            <div className={styles.rowTitle}>Описание задачи:&nbsp;</div>
            <TextField
              id="description"
              name="description"
              variant="standard"
              value={values.description}
              onChange={handleChange}
              style={{ width: '100%' }}
              multiline
              rows={6}
              error={!!errors.description}
              helperText={errors.description}
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="state">Состояние:</label>
            <Select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="standard"
              style={{ width: '100%' }}
            >
              <MenuItem value={0}>В очереди</MenuItem>
              <MenuItem value={1}>В работе</MenuItem>
              <MenuItem value={2}>Выполнено</MenuItem>
            </Select>
            {errors.status && (
              <FormHelperText style={{ color: 'rgb(211, 47, 47)' }}>
                {errors.status}
              </FormHelperText>
            )}
          </div>
          <div className={styles.formRow}>
            <label htmlFor="priority">Приоритет:</label>
            <Select
              id="priority"
              name="priority"
              value={values.priority}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="standard"
              style={{ width: '100%' }}
            >
              <MenuItem value={0}>Низкий</MenuItem>
              <MenuItem value={1}>Средний</MenuItem>
              <MenuItem value={2}>Высокий</MenuItem>
            </Select>
            {touched.priority && errors.priority ? (
              <div className={styles.errorMessage}>{errors.priority}</div>
            ) : null}
          </div>
          <div className={styles.buttonGroup}>
            <button
              className={styles.resetButton}
              onClick={() => handleCloseModal()}
              type="button"
            >
              Отмена
            </button>
            <button className={styles.saveButton} type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddTaskModal;
