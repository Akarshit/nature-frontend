import { Flex, Icon } from '@chakra-ui/react';
import toTitleCase from 'utils';
import {
  GiCampingTent,
  GiTicket,
  GiForestCamp,
  GiPalmTree,
} from 'react-icons/gi';
import { useUIStore } from 'brain/store.js';

function SuggestRowIcon(props) {
  const { rectype } = props;
  const style = {
    mx: 1.5,
    boxSize: 7,
  };
  if (rectype == 'campground') {
    return <Icon as={GiCampingTent} color="green" {...style} />;
  } else if (rectype == 'permit') {
    return <Icon as={GiTicket} color="olive" {...style} />;
  } else if (rectype == 'recarea') {
    return <Icon as={GiForestCamp} color="orange" {...style} />;
  } else {
    return <Icon as={GiPalmTree} color="orange.600" {...style} />;
  }
}

export default function SuggestRow(props) {
  const { name, isChild, type, entityId } = props;
  console.log(entityId);
  const setEntityId = useUIStore((state) => state.setEntityId);
  const setSearchInput = useUIStore((state) => state.setSearchInput);
  return (
    <Flex
      align="stretch"
      direction="row"
      grow={0.1}
      p={1}
      fontWeight={400}
      fontStretch="normal"
      fontSize="14px"
      lineHeight="20px"
      fontFamily="Roboto, Arial, sans-serif"
      letterSpacing="0.2px"
      pl={isChild ? 8 : 0}
      _hover={{
        background: type == 'recarea' && !isChild ? 'white' : 'blackAlpha.100',
        //color: "teal.500",
      }}
      onClick={(e) => {
        if (type == 'recarea' && !isChild) {
          console.log('do nothing');
        } else {
          console.log('hello', entityId);
          setEntityId(entityId);
          setSearchInput(toTitleCase(name));
        }
      }}
    >
      <SuggestRowIcon rectype={type} />
      <Flex align="center" textColor="blackAlpha.900">
        {toTitleCase(name)}
      </Flex>
    </Flex>
  );
}
