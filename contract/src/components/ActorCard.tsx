import {
    Heading,
    Stack,
    Box,
    Circle,
    Text
  } from '@chakra-ui/react';
  
const ActorCard: React.FC<{
    actor: any;
}> = ({
    actor
}) => {
    return (
        <Stack width={{base: "100%", sm: "30%"}} alignItems={'center'}>
            <Circle size={"12"} bg={"blue.200"} my={5}>
                <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '2xl', md: '2xl' }}
                color={"gray.700"}
                lineHeight={'110%'}>
                    {actor.id}
                </Heading>
          </Circle>

        <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '2xl', md: '2xl' }}
            color={'gray.700'}
            lineHeight={'110%'}>
                {actor.title}
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }}>{actor.description}</Text>
        </Stack>
    );
};

export default ActorCard;