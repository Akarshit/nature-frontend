import { GLogin, UserTab } from 'components';

import { Button } from '@chakra-ui/react';
import { useUIStore } from '#store';

export default function Entry() {
  const user = useUIStore((state) => state.user);
  if (user) {
    return <UserTab />;
  } else {
    return <GLogin />;
  }
}
