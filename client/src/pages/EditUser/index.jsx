import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";

import {
  useDisclosure,
  Button,
  ButtonGroup,
  Input,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

import { Modal, Form } from "../../components";
import { fetchUserById, updateUser } from "../../services/users";
import toast from "react-hot-toast";

const EditUser = () => {
  const history = useHistory();
  const { id } = useParams();
  const prevPath = history.location.state.background.pathname; // prev path from where the modal was opened

  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure({
    onClose: () => history.replace(prevPath),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm();

  // fetch user
  const { data } = useQuery(["user", { id }], () => fetchUserById(id), {
    onSuccess: () => onOpen(),
  });

  // update user
  const { mutate, isLoading } = useMutation(
    (updatedUser) => updateUser({ updatedUser, id }),
    {
      onSuccess: () => {
        // invalidate to show updates in ui
        queryClient.invalidateQueries(["users"]);
        toast.success("User Updated!");
        history.replace(prevPath);
      },
    }
  );

  const onSubmit = async (data) => {
    mutate({ ...data, test: null });
  };

  useEffect(() => {
    if (data) {
      // update default form values
      // after fetch
      reset(data);
    }
  }, [data, reset]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <Modal.Header close>Edit User</Modal.Header>
      <Modal.Body mb={4}>
        <Form>
          {data?.id && (
            <Form.Control>
              <Form.Label htmlFor="id">User Id</Form.Label>
              <Input id="id" type="text" value={data.id} disabled />
            </Form.Control>
          )}

          <Form.Control isInvalid={errors?.first_name} mt={6} isRequired>
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

export default EditUser;
