import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useUIStore } from '#store';

export default function Toast() {
  const toastData = useUIStore((state) => state.toast);
  const toast = useToast();
  useEffect(() => {
    if (!toastData?.title) return;
    toast({
      ...toastData,
    });
  }, [toastData]);
}
