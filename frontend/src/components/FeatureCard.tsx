import {
    Heading,
    Flex,
    Stack,
    Text,
  } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeatureCard: React.FC<{
    feature: any;
}> = ({
    feature
}) => {
    return (
        <Stack width={{base: "100%", sm: "30%"}} minWidth={"30%"}>
            <FontAwesomeIcon icon={feature.icon} size="3x" color="#90CAF9"/>
        <Heading
            fontWeight={600}
            fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }}
            pt={5}
            color={'gray.700'}
            lineHeight={'110%'}>
                {feature.title}
          </Heading>
        <Text pt={5} color={'gray.500'} fontSize={{ base: 'lg', sm: 'lg', md: 'lg' }}>{feature.description}</Text>
        </Stack>
    );
};

export default FeatureCard;