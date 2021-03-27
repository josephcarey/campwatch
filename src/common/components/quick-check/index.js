import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import { DateTime } from "luxon";

import { parksData, rentalTypeDate } from "../../../constants/campsite-data";

import { checkAvailability } from "../../../utils/check-availability";

export default function QuickCheck() {
  const formik = useFormik({
    initialValues: {
      park: "92",
      arrivalDate: DateTime.now().toISODate(),
      nights: "2",
      rentalType: "25",
    },
    onSubmit: (values) => {
      checkAvailability({
        placeId: Number(values.park),
        arrivalDate: DateTime.fromISO(values.arrivalDate).toLocaleString(),
        nights: Number(values.nights),
        categoryId: Number(values.rentalType),
      });
      alert(JSON.stringify(values, undefined, 2));
    },
  });
  return (
    <Container padding="1em" border="1px" maxW="20em" mx="auto" rounded="8px">
      <form onSubmit={formik.handleSubmit}>
        {/* Form */}
        <VStack paddingY="0.0em" spacing="1.25em">
          {/* Heading */}
          <Box>
            <Heading align="center" size="lg" padding="0.5em">
              Quick-Check
            </Heading>
            {/* Description */}
            <Text align="center">
              use this form to quickly check whether a spot is available.
            </Text>
          </Box>
          {/* Park */}
          <FormControl id="park" isRequired>
            <FormLabel>Park</FormLabel>
            <Select
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.park}
            >
              {parksData.map((item) => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
            <FormHelperText>
              The park where you wanna do the campin'.
            </FormHelperText>
          </FormControl>
          {/* Arrival Date */}
          <FormControl id="arrivalDate" isRequired>
            <FormLabel>Arrival Date</FormLabel>
            <Input
              type="date"
              // min={DateTime.now().toFormat("yyyy-MM-dd")}
              min={DateTime.now().toISODate()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.arrivalDate}
            />
            <FormHelperText>
              The day you wanna arrive for the campin'.
            </FormHelperText>
          </FormControl>
          {/* Number of Nights */}
          <FormControl id="nights" isRequired>
            <FormLabel>Nights</FormLabel>
            <NumberInput
              min={1}
              max={21}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nights}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText>
              How many nights you wanna be campin'.
            </FormHelperText>
          </FormControl>
          {/* Rental Type */}
          <FormControl id="rentalType" isRequired>
            <FormLabel>Rental Type</FormLabel>
            <Select
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rentalType}
            >
              {rentalTypeDate.map((item) => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
            <FormHelperText>
              The park where you wanna do the campin'.
            </FormHelperText>
          </FormControl>
          <Button isLoading={false} colorScheme="blue" type="submit">
            Check
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
