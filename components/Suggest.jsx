import { Flex } from '@chakra-ui/react';
import SuggestArea from './SuggestArea';
import { useUIStore } from 'brain/store.js';

export default function Suggest() {
  const suggestions = useUIStore((state) => state.suggestedResults);
  return (
    <Flex
      align="stretch"
      direction="column"
      position="relative"
      overflowY="auto"
      maxH="30vh"
      boxShadow="0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)"
    >
      {suggestions.map((suggestion) => {
        return (
          <SuggestArea key={suggestion.entity_id} suggestion={suggestion} />
        );
      })}
    </Flex>
  );
}
