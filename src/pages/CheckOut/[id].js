import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import ParentSideNav from "@/Components/ParentSideNav";
import NavBar from "@/Components/NavBar";
import dynamic from "next/dynamic";
import { Box, Spinner } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import style from '@/styles/Home.module.css';

// Dynamically import PaystackButton with SSR disabled
const PaystackButton = dynamic(() => import("react-paystack").then(mod => mod.PaystackButton), { ssr: false });

const GetStudents = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payedFor, setPayedFor] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState(0); // Initialize to 0
  const [userId, setId] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [studentId, setStudentId] = useState(null); // Set to null initially
  const [studentName, setStudentName] = useState("N/A"); // Default student name to 'N/A' if studentId is not provided

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      const { id, payedFor, price, studentId } = router.query;
  
      // Ensure `id` is present, and fallback values for optional fields
      if (!id) return;
      setId(id);
      setPayedFor(payedFor || "No description provided");
      setPrice(Number(price) || 0);
      setStudentId(studentId || null); // Set to null if studentId is not provided
  
      try {
        setLoading(true);
  
        // Fetch Parent Details
        const parentResponse = await axios.post(
          "http://localhost:9500/parent/findParentById",
          { id }
        );
  
        // Check if parent data exists
        const parent = parentResponse.data.parent?.[0];
        if (parent) {
          const fullName = `${parent.surName || ''} ${parent.otherNames || ''}`.trim();
          setEmail(parent.email || "N/A");
          setFullName(fullName.toUpperCase());
        } else {
          setError("Parent data not found.");
        }
  
        // Fetch Student Details only if `studentId` is provided
        if (studentId) {
          const studentResponse = await axios.post(
            "http://localhost:9500/student/findStudentById",
            { studentId }
          );
  
          // Check if student data exists
          const student = studentResponse.data.student?.[0];
          if (student) {
            const studentFullName = `${student.surName || ''} ${student.otherNames || ''}`.trim();
            setStudentName(studentFullName);
          } else {
            setStudentName("N/A"); // Fallback if student data not found
          }
        }
  
      } catch (error) {
        setError("Failed to fetch the required details.");
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDetails();
  }, [router.query]);
  
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

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: price * 100, // Convert to lowest currency unit
    publicKey: "pk_test_ea4c9b4f0591ec661174704f63adaadf2b2a2423",
  };

  const handlePaystackSuccessAction = async (reference) => {
    try {
      const res = await axios.post(
        "http://localhost:9500/payment/verifyPayment",
        reference
      );

      if (res.data.status) {
        console.log("Payment verification successful");

        const paymentObj = {
          Price:price, // Ensure price is sent correctly
          email,
          payedFor,
          fullName,
          parentId: userId,
          parentName:fullName,
          studentName,
          studentId: studentId || "N/A" // Handle missing studentId
        };

        const response = await axios.post(
          "http://localhost:9500/payment/addPayment",
          paymentObj
        );
        console.log(response.data)
        if (response.data.status) {
          Swal.fire("Success", response.data.message, "success");
          router.push(`/ParentPaymentPanel/${userId}`);
        }
        console.log(paymentObj)
      }
    } catch (error) {
      Swal.fire("Error", "Payment verification failed", "error");
      console.error("Payment verification failed", error);
    }
  };

  const handlePaystackCloseAction = () => {
    console.log("Payment dialog closed");
  };

  const componentProps = {
    ...config,
    text: "Continue to Payment",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <div className={style.unscroll}>
      <NavBar />
      <div className="row">
        <div className="container">
          <div className="row flex-nowrap">
            <ParentSideNav parent_Id={userId}/>
            <Box size="lg" maxW="2000px" ratio={15 / 5} className="col py-3">
              <h3 className="text-center">CheckOut</h3>
              <Box p={4}>
                {loading ? (
                  <Spinner size="xl" />
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  <div className="col-5 mb-3 mx-auto border-success border rounded-3">
                    <div className="d-flex justify-content-between p-3">
                      <div>Name:</div>
                      <div>{fullName}</div>
                    </div>
                    <div className="d-flex justify-content-between p-3">
                      <div>Email:</div>
                      <div>{email}</div>
                    </div>
                    <div className="d-flex justify-content-between p-3">
                      <div>Paying For/Description:</div>
                      <div>{payedFor}</div>
                    </div>
                    <div className="d-flex justify-content-between p-3">
                      <div>Amount:</div>
                      <div>N{price}</div>
                    </div>
                    <div className="d-flex justify-content-between p-3">
                      <div>Student Name:</div>
                      <div>{studentName}</div>
                    </div>
                    <div className="col-5 mx-auto p-2 mb-3 w-100">
                      {isClient && (
                        <PaystackButton
                          {...componentProps}
                          className="w-100 btn-success btn"
                        />
                      )}
                    </div>
                  </div>
                )}
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStudents;
