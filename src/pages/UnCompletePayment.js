import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Spinner,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
  Divider,
  Text,
  Center,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import Layout from "@/Components/PrincipalLayout";
import logo from "../logo-removebg-preview.png";
import Image from "next/image";
import { useRouter } from "next/router";

const AdminDashboardTabs = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null); // Store the selected student
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal control
  const printRef = useRef(); // Ref for the printable receipt section
  const [paymentRef, setPaymentRef] = useState(""); // For approve payment tab
  const [loadingApprove, setLoadingApprove] = useState(false); // Loading state for approve payment
  const [error, setError] = useState(null);
  const [payment, setPayment] = useState(null);
  const toast = useToast();
  const router = useRouter();

  const searchPaymentRef = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:9500/payment/getPaymentById",
        {
          paymentRef,
        }
      );

      if (response.data.status) {
        setPayment(response.data.payment);
        toast({
          title: "Payment found",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setPayment(null);
        toast({
          title: response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      setError("An error occurred while fetching the payment.");
      toast({
        title: "Error",
        description: "Something went wrong while fetching payment.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      const token = localStorage.getItem("token");
      const role = (localStorage.getItem("role") || "").toLowerCase();
  
      if (!token || role !== "bursar") {
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

  const handleApprovePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9500/payment/approvePayment",
        {
          paymentRef,
        }
      );

      if (response.data.status) {
        toast({
          title: "Payment Approved",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setPayment(response.data.payment); // Updated payment info
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred while approving payment.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    const fetchStudentsWithPendingPayments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:9500/payment/getUncompletedPayments"
        );
        if (data.status) {
          setClasses(data.classes);
        } else {
          console.error("No pending payments found");
        }
      } catch (error) {
        console.error("Error fetching pending payments:", error);
      }
      setLoading(false);
    };

    fetchStudentsWithPendingPayments();
  }, []);

  // Function to handle the print action (only print the modal content)
  const handlePrint = () => {
    const printContent = printRef.current;
    const originalContent = document.body.innerHTML;

    // Replace body content with the modal content for printing
    document.body.innerHTML = printContent.innerHTML;

    // Open print dialog
    window.print();

    // Restore original content and reload to restore event listeners
    document.body.innerHTML = originalContent;
    window.location.reload();
  };
  // Function to handle viewing receipt (open modal)
  const handleViewReceipt = (student) => {
    setSelectedStudent(student); // Set the student to be viewed in the modal
    onOpen(); // Open the modal
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Layout>
      <Tabs variant="soft-rounded" colorScheme="teal" isFitted>
        <TabList>
          <Tab>Approve Payment</Tab>
          <Tab>Pending Payments</Tab>
        </TabList>

        <TabPanels>
          {/* Approve Payment Tab */}
          <TabPanel>
            <Box p={6} maxW="md" mx="auto">
              <Text fontSize="2xl" mb={4} fontWeight="bold">
                Approve Payment
              </Text>

              <FormControl id="paymentRef" mb={4}>
                <FormLabel>Payment Reference</FormLabel>
                <Input
                  type="text"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  placeholder="Enter payment reference"
                />
              </FormControl>

              <Button
                colorScheme="teal"
                onClick={searchPaymentRef}
                isLoading={loading}
                loadingText="Searching..."
              >
                Search
              </Button>

              {error && (
                <Box color="red.500" mt={2}>
                  {error}
                </Box>
              )}

              {payment && (
                <Box
                  mt={6}
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  boxShadow="md"
                  bg="gray.50"
                >
                  <Text>
                    <strong>Student ID:</strong> {payment.studentId}
                  </Text>
                  {/* <Text>
                          <strong>Student Name:</strong> {payment.fullName || "N/A"}
                        </Text> */}
                  <Text>
                    <strong>Amount Paid:</strong> {payment.amountPaid} Naira
                  </Text>
                  <Text>
                    <strong>Description:</strong> {payment.payedFor}
                  </Text>
                  <Text>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{ color: payment.approved ? "green" : "orange" }}
                    >
                      {payment.approved ? "Approved" : "Pending"}
                    </span>
                  </Text>

                  {!payment.approved && (
                    <Button
                      mt={4}
                      colorScheme="green"
                      onClick={handleApprovePayment}
                    >
                      Approve Payment
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          </TabPanel>

          {/* Pending Payments Tab */}
          <TabPanel>
            <h2>Pending Payments by Class</h2>
            <Tabs variant="soft-rounded" colorScheme="teal" isFitted>
              <TabList>
                {classes.map((classItem, index) => (
                  <Tab key={index}>{classItem.className}</Tab>
                ))}
              </TabList>

              <TabPanels>
                {classes.map((classItem, index) => (
                  <TabPanel key={index}>
                    <TableContainer>
                      <Table variant="striped" colorScheme="teal">
                        <Thead>
                          <Tr>
                            <Th>Student ID</Th>
                            <Th>Name</Th>
                            <Th>Total Fees To Pay</Th>
                            <Th>Total Amount Paid</Th>
                            <Th>Balance Due</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {classItem.students.map((student, studentIndex) => (
                            <Tr key={studentIndex}>
                              <Td>{student.studentId}</Td>
                              <Td>{student.name}</Td>
                              <Td>{student.totalFeesToPay}</Td>
                              <Td>{student.totalAmountPaid}</Td>
                              <Td>{student.balanceDue}</Td>
                              <Td>
                                <Button
                                  colorScheme="teal"
                                  onClick={() => handleViewReceipt(student)}
                                >
                                  View Receipt
                                </Button>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>

            {/* Modal for showing receipt */}
            {selectedStudent && (
              <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Receipt for {selectedStudent.name}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody ref={printRef}>
                    {/* Custom Receipt Design */}
                    <VStack
                      spacing={4}
                      border="1px solid #e2e8f0"
                      padding="20px"
                      backgroundColor="white"
                      borderRadius="md"
                      boxShadow="md"
                      textAlign="left"
                    >
                      {/* Header: School Logo, Name */}
                      <HStack justify="space-between" width="100%">
                        <Box>
                          <Text fontSize="md" fontWeight="bold">
                            <Image
                              src={logo}
                              alt="school logo"
                              width={80}
                              height={80}
                            />
                            Al-Hudah International Schools
                            <Text>Plot 2-5 Al-Hudah Street, Itoko Titun.</Text>
                            <Text>Oke-Aregba, Abeokuta, Ogun State.</Text>
                            <Text>Tel: 08033809331, 08033663636</Text>
                          </Text>
                          <Text fontSize="sm"></Text>
                        </Box>
                        <Box>
                          <Text fontSize="sm" textAlign="right">
                            Date: {new Date().toLocaleDateString()}
                          </Text>
                        </Box>
                      </HStack>

                      <Divider />

                      {/* Student Information */}
                      <Box width="100%">
                        <Text>
                          <strong>Student ID:</strong>{" "}
                          {selectedStudent.studentId}
                        </Text>
                        <Text>
                          <strong>Name:</strong> {selectedStudent.name}
                        </Text>
                      </Box>

                      <Divider />

                      {/* Payment Details */}
                      <Box width="100%">
                        <HStack justify="space-between">
                          <Text fontWeight="bold">Total Fees To Pay:</Text>
                          <Text>{selectedStudent.totalFeesToPay} Naira</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text fontWeight="bold">Total Amount Paid:</Text>
                          <Text>{selectedStudent.totalAmountPaid} Naira</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text fontWeight="bold">Balance Due:</Text>
                          <Text>{selectedStudent.balanceDue} Naira</Text>
                        </HStack>
                      </Box>

                      <Divider />

                      {/* Footer */}
                      <Center>
                        <Text fontSize="sm">
                          Thank you for your payment. Please retain this receipt
                          for your records.
                        </Text>
                      </Center>
                    </VStack>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handlePrint}>
                      Print Receipt
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default AdminDashboardTabs;
