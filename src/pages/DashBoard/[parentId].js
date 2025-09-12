import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Text,
  Thead,
  Tr,
  TableContainer,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ParentSideNav from "@/Components/ParentSideNav";
import EventCalendar from "@/Components/Calendar";
import ManagerNavBar from "@/Components/ManagerNavBar";
import axios from "axios";

export default function ParentDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { parentId } = router.query; // Extract parent_Id from URL
  const [parent_Id, setParent_Id] = useState(null);

// ✅ Route guard
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "parent") {
      router.push("/Login");
      return;
    }

    axios
      .get("http://localhost:9500/parent/getDashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data)
        if (!response.data.status) {
          router.push("/Login");
        }
      })
      .catch(() => router.push("/Login"));
  }, [router]);


  useEffect(() => {
    if (!parentId) return;
    // console.log("Fetching students for Parent ID:", parentId);

    const fetchStudents = async () => {
      try {
        const response = await axios.post(
          `http://localhost:9500/student/getStudentsByParentId/${parentId}`
        );
        console.log(response.data);
        setStudents(response.data.students);
        setParent_Id(parentId);
      } catch (err) {
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [parentId]);
  console.log("Parent ID:", parentId); // Check if parent_Id is received

  const handleEdit = (studentId) => {
    router.push(`/EditStudent/${studentId}`);
  };
  const handleAddStudent = (parentId) => {
    router.push(`/AddStudent/${parentId}`);
  };

  const handleDetails = (student) => {
    setSelectedStudent(student);
    onOpen();
  };

  const handleSendMessage = () => {
    alert(`Message Sent: ${message}`);
    setMessage("");
  };

  return (
    <Box height="100vh" overflow="hidden">
      <ManagerNavBar />
      <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
        <div
          className="bg-success text-white" // Ensures full green background
          style={{
            width: "250px",
            height: "100vh",
            position: "fixed", // Keeps it in place
            top: 80,
            left: 0,
          }}
        >
          <ParentSideNav parent_Id={parentId} />
        </div>
        <div
          className="flex-grow-1"
          style={{
            marginLeft: "250px",
            overflowY: "auto",
            padding: "20px",
            height: "100vh",
          }}
        >
          <Box p={4}>
            {loading ? (
              <Spinner size="xl" />
            ) : error ? (
              <p>{error}</p>
            ) : (
              <>
                {/* Student List */}
                <div className="mx-auto p-3 my-5 rounded-3 border">
                  <div className="border-bottom text-center mb-2">STUDENTS</div>
                  <div className="d-flex justify-content-center p-3 border-bottom">
                    <Button
                      colorScheme="green"
                      onClick={() => handleAddStudent(parentId)}
                    >
                      Register Student
                    </Button>
                  </div>
                  <TableContainer>
                    <Table variant="striped" colorScheme="teal">
                      <Thead>
                        <Tr>
                          <Th>Student Id</Th>
                          <Th>Name</Th>
                          <Th>Admission Status</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Array.isArray(students) && students.length > 0 ? (
                          students.map((item) => (
                            <Tr key={item.studentId}>
                              <Td>{item.studentId}</Td>
                              <Td>
                                {item.surName} {item.otherNames}
                              </Td>
                              <Td
                                className={
                                  item.isAdmitted
                                    ? "text-success"
                                    : "text-primary"
                                }
                              >
                                <i>
                                  {item.isAdmitted ? "Admitted" : "Pending"}
                                </i>
                              </Td>
                              <Td>
                                <Button
                                  colorScheme="yellow"
                                  size="sm"
                                  onClick={() => handleEdit(item.studentId)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  colorScheme="blue"
                                  size="sm"
                                  ml={2}
                                  onClick={() => handleDetails(item)}
                                >
                                  Details
                                </Button>
                              </Td>
                            </Tr>
                          ))
                        ) : (
                          <Tr>
                            <Td colSpan="4" className="text-center">
                              No Students Registered
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </div>
                <div className="mt-3 border rounded-3 p-5 mx-auto mb-5">
                  <Heading className="text-center mb-3">
                    Events and Calendar
                  </Heading>
                  <hr />

                  <div className="row mx-auto">
                    {/* Calendar Section */}
                    <div className="col-md-8">
                      <div className="">
                        <EventCalendar />
                      </div>
                    </div>

                    {/* Events List Section */}
                    <div className="col-md-4">
                      <div className="border rounded-3 p-3">
                        <Heading size="md" className="mb-3">
                          Upcoming Events
                        </Heading>
                        <ul className="list-group">
                          <li className="list-group-item">
                            Exam Date - April 10, 2025
                          </li>
                          <li className="list-group-item">
                            PTA Meeting - April 15, 2025
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Message Section */}
                <Box mt={5} p={4} mb={3} className="col-10 mx-auto">
                  <Heading size="lg" textAlign="center">
                    Send Us A Message
                  </Heading>
                  <Textarea
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="d-flex justify-content-center mb-5">
                    <Button
                      colorScheme="green"
                      mt={3}
                      width="50%"
                      onClick={handleSendMessage}
                    >
                      Send
                    </Button>
                  </div>
                </Box>
              </>
            )}
          </Box>
        </div>
      </div>
      <Box
        as="footer"
        mt={8}
        bg="green.100"
        textAlign="center"
        color="white"
        className="w-100"
      >
        <Text fontSize="sm" fontWeight="bold">
          Al-Hudah International Schools
        </Text>
        <Text fontSize="sm">Plot 2-5 Al-Hudah Street, Itoko Titun.</Text>
        <Text fontSize="sm">Oke-Aregba, Abeokuta, Ogun State.</Text>
        <Text fontSize="sm">Tel: 08033809331, 08033663636</Text>
        <Text fontSize="xs" mt={2}>
          &copy; {new Date().getFullYear()} Al-Hudah International Schools. All
          rights reserved.
        </Text>
      </Box>
      {/* Student Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Student Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedStudent && (
              <Box textAlign="center">
                <Image
                  src={selectedStudent.profilePicture || "/default-avatar.png"}
                  alt="Student Picture"
                  width={100}
                  height={100}
                  borderRadius="full"
                  mx="auto"
                />
                <Box mt={3}>
                  <p>
                    <strong>Name:</strong> {selectedStudent.surName}{" "}
                    {selectedStudent.otherNames}
                  </p>
                  <p>
                    <strong>Student ID:</strong> {selectedStudent.studentId}
                  </p>
                  <p>
                    <strong>Gender:</strong> {selectedStudent.gender}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {selectedStudent.dateOfBirth}
                  </p>
                  <p>
                    <strong>Class:</strong> {selectedStudent.classTo}
                  </p>
                </Box>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
