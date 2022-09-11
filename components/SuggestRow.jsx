import { Flex, Icon } from '@chakra-ui/react';
import toTitleCase from 'utils';
import { GiCampingTent, GiTicket, GiForestCamp } from 'react-icons/gi';

function SuggestRowIcon(props) {
  const { rectype } = props;
  const style = {
    mx: 2,
    boxSize: 7,
  };
  if (rectype == 'campground') {
    return <Icon as={GiCampingTent} color="green" {...style} />;
  } else if (rectype == 'permit') {
    return <Icon as={GiTicket} color="red" {...style} />;
  } else if (rectype == 'recarea') {
    return <Icon as={GiForestCamp} color="orange" {...style} />;
  } else {
    return <Icon as={GiForestCamp} color="yellow" {...style} />;
  }
}

export default function SuggestRow(props) {
  const { name, isChild, type } = props;
  return (
    <Flex
      align="stretch"
      direction="row"
      grow={0.1}
      p={1}
      py={1.5}
      fontWeight={400}
      fontStretch="normal"
      fontSize="14px"
      lineHeight="20px"
      fontFamily="Roboto, Arial, sans-serif"
      letterSpacing="0.2px"
      pl={isChild ? 8 : 0}
      _hover={{
        background: 'blackAlpha.50',
        //color: "teal.500",
      }}
    >
      <SuggestRowIcon rectype={type} />
      <Flex align="center">{toTitleCase(name)}</Flex>
    </Flex>
  );
}
