import { useState, useRef, Fragment } from "react";
import { ProgressBar } from "react-loader-spinner";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Link,
  Stack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import Auth from "../../util/auth";
function addItemForm() {
  const [loading, setLoading] = useState(false);
  const imageInput = useRef(null);
  // use a single form state object instead of many individual state variable
  const [formState, setFormState] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // make sure name and image were provided for product
    if (imageInput.current.files.length < 1) {
      alert("must include an image");
      return;
    }

    const { name, price, category, description } = formState;

    if (name.length < 1) {
      alert("must fill in the item name field");
      return;
    }

    setLoading(true);

    const formData = new FormData(); // used to send image with rest of form data

    const url = "/api/add-item";
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", imageInput.current.files[0]);

    console.log(formData);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    console.log(response);
    const result = await response.json();
    console.log(result);

    // redirect to shop page
    location.replace("/");
  };

  return (
    <Fragment>
      {loading ? (
        <Fragment>
          <h3>Uploading your item - please do not refresh or close the page</h3>
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        </Fragment>
      ) : (
        <Fragment>
          {/* replacement form below */}
          <form onSubmit={handleSubmit}>
            <Container
              maxW="lg"
              py={{ base: "12", md: "16" }}
              px={{ base: "0", sm: "8" }}>
              <Stack spacing="8">
                <Stack spacing="6">
                  <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                    <Heading size={{ base: "xs", md: "sm" }}>
                      Fill out item details below{" "}
                    </Heading>
                  </Stack>
                </Stack>
                <Box
                  py={{ base: "0", sm: "8" }}
                  px={{ base: "4", sm: "10" }}
                  bg={{ base: "transparent", sm: "bg.surface" }}
                  boxShadow={{ base: "none", sm: "md" }}
                  borderRadius={{ base: "none", sm: "xl" }}>
                  <Stack spacing="6">
                    <Stack spacing="2">
                      <FormLabel>Item Name</FormLabel>
                      <Input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                      />
                      <FormLabel>Price USD $</FormLabel>
                      <Input
                        type="number"
                        name="price"
                        value={formState.price}
                        onChange={handleChange}
                      />

                      <FormLabel>Category</FormLabel>
                      <Select
                        placeholder="Select Category"
                        onChange={handleChange}>
                        <option name="category" value="decks">
                          decks
                        </option>
                        <option name="category" value="shoes">
                          shoes
                        </option>
                        <option name="category" value="trucks">
                          trucks
                        </option>
                        <option name="category" value="wheels">
                          wheels
                        </option>
                        <option name="category" value="pants">
                          pants
                        </option>
                        <option name="category" value="other">
                          other
                        </option>
                      </Select>
                      <FormLabel>Tell us about item you're selling</FormLabel>
                      <Input
                        type="text"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                      />
                      <FormLabel>Upload an Image</FormLabel>
                      {/* from react docs for file inputs: In React, an <input type="file" /> is always an uncontrolled component because its value can only be set by a user, and not programmatically. */}
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        defaultValue=""
                        ref={imageInput}
                      />
                    </Stack>
                    <HStack justify="space-between">
                      {/* <Checkbox defaultChecked>Remember me</Checkbox>
                    {!loginSuccess && (
                      <p style={{ color: "red" }}>Incorrect credentials</p>
                    )} */}
                      {/* <Button variant="text" size="sm">
                      Forgot password?
                    </Button> */}
                    </HStack>
                    <Stack spacing="6">
                      <Button type="submit">Post Item</Button>
                      <HStack>
                        <Divider />
                        {/* <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    or continue with
                  </Text>
                  <Divider /> */}
                      </HStack>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Container>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
}

export default addItemForm;
