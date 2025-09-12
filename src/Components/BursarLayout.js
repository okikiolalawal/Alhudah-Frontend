import { VStack, Link as ChakraLink, Flex, Box, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/StaffLogin");
  }
  const linkItems = [
    { href: '/GetBooks', label: 'Books/Fees' },
    { href: '/Payments', label: 'Payment' },
    { href: '/Audit', label: 'Audit' },
    { href: '/Finances', label: 'Finances' },
  ];

  return (
    <Flex direction="column" minHeight="100vh">
      {/* Header */}
      <Flex as="header" bg="teal.500" p={4} justify="space-between" align="center">
        <Text fontSize="xl" color="white">Bursary</Text>
        <Button
                  size="sm"
                  variant="outline"
                  color="white"
                  borderColor="white"
                  _hover={{ bg: 'white', color: 'teal.500' }}
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
      </Flex>

      {/* Sidebar + Main */}
      <Flex flex="1" direction="row">
        <Box as="nav" bg="gray.100" width="200px" p={4}>
          <VStack spacing={4} align="stretch">
            {linkItems.map((item) => (
              <NextLink href={item.href} passHref legacyBehavior key={item.href}>
                <ChakraLink
                  bg={router.pathname === item.href ? 'teal.100' : 'transparent'}
                  p={2}
                  borderRadius="md"
                  _hover={{ textDecoration: 'none', bg: 'teal.50' }}
                >
                  {item.label}
                </ChakraLink>
              </NextLink>
            ))}
          </VStack>
        </Box>

        {/* Main content */}
        <Box as="main" p={4} flex="1" bg="gray.50">
          {children}
        </Box>
      </Flex>

      {/* Footer */}
      <Box as="footer" bg="teal.500" p={4} textAlign="center">
        <Text fontSize="sm" color="white">
          © 2024 Al Hudah Group Of Schools. All rights reserved.
        </Text>
      </Box>
    </Flex>
  );
};

export default Layout;
