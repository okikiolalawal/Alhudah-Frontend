import Layout from '../../components/Layout';
import { Box, SimpleGrid, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react';

const Dashboard = () => {

  useEffect(() => {
      const token = localStorage.getItem("token");
      const role = (localStorage.getItem("role") || "").toLowerCase();
  
      if (!token || (role !== "principal")) {
        router.push("/StaffLogin");
        return;
      }
  
      axios
        .get("http://localhost:9500/staff/getDashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (!response.data.status) {
            router.push("/StaffLogin");
          }
        })
        .catch(() => router.push("/StaffLogin"));
    }, [router]);

  return (
    <Layout>
      <Text fontSize="2xl" mb={6}>Welcome to Your Dashboard</Text>
      <SimpleGrid columns={[1, null, 3]} spacing={6}>
        <Box p={5} shadow="md" borderWidth="1px" bg="white">
          <Stat>
            <StatLabel>Total Classes</StatLabel>
            <StatNumber>5</StatNumber>
          </Stat>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" bg="white">
          <Stat>
            <StatLabel>Total Students</StatLabel>
            <StatNumber>120</StatNumber>
          </Stat>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" bg="white">
          <Stat>
            <StatLabel>Messages</StatLabel>
            <StatNumber>8</StatNumber>
          </Stat>
        </Box>
      </SimpleGrid>
    </Layout>
  );
};

export default Dashboard;
