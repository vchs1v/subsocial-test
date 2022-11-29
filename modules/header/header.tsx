import { FC } from 'react';
import { signIn } from 'next-auth/react';
import Button from '@components/button';
import { useUserSession } from '@hooks/use-user-session';
import styles from './header.module.css';

const Header: FC = () => {
  const { user, isAuthenticated } = useUserSession();

  return (
    <header className={styles.header}>
      {isAuthenticated ? (
        <b>{user?.name}</b>
      ) : (
        <Button onClick={() => signIn()}>Login with Twitter</Button>
      )}
    </header>
  );
};

export default Header;
