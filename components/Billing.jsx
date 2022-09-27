import {
  Box,
  Button,
  Field,
  Flex,
  Form,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { COUNTRIES, STATES_BY_COUNTRY } from 'brain/constants';
import { useEffect, useState } from 'react';

import { Formik } from 'formik';
import { useUIStore } from '#store';

export default function Billing() {
  const address = useUIStore((state) => state.address);
  const user = useUIStore((state) => state.user);
  const setAddress = useUIStore((state) => state.setAddress);
  const paymentMode = useUIStore((state) => state.paymentMode);
  const isDisabled = paymentMode === 'gift-card';
  const [isInvalid, setInvalid] = useState(false);

  useEffect(() => {
    // setting initial value
    if (user) {
      setAddress(user.billingAddress || {});
    }
  }, [user]);

  return (
    <Box>
      <Formik
        initialValues={address}
        validate={(values) => {
          setAddress(values);
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          setInvalid(!!errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setAddress(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Text fontSize={'2xl'} mb={3} mt={3} fontFamily="sans-serif">
                Enter Billing Details:
              </Text>
              <Stack direction={'row'} spacing={10}>
                <FormControl isInvalid={false} isDisabled={isDisabled}>
                  <FormLabel color="blackAlpha.700">First Name:</FormLabel>
                  <Input
                    type="firstName"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl isDisabled={isDisabled}>
                  <FormLabel color="blackAlpha.700">Last Name:</FormLabel>
                  <Input
                    type="lastName"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>
              </Stack>
              <FormControl isDisabled={isDisabled}>
                <FormLabel color="blackAlpha.700">Address Line 1:</FormLabel>
                <Input
                  type="line1"
                  name="line1"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.line1}
                />
                <FormErrorMessage>{errors.line1}</FormErrorMessage>
              </FormControl>
              <FormControl isDisabled={isDisabled}>
                <FormLabel color="blackAlpha.700">Address Line 2:</FormLabel>
                <Input
                  type="line2"
                  name="line2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.line2}
                />
                <FormErrorMessage>{errors.line2}</FormErrorMessage>
              </FormControl>
              <Stack direction="row">
                <FormControl maxW={'9em'} isDisabled={isDisabled}>
                  <FormLabel color="blackAlpha.700">Country:</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="country"
                    name="country"
                  >
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.country}</FormErrorMessage>
                </FormControl>
                <FormControl maxW={'9em'} isDisabled={isDisabled}>
                  <FormLabel color="blackAlpha.700">State:</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="state"
                    name="state"
                  >
                    {STATES_BY_COUNTRY[values.country]?.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.state}</FormErrorMessage>
                </FormControl>
                <FormControl isDisabled={isDisabled}>
                  <FormLabel color="blackAlpha.700">City:</FormLabel>
                  <Input
                    type="city"
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                  />
                  <FormErrorMessage>{errors.city}</FormErrorMessage>
                </FormControl>
              </Stack>
              <FormControl mb={4} isDisabled={isDisabled}>
                <FormLabel color="blackAlpha.700">Zip Code:</FormLabel>
                <Input
                  type="zipcode"
                  name="zipcode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zipcode}
                />
                <FormErrorMessage>{errors.zipcode}</FormErrorMessage>
              </FormControl>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
}
