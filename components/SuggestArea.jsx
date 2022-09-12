import { Flex } from '@chakra-ui/react';
import SuggestRow from './SuggestRow';

export default function SuggestArea(props) {
  const {
    suggestion: {
      children,
      name: parentName,
      entity_type: parentType,
      entity_id: parentEntityId,
    },
  } = props;
  return (
    <Flex direction="column" align="stretch" p={1.5}>
      <SuggestRow
        name={parentName}
        type={parentType}
        entityId={parentEntityId}
      />
      {!!children && (
        <Flex align="stretch" direction="column">
          {children.map((child) => {
            return (
              <SuggestRow
                key={child.entity_id}
                name={child.name}
                isChild
                type={child.entity_type}
                entityId={child.entity_id}
              />
            );
          })}
        </Flex>
      )}
    </Flex>
  );
}
