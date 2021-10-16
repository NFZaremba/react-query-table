import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import { ButtonGroup, Button, useDisclosure } from '@chakra-ui/react'
import { Modal } from '../../components'
import { deleteUser } from '../../services/users'

const DeleteUser = () => {
  const history = useHistory()
  const { id } = useParams()
  const prevPath = history.location.state.background.pathname // prev path from where the modal was opened

  const queryClient = useQueryClient()
  const { isOpen, onClose } = useDisclosure({
    isOpen: true,
    onClose: () => history.replace(prevPath),
  })

  const deleteMutation = useMutation((id) => deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries()
      toast.success('Delete Successful!')
      history.replace(prevPath)
    },
  })

  const onDelete = async () => {
    deleteMutation.mutateAsync(id)
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <Modal.Header close>Delete User: {id}</Modal.Header>
      <Modal.Body>Are you sure you want to continue with your action?</Modal.Body>
      <Modal.Footer>
        <ButtonGroup size="sm">
          <Button colorScheme="red" onClick={onDelete} isLoading={deleteMutation.isLoading}>
            Delete
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteUser