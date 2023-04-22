import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/404.module.scss';

import notFoundGif from '/public/not-found.gif';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <Image
        src={notFoundGif}
        alt="Page not found"
        height={300}
        width={400}
        unoptimized
      />
      <h1>404 - Страница не найдена</h1>
      <p>
        Страница, которую вы ищете, возможно, была удалена, ее название было
        изменено или временно недоступна.
      </p>
      <Link href="/" className={styles.returnButton}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;
