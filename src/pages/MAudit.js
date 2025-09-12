import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Input,
  useToast,
  Table,
  Td,
  Tr,
  Th,
  Thead,
  Tbody,
} from "@chakra-ui/react";
import axios from "axios";
import Layout from "@/Components/ManagerSideNavBar";
import Swal from "sweetalert2";

export default function ViewTransactions() {
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const toast = useToast();

  const handleSearchByStudentId = async () => {
    if (!selectedStudentId.trim()) {
      Swal.fire("Error", "Please enter a student ID.", "error");
      return;
    }

    useEffect(() => {
      const token = localStorage.getItem("token");
      const role = (localStorage.getItem("role") || "").toLowerCase();

      if (!token || role !== "manager") {
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

    try {
      const response = await axios.post(
        "http://localhost:9500/audit/getTransactionByStudentId",
        { studentId: selectedStudentId.trim() }
      );

      if (response.data.status) {
        const transactions = response.data.transactions;
        setTransactions(transactions);

        const total = transactions.reduce(
          (sum, item) => sum + Number(item.amountPaid),
          0
        );
        setTotalAmount(total);

        Swal.fire("Success", "Transactions fetched successfully", "success");
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Could not fetch transactions", "error");
    }
  };

  return (
    <Layout>
      <Box height="100vh" overflow="hidden">
        <Box display="flex" height="100vh">
          <Box ml="250px" p={6} flex="1" overflowY="auto">
            <Heading mb={5} textAlign="center">
              Transactions
            </Heading>

            <Box display="flex" justifyContent="center" gap={4} mb={6}>
              <Input
                placeholder="Enter Student ID"
                width="300px"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              />
              <Button colorScheme="blue" onClick={handleSearchByStudentId}>
                Fetch Transactions
              </Button>
            </Box>

            {transactions.length > 0 && (
              <Box p={4} bg="white" borderRadius="md" boxShadow="md">
                <Heading size="md" mb={4}>
                  Transaction Records
                </Heading>
                <Table variant="striped" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Amount Paid (₦)</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {transactions.map((transaction, index) => (
                      <Tr key={index}>
                        <Td>
                          {new Date(transaction.DatePayed).toLocaleDateString()}
                        </Td>
                        <Td>
                          ₦{Number(transaction.amountPaid).toLocaleString()}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <Box mt={4}>
                  <Text fontWeight="bold" fontSize="lg">
                    Total Amount Paid: ₦{totalAmount.toLocaleString()}
                  </Text>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
