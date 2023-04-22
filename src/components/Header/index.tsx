import Image from 'next/image';
import { useState } from 'react';

import AddTaskModal from '@/components/AddTaskModal';

import avatar from '@/images/avatar.png';

import styles from './styles.module.scss';

const Header = () => {
  const [isCreateTaskModal, setIsCreateTaskModal] = useState(false);

  const onClose = () => {
    setIsCreateTaskModal(false);
  }

  return (
    <>
      {isCreateTaskModal && <AddTaskModal onClose={onClose} />}
      <header className={styles.header}>
        <button
          className={styles.addButton}
          onClick={() => setIsCreateTaskModal(true)}
        >
          Новая задача
        </button>
        <Image src={avatar} alt="avatar" width={50} height={50} />
      </header>
    </>
  );
};

export default Header;
