import Link from 'next/link';

import styles from './styles.module.scss';

const ErrorModal: React.FC = () => {
  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>Ошибка доступа</h2>
      <p className={styles.errorMessage}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <Link href="/auth">
        <button className={styles.closeButton} onClick={() => {}}>
          Авторизоваться
        </button>
      </Link>
    </div>
  );
};

export default ErrorModal;
