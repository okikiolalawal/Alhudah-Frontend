import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Spinner,
  Box,
  Button,
} from "@chakra-ui/react";
import Layout from "@/Components/VicePrincipalLayout";
import { useRouter } from "next/router";

export default function GradingPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = (localStorage.getItem("role") || "").toLowerCase();

    if (!token || (role !== "principal" && role !== "vice principal")) {
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

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const classesRes = await axios.get(
        "http://localhost:9500/class/getAllClasses"
      );

      let allClasses = classesRes.data.classes || [];

      // normalize role
      let userRole = (localStorage.getItem("role") || "").toLowerCase();

      if (userRole === "vice principal") {
        allClasses = allClasses.filter(
          (c) =>
            c.className.toLowerCase().startsWith("jss") ||
            c.className.toLowerCase().startsWith("ss")
        );
      } else if (
        userRole === "head master" ||
        userRole === "assistant head master"
      ) {
        allClasses = allClasses.filter((c) =>
          c.className.toLowerCase().startsWith("primary")
        );
      }

      setClasses(allClasses);
    } catch (err) {
      console.error("Error fetching classes:", err);
    } finally {
      setLoading(false);
    }
  };

  const gotToGrading = (className) => {
    router.push(`/VPGradingByClass/${className}`);
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Layout>
      <Box p={5}>
        <Heading size="lg" mb={4}>
          Grading - All Classes
        </Heading>

        <TableContainer>
          <Table variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th>Class Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {classes.map((cls) => (
                <Tr key={cls._id}>
                  <Td>{cls.className.toUpperCase()}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => gotToGrading(cls.className)}
                    >
                      View Grades for this class
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
}
