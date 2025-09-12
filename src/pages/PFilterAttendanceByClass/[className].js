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
  Thead,
  Tr,
  useToast,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "@/Components/PrincipalLayout";
// import ManagerNavBar from "@/Components/ManagerNavBar";
import axios from "axios";

export default function ParentDashboard() {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [studentId, setStudentId] = useState("");
  const [term, setTerm] = useState("");
  const [filterResults, setFilterResults] = useState([]);
  const toast = useToast();
  const router = useRouter();
  const { className } = router.query;

  // Fetch student list
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:9500/class/getStudentsByClassName/${className}`
        );
        setStudents(data.students || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (className) fetchStudents();
  }, [className]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = (localStorage.getItem("role") || "").toLowerCase();

//     if (!token || role !== "principal") {
//       router.push("/StaffLogin");
//       return;
//     }

//     axios
//       .get("http://localhost:9500/staff/getDashboard", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       })
//       .then((response) => {
//         if (!response.data.status) {
//           router.push("/StaffLogin");
//         }
//       })
//       .catch(() => router.push("/StaffLogin"));
//   }, [router]);

  // Handle filtering by date
  const handleDateFilter = async () => {
    if (!selectedDate) {
      toast({ title: "Please select a date.", status: "error" });
      return;
    }

    setLoading(true);
    try {
      const formattedDate = new Date(selectedDate).toISOString().split("T")[0]; // YYYY-MM-DD format
      const { data } = await axios.get(
        `http://localhost:9500/attendance/getAttendanceByDateAndClassName/${className}/${formattedDate}`
      );
      setAttendanceData(data.gottenStudents);
    } catch (error) {
      console.error(error);
      toast({ title: "Error fetching attendance data.", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handle filtering by student and term
  const handleStudentTermFilter = async () => {
    if (!studentId || !term) {
      toast({ title: "Please select both student and term.", status: "error" });
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:9500/attendance/getAttendanceByStudentIdAndTerm/${studentId}/${term}`
      );
      setFilterResults(data.data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error fetching student attendance data.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box height="100vh" overflow="hidden">
      <Layout>
        <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
          
          <div
            className="flex-grow-1"
            style={{
              marginLeft: "250px",
              overflowY: "auto",
              padding: "20px",
              height: "100vh",
            }}
          >
            <Heading mb={4}>Filter Attendance</Heading>
            <div className="row">
              {/* Date Filter */}
              <div className="col-6">
                <Input
                  type="date"
                  mb={4}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <Button colorScheme="teal" onClick={handleDateFilter}>
                  Filter by Date
                </Button>
              </div>

              {/* Filter Student and term */}
              <div className="col-6">
                <Box className="row">
                  {/* Student & Term Filter */}
                  <div className="col-6">
                    <Select
                      placeholder="Select Student"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      mb={4}
                    >
                      {students.map((student) => (
                        <option
                          key={student.studentId}
                          value={student.studentId}
                        >
                          {student.surName} {student.otherNames}{" "}
                          {student.studentId}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-6">
                    <Select
                      placeholder="Select Term"
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      mb={4}
                    >
                      <option value="firstTerm">First Term</option>
                      <option value="secondTerm">Second Term</option>
                      <option value="thirdTerm">Third Term</option>
                    </Select>
                  </div>
                  <Button colorScheme="teal" onClick={handleStudentTermFilter}>
                    Filter by Student & Term
                  </Button>
                </Box>
              </div>
            </div>

            {loading ? (
              <Spinner />
            ) : (
              <Box mt={4}>
                {/* Attendance Data by Date */}
                {attendanceData.length > 0 ? (
                  <Box mt={4}>
                    <Heading size="md">Attendance for {selectedDate}</Heading>
                    <Table variant="simple" mt={4}>
                      <Thead>
                        <Tr>
                          <Th>Student Id</Th>
                          <Th>Student</Th>
                          <Th>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {attendanceData.map((attendance) => (
                          <Tr key={attendance._id}>
                            <Td>{attendance.studentId}</Td>
                            <Td>{attendance.studentName}</Td>
                            <Td>{attendance.status}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                ) : (
                  <Text>No attendance records found for this date.</Text>
                )}
              </Box>
            )}

            {filterResults &&
            filterResults.presentDates &&
            filterResults.presentDates.length > 0 ? (
              <Box mt={6}>
                <Heading size="md">Attendance for {studentId}</Heading>
                <Table variant="simple" mt={4}>
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filterResults.presentDates.map((date) => (
                      <Tr key={date}>
                        <Td>{date}</Td>
                        <Td>Present</Td>
                      </Tr>
                    ))}
                    {filterResults.absentDates.map((date) => (
                      <Tr key={date}>
                        <Td>{date}</Td>
                        <Td>Absent</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Box mt={4}>
                  <Heading size="sm">
                    Total Present: {filterResults.totalPresent} | Total Absent:{" "}
                    {filterResults.totalAbsent}
                  </Heading>
                  <Heading size="sm">
                    Total School Days: {filterResults.totalSchoolDays}
                  </Heading>
                </Box>
              </Box>
            ) : (
              <Text>No attendance data for the selected student and term.</Text>
            )}
          </div>
        </div>
      </Layout>
    </Box>
  );
}
