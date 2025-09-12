import { 
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
  Stack, Text, Box, Heading, Button, Flex, Grid, GridItem, Divider 
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LandingPageNav from "@/Components/LandingPageNav";
import Link from "next/link";
import logo from "../logo-removebg-preview.png"; // Ensure correct path

const MotionBox = motion(Box);

const carouselItems = [
  {
    title: "Excellence in Education",
    description: "Empowering students to achieve their dreams.",
    image: "/SMS image6.jpg",
  },
  {
    title: "A Community of Learners",
    description: "Fostering collaboration and creativity.",
    image: "/profile avatar.jpg",
  },
  {
    title: "Future Leaders",
    description: "Building the leaders of tomorrow.",
    image: "/logo-removebg-preview.png",
  },
];

const faqs = [
  {
    value: "faq1",
    title: "What curriculum does Al-Hudah International Group of Schools follow?",
    text: "We follow a balanced curriculum that integrates Islamic teachings with national and international academic standards.",
  },
  {
    value: "faq2",
    title: "What are the admission requirements?",
    text: "Admission requirements vary by grade level. Generally, students need to pass an entrance exam and submit necessary documents like birth certificates and previous academic records.",
  },
  {
    value: "faq3",
    title: "Do you offer Islamic studies along with regular subjects?",
    text: "Yes, we integrate Islamic studies, Quranic recitation, and Arabic language alongside core academic subjects.",
  },
];

const FAQAccordion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 10000);
    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <Box >
      <LandingPageNav />
      
      {/* Carousel Section */}
      <Box position="relative" height="80vh" overflow="hidden">
        {carouselItems.map((item, index) => (
          <MotionBox
            key={index}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bgImage={`url(${item.image})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <Flex
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              bg="rgba(0, 0, 0, 0.6)"
              color="white"
              p={6}
              borderRadius="md"
              textAlign="center"
              flexDirection="column"
              align="center"
            >
              <Heading size="lg" mb={4}>{item.title}</Heading>
              <Text mb={4}>{item.description}</Text>
              <Button colorScheme="teal">Learn More</Button>
            </Flex>
          </MotionBox>
        ))}
      </Box>

      <Divider my={8} />
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={6}
        className="my-2"
      >
        <GridItem>
          <Box p={8} bg="gray.100" borderRadius="md">
            <Heading size="lg" textAlign="center" mb={4}>
              Welcome to Al-Hudah International Group Of Schools
            </Heading>
            <Divider my={4} />
            <Text fontSize="md" textAlign="justify">
              A Center of Excellence in Islamic and Academic Education. <br />
              <br />
              At Al-Hudah Group Of Schools, we are committed to nurturing young
              minds with the light of knowledge and the spirit of faith. Our
              mission is to empower students with a balanced education that
              integrates Islamic values with academic excellence, preparing them
              to thrive in the modern world while remaining grounded in their
              faith. <br />
              <br />
              Our dedicated team of educators fosters a safe, respectful, and
              inspiring environment where students can grow spiritually,
              intellectually, and socially. Through a holistic approach to
              learning, we aim to cultivate future leaders who embody the
              principles of Islam—compassion, integrity, and wisdom. <br />
              <br />
              We warmly invite you to explore our school and discover how we can
              help shape your child’s future, insha’Allah.
            </Text>
            <Text fontWeight="bold" mt={4}>
              ~ Proprietor
            </Text>
          </Box>
        </GridItem>
        {/* School Logo */}
        <GridItem display="flex" justifyContent="center">
          <Image src={logo} width={550} height={50} alt="School Logo" />
        </GridItem>
      </Grid>
      <Divider my={8} />
      <Box>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={6}
          p={8}
          className="d-flex justify-content-center"
        >
          <GridItem className="col-3">
            <Box>
              <Heading size="lg" textAlign="center" mb={4}>
                Our Mission
              </Heading>
              <Divider />
              <Text fontSize="md" textAlign="justify">
                Al-hudah Group Of Schools is dedicated to providing a holistic
                educational experience that fosters the intellectual, spiritual,
                and social growth of our students. We aim to develop individuals
                who are committed to excellence, guided by Islamic principles,
                and prepared to contribute positively to society.
              </Text>
            </Box>
          </GridItem>
          <GridItem className="col-3">
            <Box>
              <Heading size="lg" textAlign="center" mb={4}>
                Our Vision
              </Heading>
              <Divider />
              <Text fontSize="md" textAlign="justify">
                To be a leading educational institution known for its commitment
                to academic excellence, Islamic values, and community
                engagement.
              </Text>
            </Box>
          </GridItem>
        </Grid>
        <Box className="d-flex justify-content-center mb-3">
          <Button>
            <Link href={"/About"} className="btn">
              Learn More
            </Link>
          </Button>
        </Box>
      </Box>
      <Divider my={5}></Divider>
      <Box>
        <Heading className="text-center">What We Offer</Heading>
        <Divider my={8} />
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={6}
          p={8}
          className="d-flex justify-content-center"
        >
          <GridItem className="col-3">
            <Box>
              <Heading size="lg" textAlign="center" mb={4}>
                Creche And Kindergaten School
              </Heading>
            </Box>
          </GridItem>
          <GridItem className="col-3">
            <Box>
              <Heading size="lg" textAlign="center" mb={4}>
                Nursery And Primary School
              </Heading>
            </Box>
          </GridItem>
          <GridItem className="col-3">
            <Box>
              <Heading size="lg" textAlign="center" mb={4}>
                Junior And Secondary School
              </Heading>
            </Box>
          </GridItem>
        </Grid>
        <Box className="d-flex justify-content-center mb-3"></Box>
      </Box>
      <Divider my={5}></Divider>
      {/* FAQ Section */}
      <Box maxW="800px" mx="auto" mb={5}>
        <Heading textAlign="center" mb={6}>Frequently Asked Questions</Heading>
        <Accordion allowToggle>
          {faqs.map((item, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton _expanded={{ bg: "teal.500", color: "white" }}>
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    {item.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{item.text}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};

export default FAQAccordion;
