import { memo } from 'react';
import { ITask } from '@/models/ITask';
import TaskItem from '@/components/TaskTable/TaskItem';

import styles from './styles.module.scss';

interface IProps {
  tasks: ITask[];
  title: string;
}

const TaskColumn = ({ tasks = [], title }: IProps) => {
  return (
    <ul className={styles.taskColumn}>
      <h3 className={styles.title}>{title}</h3>
      {tasks.length ? (
        tasks.map((task) => <TaskItem task={task} key={task.id} />)
      ) : (
        <span className={styles.notion}>Нет задач</span>
      )}
    </ul>
  );
};

export default memo(TaskColumn);
