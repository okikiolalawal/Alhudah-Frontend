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
import TeacherSideNav from "@/Components/TeacherSideNav";
import EventCalendar from "@/Components/Calendar";
import ManagerNavBar from "@/Components/ManagerNavBar";
import axios from "axios";

export default function ParentDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [students, setStudents] = useState([]);
  const [staffName, setStaffName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [classInfo, setClassInfo] = useState([]);
  const router = useRouter();
  const [selectedStudent, setSelectedStudent] = useState("");
  const { staffId } = router.query;

  const fetchClassDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:9500/staff/findStaffById/${staffId}`
      );
      const staff = data.staff;

      if (!staff) {
        setError("Staff not found");
        return;
      }

      const staffName = `${staff.surName} ${staff.otherNames}`;
      setStaffName(staffName);

      const { data: response } = await axios.post(
        `http://localhost:9500/staff/teachersDashboard`,
        { classTeacher: staffName }
      );

      setStudents(response.classDetails?.[0]?.students || []);
      // setClassInfo(response.classDetails?.[0])
      setClassInfo(response.classDetails[0]);
      console.log(classInfo.classteacher);
    } catch (error) {
      console.error(error);
      setError("Failed to load class details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "Teacher") {
      router.push("/Login");
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
        console.log(response.data);
        if (!response.data.status) {
          router.push("/Login");
        }
      })
      .catch(() => router.push("/Login"));
  }, [router]);

  const handleDetails = (student) => {
    setSelectedStudent(student);
    onOpen();
  };

  useEffect(() => {
    if (staffId) fetchClassDetails();
  }, [staffId]);

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
          <TeacherSideNav className={classInfo.className} />
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
          <Box p={4} mb={4}>
            {loading ? (
              <Spinner size="xl" />
            ) : error ? (
              <p>{error}</p>
            ) : (
              <>
                {/* Student List */}
                <Heading mb={4} p={3}>
                  {classInfo.classTeacher}
                </Heading>
                {loading ? (
                  <Spinner />
                ) : error ? (
                  <Text color="red.500">{error}</Text>
                ) : (
                  <Box>
                    <Heading size="md" mb={3}>
                      Class: {classInfo.className}
                    </Heading>
                    {students.length === 0 ? (
                      <Text>No students found</Text>
                    ) : (
                      <TableContainer border="1px solid #ccc" borderRadius="md">
                        <Table variant="simple">
                          <Thead bg="gray.100">
                            <Tr>
                              <Th>SN</Th>
                              <Th>Full Name</Th>
                              <Th>Student ID</Th>
                              <Th>Gender</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {students.map((student, index) => (
                              <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>
                                  {student.surName} {student.otherNames}
                                </Td>
                                <Td>{student.studentId}</Td>
                                <Td>{student.gender}</Td>
                                <Td>
                                  <Button
                                    colorScheme="blue"
                                    size="sm"
                                    ml={2}
                                    onClick={() => handleDetails(student)}
                                  >
                                    Details
                                  </Button>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    )}
                  </Box>
                )}
                <Box>
                  <div className="mb-5 w-100 mt-5 rounded-3 p-3 border col-12">
                    <Heading className="text-center mb-3 border-bottom">
                      Events and Calendar
                    </Heading>
                    <div className="row mx-auto p-3">
                      {/* Calendar Section */}
                      <div className="col-md-8">
                        <div className="">
                          <EventCalendar mb={5} />
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
                </Box>
              </>
            )}
          </Box>
        </div>
      </div>
      <Box
        as="footer"
        p={4}
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
