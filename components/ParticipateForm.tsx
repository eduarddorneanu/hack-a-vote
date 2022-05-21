import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import * as yup from "yup";

interface ParticipateForm {
  isFormShown: boolean;
}

const ParticipateFormValidator = yup.object().shape({
  name: yup.string().required("Project Name is required"),
  url: yup.string(),
  contribuitors: yup
    .array()
    .of(yup.string().required("This field is required"))
    .required(),
});

const ParticipateForm: React.FC<ParticipateForm> = ({ isFormShown }) => {
  const formik = useFormik({
    initialValues: {
      contribuitors: [""],
      name: "",
      url: "",
    },
    validationSchema: ParticipateFormValidator,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box
      opacity={isFormShown ? 1 : 0}
      height={isFormShown ? "full" : 0}
      transition="height 0.3s, opacity 0.3s"
    >
      <FormikProvider value={formik}>
        <Form style={{ width: "100%" }}>
          <VStack flexDir="column">
            <HStack alignItems="flex-start" spacing={20} width="full">
              <VStack justifyContent="flex-start">
                <Heading fontSize="2xl" margin="0px" padding="0px">
                  Project Info
                </Heading>

                <FormControl
                  isInvalid={formik.errors.name && formik.touched.name}
                >
                  <FormLabel htmlFor="name">Project Name</FormLabel>
                  <Input
                    {...formik.getFieldProps("name")}
                    id="name"
                    placeholder="project name"
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.url && formik.touched.url}
                >
                  <FormLabel htmlFor="url">Frontend URL</FormLabel>
                  <Input
                    width="300px"
                    {...formik.getFieldProps("url")}
                    id="url"
                    placeholder="https://www.google.com"
                  />
                  <FormErrorMessage>{formik.errors.url}</FormErrorMessage>
                </FormControl>
              </VStack>
              <VStack>
                <Heading fontSize="2xl" margin="0px" padding="0px">
                  Contribuitors
                </Heading>
                <FieldArray
                  name="contribuitors"
                  render={(helpers) => (
                    <Box>
                      <Button
                        onClick={() => {
                          helpers.push("");
                        }}
                        marginBottom="10px"
                      >
                        <Text fontWeight="bold" fontSize="lg">
                          Add contribuitor
                        </Text>
                        <AddIcon marginLeft="4" cursor="pointer" />
                      </Button>
                      {formik.values.contribuitors.map((_, index) => (
                        <HStack alignItems="center" marginBottom="20px">
                          <FormControl
                            isInvalid={
                              formik.errors.contribuitors
                                ? !!formik.errors.contribuitors[index]
                                : false
                            }
                          >
                            <FormLabel htmlFor={`contribuitors.${index}`}>
                              Contribuitor #{index + 1}
                            </FormLabel>
                            <Input
                              width="300px"
                              {...formik.getFieldProps(
                                `contribuitors.${index}`
                              )}
                              id={`contribuitors.${index}`}
                            />
                            <FormErrorMessage>
                              {formik.errors.contribuitors
                                ? formik.errors.contribuitors[index]
                                : ""}
                            </FormErrorMessage>
                          </FormControl>
                          {index !== 0 && (
                            <MinusIcon
                              onClick={() => {
                                helpers.remove(index);
                              }}
                            />
                          )}
                        </HStack>
                      ))}
                    </Box>
                  )}
                />
              </VStack>
            </HStack>
            <Button
              bgColor={useColorModeValue("gray.300", "gray.500")}
              size="md"
              type="submit"
              marginTop="15px"
              disabled={formik.errors}
            >
              Participate
            </Button>
          </VStack>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default ParticipateForm;
