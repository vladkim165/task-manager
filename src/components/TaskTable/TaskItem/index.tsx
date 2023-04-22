import { ITask } from '@/models/ITask';
import { useDispatch } from '@/hooks/useDispatch';
import { setCurrentTask } from '@/store/tasks';

import PriorityCircle from '@/components/PriorityCircle';

import styles from './styles.module.scss';

interface IProps {
  task: ITask;
}

const TaskItem = ({ task }: IProps) => {
  const dispatch = useDispatch();

  return (
    <li
      className={styles.taskItem}
      onClick={() => dispatch(setCurrentTask(task))}
    >
      <div className={styles.taskTitle}>
        <PriorityCircle priority={task.priority} size={12} />
        <h4>{task.title}</h4>
      </div>
      <p> {task.schedule.creation_time.split('T')[0]}</p>

      <p className={styles.author}>{task.author_name}</p>
    </li>
  );
};

export default TaskItem;
