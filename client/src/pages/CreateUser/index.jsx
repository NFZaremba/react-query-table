import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";

import {
  useDisclosure,
  Button,
  ButtonGroup,
  Input,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import { Modal, Form } from "../../components";
import { postUser } from "../../services/users";

const CreateUser = () => {
  const history = useHistory();
  const prevPath = history.location.state.background.pathname; // prev path from where the modal was opened

  const queryClient = useQueryClient();
  const { isOpen, onClose } = useDisclosure({
    isOpen: true,
    onClose: () => history.replace(prevPath),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const { mutate, isLoading } = useMutation((newUser) => postUser(newUser), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users"]);
      toast.success(
        `New User Created - Id: ${data.id} Name: ${data.first_name} ${data.last_name}`
      );
      history.replace(prevPath);
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <Modal.Header close>New User</Modal.Header>
      <Modal.Body mb={4}>
        <Form>
          <Form.Control isInvalid={errors?.first_name} isRequired>
            <Form.Label htmlFor="first_name">First name</Form.Label>
            <Input
              id="first_name"
              type="text"
              placeholder="Enter first name"
              {...register("first_name", {
                required: "First name is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <Form.ErrorMessage>{errors?.first_name?.message}</Form.ErrorMessage>
          </Form.Control>

          <Form.Control isInvalid={errors?.last_name} mt={6} isRequired>
            <Form.Label htmlFor="last_name">Last name</Form.Label>
            <Input
              id="last_name"
              type="text"
              placeholder="Enter last name"
              {...register("last_name", {
                required: "Last name is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <Form.ErrorMessage>{errors?.last_name?.message}</Form.ErrorMessage>
          </Form.Control>

          <Form.Control isInvalid={errors?.email} mt={6} isRequired>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: /^\S+@\S+$/i,
              })}
            />
            <Form.ErrorMessage>
              {errors?.email?.type === "pattern"
                ? "Provide a valid email address"
                : errors?.email?.message}
            </Form.ErrorMessage>
          </Form.Control>

          <Form.Control isInvalid={errors?.gender} mt={6}>
            <Form.Label htmlFor="gender">Gender</Form.Label>
            <Controller
              rules={{ required: true }}
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup onChange={onChange} value={value}>
                  <HStack spacing="24px">
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                    <Radio value="other">Other</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
            <Form.ErrorMessage>{errors?.gender?.message}</Form.ErrorMessage>
          </Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup spacing={6}>
          <Button
            boxShadow="xl"
            mt={6}
            colorScheme="teal"
            isLoading={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
          <Button boxShadow="xl" mt={6} onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUser;
