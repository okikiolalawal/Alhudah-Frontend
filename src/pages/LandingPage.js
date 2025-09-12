import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Text,
  Box,
  Heading,
  Button,
  Flex,
  Grid,
  GridItem,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LandingPageNav from "@/Components/LandingPageNav";
import Link from "next/link";
import Logo from '../logo-removebg-preview.png'

const MotionBox = motion(Box);

const carouselItems = [
  {
    title: "Excellence in Education",
    description: "Empowering students to achieve their dreams.",
    image: "/logo-removebg-preview.png", // <-- ensure this file exists in public/
  },
  {
    title: "A Community of Learners",
    description: "Fostering collaboration and creativity.",
    image: "/logo-removebg-preview.png", // <-- ensure this file exists in public/
  },
  {
    title: "Future Leaders",
    description: "Building the leaders of tomorrow.",
    image: "/logo-removebg-preview.png", // <-- ensure this file exists in public/
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

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 10000); // change slide every 10s
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % carouselItems.length);

  return (
    <Box>
      <LandingPageNav />

      {/* Carousel */}
      <Box position="relative" height="100vh" overflow="hidden">
        {carouselItems.map((item, index) => (
          <MotionBox
            key={index}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            // background image from /public
            bgImage={`url(${item.image})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            // animate opacity and zIndex so active slide sits on top
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0, zIndex: index === currentIndex ? 2 : 1 }}
            transition={{ duration: 0.9 }}
          >
            <Flex
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              bg="rgba(0, 0, 0, 0.55)"
              color="white"
              p={{ base: 4, md: 8 }}
              borderRadius="md"
              textAlign="center"
              flexDirection="column"
              align="center"
              maxW={{ base: "90%", md: "60%" }}
              mx="auto"
            >
              <Heading size={{ base: "md", md: "lg" }} mb={4}>
                {item.title}
              </Heading>
              <Text mb={4}>{item.description}</Text>
              <Button colorScheme="teal" as={Link} href="/About">
                Learn More
              </Button>
            </Flex>
          </MotionBox>
        ))}

        {/* Prev / Next buttons - using simple text so no external icon lib needed */}
        <Button
          aria-label="Previous slide"
          position="absolute"
          top="50%"
          left={{ base: 3, md: 6 }}
          transform="translateY(-50%)"
          onClick={prevSlide}
          variant="ghost"
          size="lg"
          color="white"
          _hover={{ bg: "rgba(255,255,255,0.12)" }}
          rounded="full"
        >
          ‹
        </Button>

        <Button
          aria-label="Next slide"
          position="absolute"
          top="50%"
          right={{ base: 3, md: 6 }}
          transform="translateY(-50%)"
          onClick={nextSlide}
          variant="ghost"
          size="lg"
          color="white"
          _hover={{ bg: "rgba(255,255,255,0.12)" }}
          rounded="full"
        >
          ›
        </Button>
      </Box>

      <Divider my={8} />

      {/* Welcome + Logo (kept original content) */}
      <Box className="container w-full" px={{ base: 4, md: 8 }}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} className="my-4" minH="50vh">
          <GridItem>
            <Box p={2} bg="gray.100" borderRadius="md">
              <Heading size="lg" textAlign="center" mb={4}>
                Welcome to Al-Hudah International Group Of Schools
              </Heading>
              <Divider my={4} />
              <Text fontSize="md" textAlign="justify">
                A Center of Excellence in Islamic and Academic Education. <br />
                <br />
                At Al-Hudah Group Of Schools, we are committed to nurturing young minds with the light of knowledge and the spirit of faith.
                Our mission is to empower students with a balanced education that integrates Islamic values with academic excellence, preparing them to thrive in the modern world while remaining grounded in their faith. <br />
                <br />
                Our dedicated team of educators fosters a safe, respectful, and inspiring environment where students can grow spiritually, intellectually, and socially. Through a holistic approach to learning, we aim to cultivate future leaders who embody the principles of Islam—compassion, integrity, and wisdom. <br />
                <br />
                We warmly invite you to explore our school and discover how we can help shape your child’s future, insha’Allah.
              </Text>
              <Text fontWeight="bold" mt={4}>
                ~ Proprietor
              </Text>
            </Box>
          </GridItem>

          <GridItem display="flex" justifyContent="center" alignItems="center">
            {/* Use public path directly with next/image */}
            <Image src="/logo-removebg-preview.png" width={550} height={80} alt="School Logo" />
          </GridItem>
        </Grid>
      </Box>

      <Divider my={8} />

      {/* Mission & Vision */}
<Box py={12} px={4}>
  <Grid
    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
    gap={8}
    maxW={{ base: "100%", md: "60%" }} // 60% ~ col-4/5 look
    mx="auto" // centers the grid
  >
    <GridItem>
      <Box textAlign="center">
        <Heading size="lg" mb={4}>
          Our Mission
        </Heading>
        <Divider mb={4} />
        <Text fontSize="md" textAlign="justify">
          Al-hudah Group Of Schools is dedicated to providing a holistic
          educational experience that fosters the intellectual, spiritual,
          and social growth of our students. We aim to develop individuals
          who are committed to excellence, guided by Islamic principles,
          and prepared to contribute positively to society.
        </Text>
      </Box>
    </GridItem>

    <GridItem>
      <Box textAlign="center">
        <Heading size="lg" mb={4}>
          Our Vision
        </Heading>
        <Divider mb={4} />
        <Text fontSize="md" textAlign="justify">
          To be a leading educational institution known for its commitment
          to academic excellence, Islamic values, and community engagement.
        </Text>
      </Box>
    </GridItem>
  </Grid>

  <Box textAlign="center" mt={8}>
    <Button as={Link} href="/About" colorScheme="teal">
      Learn More
    </Button>
  </Box>
</Box>


      <Divider my={5} />

      {/* What We Offer */}
      <Box px={{ base: 4, md: 8 }}>
        <Heading textAlign="center" my={4} p={4}>What We Offer</Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} p={8}>
          <GridItem>
            <Box>
              <Heading size="lg" textAlign="center" mb={4}>
                Creche And Kindergarten
              </Heading>
            </Box>
          </GridItem>
          <GridItem>
            <Box>
              <Heading size="lg" textAlign="center" mb={4}>
                Nursery And Primary
              </Heading>
            </Box>
          </GridItem>
          <GridItem>
            <Box>
              <Heading size="lg" textAlign="center" mb={4}>
                Junior And Secondary School
              </Heading>
            </Box>
          </GridItem>
        </Grid>
      </Box>

      <Divider my={5} />

      {/* FAQ Section */}
      <Box maxW="800px" mx="auto" mb={8} p={4}>
        <Heading textAlign="center" mb={6}>Frequently Asked Questions</Heading>
        <Accordion allowToggle>
          {faqs.map((item, idx) => (
            <AccordionItem key={idx}>
              <h2>
                <AccordionButton _expanded={{ bg: "teal.500", color: "white" }}>
                  <Box flex="1" textAlign="left" fontWeight="bold">{item.title}</Box>
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
}
