import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDisclosure } from "@chakra-ui/react";
import { Modal, Form } from "../../shared/components";
import { IUser } from "../../shared/types";
import { useAxios } from "../../shared/contexts/AxiosProvider";
import { useRouter } from "../../shared/hooks/useRouter";
import { schema } from "../../shared/validation";

type CreateUserType = {
  onSuccess: () => void;
};

const useCreateUser = ({ onSuccess }: CreateUserType) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation(
    async (newUser: IUser) => {
      const { data } = await axios.post<IUser>("/users", newUser);
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["users"]);
        toast.success(
          `New User Created - Id: ${data.id} Name: ${data.first_name} ${data.last_name}`
        );
        onSuccess();
      },
      onError: (error) => {
        if (error instanceof Error)
          toast.error(`Something went wrong: ${error.message}`);
      },
    }
  );
};

type CreateFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
};

const CreateUser = () => {
  const router = useRouter();
  const methods = useForm<CreateFormValues>({ resolver: yupResolver(schema) });
  const { isOpen, onClose } = useDisclosure({
    isOpen: true,
    onClose: () => router.goBack(),
  });

  const createUserMutaation = useCreateUser({
    onSuccess: () => router.goBack(),
  });

  const onSubmit = (data: IUser) => createUserMutaation.mutate(data);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>New User</Modal.Header>
      <Modal.Body>
        <Form methods={methods}>
          <Form.Input id="first_name" label="First Name" required />
          <Form.Input id="last_name" label="Last Name" required />
          <Form.Input id="email" label="Email" type="email" required />
          <Form.RadioGroup
            name="gender"
            options={[
              {
                value: "male",
                label: "Male",
              },
              {
                value: "female",
                label: "Female",
              },
              {
                value: "other",
                label: "Other",
              },
            ]}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer
        action={{
          type: "submit",
          text: "Create User",
          onClick: methods.handleSubmit(onSubmit),
          isLoading: createUserMutaation.isLoading,
        }}
      />
    </Modal>
  );
};

export default CreateUser;
