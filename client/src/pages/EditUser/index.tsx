import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Modal, Form } from "../../shared/components";
import toast from "react-hot-toast";
import { IUser, QueryOptions } from "../../shared/types";
import { useAxios } from "../../shared/contexts/AxiosProvider";
import { useRouter } from "../../shared/hooks/useRouter";
import { noop } from "../../shared/utils/noop";
import { schema } from "../../shared/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDisclosure } from "../../shared/hooks/useDisclosure";

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

type EditFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
};

const EditUser = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { isOpen, onClose, onOpen } = useDisclosure({
    onClose: () => router.goBack(),
  });

  const methods = useForm<EditFormValues>({ resolver: yupResolver(schema) });

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
    // update default form values after fetch
    if (user.data) {
      methods.reset(user.data);
    }
  }, [user.data, methods]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>Edit User</Modal.Header>
      <Modal.Body>
        <Form methods={methods}>
          <Form.Input id="id" label="id" readOnly />
          <Form.Input id="first_name" label="First Name" required />
          <Form.Input id="last_name" label="Last Name" required />
          <Form.Input id="email" label="Email" type="email" required />
          <Form.RadioGroup
            name="gender"
            options={[
              {
                value: "Male",
                label: "Male",
              },
              {
                value: "Female",
                label: "Female",
              },
              {
                value: "Other",
                label: "Other",
              },
            ]}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer
        action={{
          type: "submit",
          text: "Edit User",
          onClick: methods.handleSubmit(onSubmit),
          isLoading: updateMutation.isLoading,
        }}
      />
    </Modal>
  );
};

export default EditUser;
