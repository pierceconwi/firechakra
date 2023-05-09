import React from "react";
import { Box, Center, Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
    return (
        <>
        <Center>
        <Box>
        <Flex>
        <Text 
            fontSize={[
                "0.8rem",
                "1rem",
                "1rem",
                "1rem",
                "1rem"
            ]}
            py="2px"
        >Copyright &#169; 2023 <Link href="https://pierceconwi.com" target="_blank" rel="noopener noreferrer" color="red.500">Pierce Conwi</Link>. All rights reserved.</Text>
        </Flex>
        </Box>
        </Center>
        </>
    );
}