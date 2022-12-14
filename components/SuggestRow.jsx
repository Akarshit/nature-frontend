import { Flex, Icon } from '@chakra-ui/react';
import {
  GiCampingTent,
  GiForestCamp,
  GiPalmTree,
  GiTicket,
} from 'react-icons/gi';

import { toTitleCase } from 'utils';
import { useUIStore } from '#store';

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
  const { name, isChild, type, outing } = props;
  const setOutingId = useUIStore((state) => state.setOutingId);
  const setOuting = useUIStore((state) => state.setOuting);
  const setSearchInput = useUIStore((state) => state.setSearchInput);
  const setShowSuggestions = useUIStore((state) => state.setShowSuggestions);
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
      }}
      onMouseDown={(e) => {
        if (type == 'recarea' && !isChild) {
        } else {
          setOutingId(outing._id);
          setOuting(outing);
          setSearchInput(toTitleCase(name));
          setShowSuggestions(false);
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
