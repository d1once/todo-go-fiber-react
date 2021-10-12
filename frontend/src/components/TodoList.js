import React, { useState, useEffect } from "react";
import {
  HStack,
  VStack,
  Flex,
  Box,
  IconButton,
  ButtonGroup,
  StackDivider,
  Spacer,
  Badge,
  Editable,
  EditablePreview,
  EditableInput,
  useEditableControls,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

function TodoList({ todos, deleteTodo }) {
  const [content, setContent] = useState(todos);
  console.log("cvonsole", content);

  useEffect(() => {
    setContent(todos);
  }, [todos]);
  if (!todos.length) {
    return (
      <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
        No Todos, yay!!!
      </Badge>
    );
  }

  const handleChange = (e, i) => {
    const copy = [...content];
    copy[i].title = e;
    setContent(copy);
  };

  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth="2px"
      p="4"
      borderRadius="lg"
      w="100%"
      maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
      alignItems="stretch"
    >
      {content.map((todo, i) => (
        <HStack key={todo.id} overflow="hidden">
          <Editable
            textAlign="start"
            value={todo.title}
            fontSize="2xl"
            isPreviewFocusable={false}
          >
            <HStack width="740px" justifyContent="space-between">
              <Box>
                <EditablePreview />
                <EditableInput
                  paddingLeft="10px"
                  onChange={(e) => handleChange(e.target.value, i)}
                  overflow="hidden"
                />
              </Box>

              <EditableControls todo={todo} deleteTodo={deleteTodo} />
            </HStack>
          </Editable>
          <Spacer />
        </HStack>
      ))}
    </VStack>
  );
}

function EditableControls({ todo, deleteTodo }) {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center" alignItems="center">
      <IconButton icon={<FaEdit />} isRound="true" {...getEditButtonProps()} />
      <IconButton
        icon={<FaTrash />}
        marginLeft={1}
        isRound="true"
        onClick={() => deleteTodo(todo.id)}
      />
    </Flex>
  );
}

export default TodoList;
