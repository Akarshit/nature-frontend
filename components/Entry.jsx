import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';

import { useUIStore } from 'brain/store.js';

export default function Entry() {
  const oAuthLogin = useUIStore((state) => state.oAuthLogin);
  const user = useUIStore((state) => state.user);
  const onSuccess = (res) => {
    console.log(res);
    const { credential } = res;
    oAuthLogin(credential);
  };
  const onError = (err) => {
    console.log('failed:', err);
  };
  if (user) {
    return <Button>Logout {user.name}</Button>;
  } else {
    return <GoogleLogin onSuccess={onSuccess} onError={onError} />;
  }
}
