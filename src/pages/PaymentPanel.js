import React, { useEffect, useState } from "react";
import style from "../styles/Home.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import ParentNavBar from "@/Components/ParentNavBar";
import ParentSideNav from "@/Components/ParentSideNav";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";

const GetBooks = () => {
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://localhost:9500/fees/getAdmissionFee"
        );
        setSubjects(response.subjects);
        console.log(response.subjects);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchSubjects();
  }, []);

 
  return (
    <div className={style.unscroll}>
      <ManagerNavBar />
      <div className="row">
        <div className="container">
          <div className="row flex-nowrap">
            <SideNav />
            <Box size="lg" maxW="2000px" ratio={15 / 5} className="col py-3">
              <Box p={4}>
               
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetBooks;
