import { Flex } from '@chakra-ui/react';
import SuggestRow from './SuggestRow';

export default function SuggestArea(props) {
  const {
    suggestion: { children, name: parentName, entity_type: parentType },
  } = props;
  return (
    <Flex direction="column" align="stretch" p={5}>
      <SuggestRow name={parentName} type={parentType} />
      <Flex align="stretch" direction="column">
        {children.map((child) => {
          return (
            <SuggestRow
              key={child.entity_id}
              name={child.name}
              isChild
              type={child.entity_type}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}
