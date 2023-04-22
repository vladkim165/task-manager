import ReactDOM from 'react-dom';

import Spinner from '@/components/Spinner';

import styles from './styles.module.scss';

interface Props {
  children?: React.ReactNode;
  onClose: () => void;
  isLoading: boolean;
}

const TaskModal = ({ children, onClose, isLoading }: Props) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div className={styles.backdrop} onClick={handleBackdropClick}>
            {isLoading ? (
              <Spinner />
            ) : (
              <div className={styles.modal}>
                <span className={styles.close} onClick={onClose}>
                  &#10005;
                </span>
                <div className={styles.content}>{children}</div>
              </div>
            )}
          </div>
        </>,
        document.querySelector('body') as Element
      )}
    </>
  );
};

export default TaskModal;
