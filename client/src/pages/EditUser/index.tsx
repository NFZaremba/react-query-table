import { useEffect } from "react";
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

import { Modal, Form } from "../../shared/components";
import toast from "react-hot-toast";
import { IUser, QueryOptions } from "../../shared/types";
import { useAxios } from "../../shared/contexts/AxiosProvider";
import { useRouter } from "../../shared/hooks/useRouter";
import { noop } from "../../shared/utils/noop";

const useFetchById = ({
  id,
  onSuccess = noop,
  onError = noop,
}: QueryOptions) => {
  const axios = useAxios();

  return useQuery(
    ["user", { id }],
    async () => {
      const { data } = await axios.get<IUser>(`/users/${id}`);
      return data;
    },
    {
      onSuccess: () => onSuccess(),
      onError: () => onError(),
    }
  );
};

const useUpdateUser = ({ onSuccess = noop, id }: QueryOptions) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation(
    (updatedUser: IUser) => {
      return axios.put(`/users/${id}`, updatedUser);
    },
    {
      onSuccess: () => {
        // invalidate to show updates in ui
        queryClient.invalidateQueries(["users"]);
        toast.success("User Updated!");
        onSuccess();
      },
    }
  );
};

const EditUser = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { isOpen, onClose, onOpen } = useDisclosure({
    onClose: () => router.goBack(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm();

  // fetch user
  const user = useFetchById({
    id,
    onSuccess: () => onOpen(),
  });

  // update user
  const updateMutation = useUpdateUser({
    id,
    onSuccess: () => router.goBack(),
  });

  const onSubmit = (data: IUser) => {
    updateMutation.mutate(data);
  };

  useEffect(() => {
    if (user.data) {
      // update default form values after fetch
      reset(user.data);
    }
  }, [user.data, reset]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <Modal.Header close>Edit User</Modal.Header>
      <Modal.Body mb={4}>
        <Form>
          {user?.data?.id && (
            <Form.Control>
              <Form.Label htmlFor="id">User Id</Form.Label>
              <Input id="id" type="text" value={user?.data.id} disabled />
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
            isLoading={updateMutation.isLoading}
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
