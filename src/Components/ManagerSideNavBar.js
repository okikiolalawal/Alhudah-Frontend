import { VStack, Link as ChakraLink, Flex, Box, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  const linkItems = [
    // { href: '/dashboard', label: 'Dashboard Overview' },
    { href: '/MBooks', label: 'Books/Fees' },
    { href: '/Parents', label: 'Parent Management' },
    { href: '/MPayment', label: 'Payment Management' },
    { href: '/MFinance', label: 'Finance Management' },
    { href: '/MAudit', label: 'Audit Management' },
    { href: '/MStudents', label: 'Student Management' },
    { href: '/MRoles', label: 'Role Management' },
    { href: '/MStaffs', label: 'Staff Management' },
  ];

  return (
    <Flex direction="column" minHeight="100vh">
      <Box as="header" bg="teal.500" p={4}>
        <Text fontSize="xl" color="white">Manager</Text>
      </Box>
      <Flex flex="1" direction="row">
        <Box as="nav" bg="gray.100" width="200px" p={4}>
          <VStack spacing={4} align="stretch">
            {linkItems.map((item) => (
              <NextLink href={item.href} passHref legacyBehavior key={item.href}>
                <ChakraLink
                  bg={router.pathname === item.href ? 'teal.100' : 'transparent'}
                  p={2}
                  borderRadius="md"
                  fontWeight={router.pathname === item.href ? 'bold' : 'normal'}
                  _hover={{ textDecoration: 'none', bg: 'teal.50' }}
                >
                  {item.label}
                </ChakraLink>
              </NextLink>
            ))}
          </VStack>
        </Box>
        <Box as="main" p={4} flex="1" bg="gray.50">
          {children}
        </Box>
      </Flex>
      <Box as="footer" bg="teal.500" p={4} textAlign="center">
        <Text fontSize="sm" color="white">© 2024 Al Hudah Group Of Schools. All rights reserved.</Text>
      </Box>
    </Flex>
  );
};

export default Layout;