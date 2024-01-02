import React, { useState, useRef, Fragment } from "react";
import { ProgressBar } from "react-loader-spinner";
import {
  Box,
  Button,
  Container,
  Center,
  Divider,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

import { shopApi } from "../../api/shopApi";
function addItemForm() {
  const [loading, setLoading] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  // use a single form state object instead of many individual state variable
  const [formState, setFormState] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
  });

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    console.log(formState, event.currentTarget.name, event.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // make sure name and image were provided for product
    if (!imageInput.current || !imageInput.current.files) return;
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

    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", imageInput.current.files[0]);

    const result = await shopApi.addItem(formData);

    setLoading(false);
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
                    <Center height="50px">
                      <Text fontSize="4xl">
                        Fill out your item's info below
                      </Text>
                    </Center>
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
                        name="category"
                        placeholder="Select Category"
                        onChange={
                          handleChange as unknown as React.ChangeEventHandler<HTMLSelectElement>
                        }>
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
                      <Button type="submit" colorScheme="green">
                        Post Item
                      </Button>
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
