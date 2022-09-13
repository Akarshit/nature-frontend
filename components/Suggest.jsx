import { Flex } from '@chakra-ui/react';
import SuggestArea from './SuggestArea';
import { useUIStore } from '#store';

export default function Suggest() {
  const suggestions = useUIStore((state) => state.suggestedResults);
  const showSuggestions = useUIStore((state) => state.showSuggestions);
  if (!suggestions?.length || !showSuggestions) return null;
  return (
    <Flex w="100%" position="relative">
      <Flex
        w="100%"
        align="stretch"
        direction="column"
        background="white"
        zIndex={1}
        overflowY="auto"
        maxH="30vh"
        position="absolute"
        boxShadow="0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)"
      >
        {suggestions.map((suggestion) => {
          return (
            <SuggestArea key={suggestion.entity_id} suggestion={suggestion} />
          );
        })}
      </Flex>
    </Flex>
  );
}
