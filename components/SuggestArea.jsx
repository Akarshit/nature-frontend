import { Flex } from '@chakra-ui/react';
import SuggestRow from './SuggestRow';

export default function SuggestArea(props) {
  const { suggestion } = props;
  const {
    children,
    name: parentName,
    entity_type: parentType,
    entity_id: parentOutingId,
  } = suggestion;
  return (
    <Flex direction="column" align="stretch" p={1.5}>
      <SuggestRow name={parentName} type={parentType} outingId={suggestion} />
      {!!children && (
        <Flex align="stretch" direction="column">
          {children.map((child) => {
            return (
              <SuggestRow
                key={child._id}
                name={child.name}
                isChild
                type={child.entity_type}
                outing={child}
              />
            );
          })}
        </Flex>
      )}
    </Flex>
  );
}
