import { Flex } from '@chakra-ui/react';
import SuggestArea from './SuggestArea';

export default function Suggest() {
  const suggestions = [
    {
      entity_id: '2994',
      entity_type: 'recarea',
      name: 'Zion National Park',
      children: [
        {
          entity_id: '232445',
          entity_type: 'campground',
          name: 'WATCHMAN CAMPGROUND',
          parent_id: '2994',
          parent_name: 'Zion National Park',
        },
        {
          entity_id: '272266',
          entity_type: 'campground',
          name: 'SOUTH CAMPGROUND (UT)',
          parent_id: '2994',
          parent_name: 'Zion National Park',
        },
        {
          entity_id: '10138237',
          entity_type: 'campground',
          name: 'Lava Point Campground',
          parent_id: '2994',
          parent_name: 'Zion National Park',
        },
        {
          entity_id: '4675324',
          entity_type: 'permit',
          name: 'Angels Landing: Summer (Hikes on June 1 – August 31)',
          parent_id: '2994',
          parent_name: 'Zion National Park',
        },
        {
          entity_id: '4675325',
          entity_type: 'permit',
          name: 'Angels Landing: Fall (Hikes on September 1 – November 30)',
          parent_id: '2994',
          parent_name: 'Zion National Park',
        },
      ],
    },
  ];
  return (
    <Flex align="stretch" direction="column" position="relative">
      {suggestions.map((suggestion) => {
        return (
          <SuggestArea key={suggestion.entity_id} suggestion={suggestion} />
        );
      })}
    </Flex>
  );
}
