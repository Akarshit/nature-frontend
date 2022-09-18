import { Flex } from '@chakra-ui/react';
import { useUIStore } from '#store';

export default function Loading(props) {
  const loading = useUIStore((state) => state.loading);
  const { mode = 'full' } = props;
  const modes = {
    full: {
      position: 'absolute',
      w: '100vw',
      h: '100vh',
      align: 'center',
      justify: 'center',
      bgColor: 'rgb(0,0,0, 0.3)',
      zIndex: 5,
      display: loading ? 'flex' : 'none',
    },
    control: {
      zIndex: 1,
      position: 'absolute',
      w: '100%',
      justify: 'center',
      align: 'center',
      display: props.loading ? 'flex' : 'none',
    },
  };
  return (
    <Flex {...modes[mode]}>
      <div class="loadingio-spinner-ellipsis-pa8ucpmzvc">
        <div class="ldio-ik502s7n6fp">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Flex>
  );
}
