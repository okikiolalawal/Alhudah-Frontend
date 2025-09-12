import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import ParentSideNav from "@/Components/ParentSideNav";
import ManagerNavBar from "@/Components/ManagerNavBar";

const ParentResults = () => {
  const router = useRouter();
  const parent_Id = router.query.parent_Id; // 👈 from SideNav
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]); // 👈 array instead of null

  useEffect(() => {
    if (!parent_Id) return; // wait until query param is available

    const fetchResults = async () => {
      setLoading(true);
      try {
        console.log("Fetching results for parent_Id:", parent_Id);

        const { data } = await axios.get(
          `http://localhost:9500/grades/getStudentsResultsByParentId/${parent_Id}`
        );

        if (data.status) {
          setResults(data.studentsGrade || []);
          console.log("Fetched results:", data.studentsGrade);
        } else {
          setResults([]);
          Swal.fire("Info", data.message, "info");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Something went wrong fetching results!", "error");
      }
      setLoading(false);
    };

    fetchResults();
  }, [parent_Id]);

  return (
    <Box>
      <ManagerNavBar />
      <div className="row">
        <div className="container">
          <div className="row flex-nowrap">
            <ParentSideNav parent_Id={parent_Id} />
            <Box size="lg" maxW="2000px" className="col py-3">
              <Box p={4}>
                <div className="mx-auto col-10 p-3 my-5 rounded-3">
                  <Heading mb={6}>My Children’s Results</Heading>

                  {loading && <Spinner mt={6} size="lg" />}

                  {results.map((item, index) => (
                    <Box
                      key={index}
                      mb={12}
                      p={6}
                      borderWidth="2px"
                      borderRadius="lg"
                      shadow="md"
                      bg="white"
                    >
                      {/* Report Header */}
                      <Box mb={6} textAlign="center">
                        <Heading size="lg" mb={2}>
                          Al-Hudah Model College
                        </Heading>
                        <Text fontSize="md" fontWeight="bold">
                          Student Report Sheet
                        </Text>
                      </Box>

                      {/* Student Info */}
                      <Box mb={6}>
                        <Text>
                          <b>Name:</b> {item.student.surName}{" "}
                          {item.student.otherNames}
                        </Text>
                        <Text>
                          <b>Class:</b> {item.student.classAdmittedTo}
                        </Text>
                        <Text>
                          <b>Gender:</b> {item.student.gender}
                        </Text>
                        <Text>
                          <b>Student ID:</b> {item.student.studentId}
                        </Text>
                      </Box>

                      {/* First Term */}
                      {item.grades.some((g) => g.firstTermPerSubject) && (
                        <Box mb={8}>
                          <Heading size="md" mb={4}>
                            First Term ({item.grades[0].session})
                          </Heading>
                          <Table size="sm" variant="striped" colorScheme="teal">
                            <Thead>
                              <Tr>
                                <Th>Subject</Th>
                                <Th>First Test</Th>
                                <Th>Second Test</Th>
                                <Th>CA</Th>
                                <Th>Exam</Th>
                                <Th>Total</Th>
                                <Th>Grade</Th>
                                <Th>Teacher Remarks</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {item.grades.map(
                                (grade, i) =>
                                  grade.firstTermPerSubject && (
                                    <Tr key={`first-${i}`}>
                                      <Td>
                                        {grade.firstTermPerSubject.subjectId}
                                      </Td>
                                      <Td>
                                        {grade.firstTermPerSubject.firstCa}
                                      </Td>
                                      <Td>
                                        {grade.firstTermPerSubject.secondCa}
                                      </Td>
                                      <Td>
                                        {
                                          grade.firstTermPerSubject
                                            .continuousAssesment
                                        }
                                      </Td>
                                      <Td>{grade.firstTermPerSubject.exam}</Td>
                                      <Td>
                                        {grade.firstTermPerSubject
                                          .weightedAverageScore}
                                      </Td>
                                        <Td>{grade.firstTermPerSubject.grade}</Td>
                                      <Td>
                                        {
                                          grade.firstTermPerSubject
                                            .teacherRemarks
                                        }
                                      </Td>
                                    </Tr>
                                  )
                              )}
                            </Tbody>
                          </Table>
                        </Box>
                      )}

                      {/* Second Term */}
                      {item.grades.some((g) => g.secondTermPerSubject) && (
                        <Box mb={8}>
                          <Heading size="md" mb={4}>
                            Second Term ({item.grades[0].session})
                          </Heading>
                          <Table size="sm" variant="striped" colorScheme="teal">
                            <Thead>
                              <Tr>
                                <Th>Subject</Th>
                                <Th>First Test</Th>
                                <Th>Second Test</Th>
                                <Th>CA</Th>
                                <Th>Exam</Th>
                                <Th>Total</Th>
                                <Th>Grade</Th>
                                <Th>Teacher Remarks</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {item.grades.map(
                                (grade, i) =>
                                  grade.secondTermPerSubject && (
                                    <Tr key={`second-${i}`}>
                                      <Td>
                                        {grade.secondTermPerSubject.subjectId}
                                      </Td>
                                      <Td>
                                        {grade.secondTermPerSubject.firstCa}
                                      </Td>
                                      <Td>
                                        {grade.secondTermPerSubject.secondCa}
                                      </Td>
                                      <Td>{grade.secondTermPerSubject.exam}</Td>
                                      <Td>
                                        {grade.secondTermPerSubject
                                          .weightedAverageScore}
                                      </Td>
                                        <Td>{grade.secondTermPerSubject.grade}</Td>
                                      <Td>
                                        {
                                          grade.secondTermPerSubject
                                            .teacherRemarks
                                        }
                                      </Td>
                                    </Tr>
                                  )
                              )}
                            </Tbody>
                          </Table>
                        </Box>
                      )}

                      {/* Third Term */}
                      {item.grades.some((g) => g.thirdTermPerSubject) && (
                        <Box mb={8}>
                          <Heading size="md" mb={4}>
                            Third Term ({item.grades[0].session})
                          </Heading>
                          <Table size="sm" variant="striped" colorScheme="teal">
                            <Thead>
                              <Tr>
                                <Th>Subject</Th>
                                <Th>First Test</Th>
                                <Th>Second Test</Th>
                                <Th>CA</Th>
                                <Th>Exam</Th>
                                <Th>Total</Th>
                                <Th>Grade</Th>
                                <Th>Teacher Remarks</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {item.grades.map(
                                (grade, i) =>
                                  grade.thirdTermPerSubject && (
                                    <Tr key={`third-${i}`}>
                                      <Td>
                                        {grade.thirdTermPerSubject.subjectId}
                                      </Td>
                                      <Td>
                                        {grade.thirdTermPerSubject.firstCa}
                                      </Td>
                                      <Td>
                                        {grade.thirdTermPerSubject.secondCa}
                                      </Td>
                                      <Td>{grade.thirdTermPerSubject.exam}</Td>
                                     <Td>
                                        {grade.thirdTermPerSubject
                                          .weightedAverageScore}
                                      </Td>
                                        <Td>{grade.thirdTermPerSubject.grade}</Td>
                                      <Td>
                                        {
                                          grade.thirdTermPerSubject
                                            .teacherRemarks
                                        }
                                      </Td>
                                    </Tr>
                                  )
                              )}
                            </Tbody>
                          </Table>
                        </Box>
                      )}
                    </Box>
                  ))}
                </div>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ParentResults;
