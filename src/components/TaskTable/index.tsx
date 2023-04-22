import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useFormik } from 'formik';

import type { ITask } from '@/models/ITask';
import { setTasks, setCurrentTask } from '@/store/tasks';
import { useDispatch } from '@/hooks/useDispatch';
import { useSelector } from '@/hooks/useSelector';

import { MenuItem, Select } from '@mui/material';
import DateFilter from '@/components/Filters/DateFilter';
import Modal from '@/components/Modal';
import TaskColumn from './TaskColumn';

import styles from './styles.module.scss';

const TaskTable = () => {
  const [queueTaskList, setQueueTaskList] = useState<ITask[]>([]);
  const [inProgressTaskList, setInProgressTaskList] = useState<ITask[]>([]);
  const [doneTaskList, setDoneTaskList] = useState<ITask[]>([]);
  const [isTaskModal, setIsTaskModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.tasks.data);
  const currentTask = useSelector((state) => state.tasks.currentTask);
  const dateFilterValue = useSelector((state) => state.filters.dateFilter);

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    isValid,
    setFieldValue,
  } = useFormik({
    initialValues: {
      status: currentTask?.status || 0,
      priority: currentTask?.priority || 0,
    },
    onSubmit: () => {
      handleSaveTask();
    },
  });

  const getTaskList = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/tasks');

      dispatch(setTasks(data.data || []));
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  const handleCloseModal = () => {
    setIsTaskModal(false);
    dispatch(setCurrentTask(null));
  };

  const handleSaveTask = () => {
    setIsLoading(true);
    try {
      const newTaskList = taskList.map((task) => {
        if (task.id !== currentTask!.id) return task;
        return { ...task, priority: values.priority, status: values.status };
      });

      dispatch(setTasks(newTaskList));
      handleCloseModal();
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const handleDeleteTask = () => {
    try {
      const newTaskList = taskList.filter(
        (task) => task.id !== currentTask!.id
      );

      dispatch(setTasks(newTaskList));
      handleCloseModal();
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTaskList();
  }, [getTaskList]);

  useEffect(() => {
    setIsTaskModal(!!currentTask);

    if (currentTask) {
      setFieldValue('status', currentTask.status);
      setFieldValue('priority', currentTask.priority);
    }
  }, [currentTask, setFieldValue]);

  useEffect(() => {
    const sortedTaskList = [...taskList].sort((a, b) =>
      dateFilterValue === 'DESC'
        ? +new Date(b.schedule.creation_time) -
          +new Date(a.schedule.creation_time)
        : +new Date(a.schedule.creation_time) -
          +new Date(b.schedule.creation_time)
    );

    const queueList = sortedTaskList.filter((task) => task.status === 0);
    const inProgressList = sortedTaskList.filter((task) => task.status === 1);
    const doneList = sortedTaskList.filter((task) => task.status === 2);

    setQueueTaskList(queueList);
    setInProgressTaskList(inProgressList);
    setDoneTaskList(doneList);
  }, [taskList, dateFilterValue]);

  return (
    <div className={styles.container}>
      <DateFilter />
      <div className={styles.taskTable}>
        {isTaskModal && (
          <Modal onClose={handleCloseModal} isLoading={isLoading}>
            <form className={styles.taskModal} onSubmit={handleSubmit}>
              <h3 className={styles.title}>{currentTask!.title}</h3>
              <div className={styles.formRow}>
                <div className={styles.rowTitle}>Исполнитель:&nbsp;</div>
                {currentTask!.author_name}
              </div>
              <div className={styles.formRow}>
                <div className={styles.rowTitle}>Описание задачи:&nbsp;</div>
                {currentTask!.description}
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
                {touched.status && errors.status ? (
                  <div className={styles.errorMessage}>{errors.status}</div>
                ) : null}
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
                  className={styles.deleteButton}
                  onClick={handleDeleteTask}
                  type="button"
                >
                  Удалить
                </button>
                <button
                  className={styles.saveButton}
                  type="submit"
                  disabled={!isValid}
                >
                  Сохранить
                </button>
              </div>
            </form>
          </Modal>
        )}
        <TaskColumn tasks={queueTaskList} title="В очереди" />
        <TaskColumn tasks={inProgressTaskList} title="В работе" />
        <TaskColumn tasks={doneTaskList} title="Выполнено" />
      </div>
    </div>
  );
};

export default TaskTable;
