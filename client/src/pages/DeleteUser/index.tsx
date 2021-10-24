import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { Modal } from "../../shared/components";
import { useAxios } from "../../shared/contexts/AxiosProvider";
import { useRouter } from "../../shared/hooks/useRouter";
import { useDisclosure } from "../../shared/hooks/useDisclosure";

type DeleteUserType = {
  onSuccess: () => void;
};

const useDeleteUser = ({ onSuccess }: DeleteUserType) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      return await axios.delete(`/users/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        toast.success("Delete Successful!");
        onSuccess();
      },
    }
  );
};

const DeleteUser = () => {
  const router = useRouter();
  console.log(router.query.id);
  const id = router.query.id as string;

  const { isOpen, onClose } = useDisclosure({
    isOpen: true,
    onClose: () => router.goBack(),
  });

  const deleteMutation = useDeleteUser({
    onSuccess: () => router.goBack(),
  });

  const onDelete = async () => {
    deleteMutation.mutateAsync(id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        Delete User: <span className="text-red-500 font-semibold">{id}</span>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to continue with your action?
      </Modal.Body>
      <Modal.Footer
        action={{
          type: "delete",
          text: "Yes, delete.",
          onClick: onDelete,
          isLoading: deleteMutation.isLoading,
        }}
      />
    </Modal>
  );
};

export default DeleteUser;
