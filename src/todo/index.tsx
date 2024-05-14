import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Checkbox,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import "./index.scss";
import { AddIcon, CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./api";
import EmptyImage from "../assets/bg_empty.png";

interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

const Todo = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<ITodo | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectTab, setSelectTab] = useState<number>(0);
  const isCreate = newTodo !== null;

  const getTodoList = async () => {
    setIsLoadingTodos(true);
    getTodos().then((data) => {
      setTodos(data);
      setIsLoadingTodos(false);
    });
  };

  const handleCreateTodo = useCallback(async () => {
    if (newTodo === null || newTodo?.trim() === "") {
      toast({
        title: "Vui lòng nhập tiêu đề",
        position: "top-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    await createTodo({ title: newTodo });
    await getTodoList();
    setNewTodo(null);
    toast({
      title: "Đã thêm.",
      position: "top-right",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [newTodo, toast]);

  const handleUpdateTodo = async (
    id: number,
    data: { title: string; completed: boolean }
  ) => {
    const response = await updateTodo(id, data);
    toast({
      title: "Đã cập nhật.",
      position: "top-right",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos[index] = response;
    setTodos(newTodos);
    return response;
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    await getTodoList();
    toast({
      title: "Đã xoá.",
      position: "top-right",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleCreateTodo();
      }
    },
    [handleCreateTodo]
  );

  useEffect(() => {
    getTodoList();
  }, []);

  useEffect(() => {
    if (isCreate) {
      document.addEventListener("keydown", handleEnter);
      titleRef.current?.focus();

      return () => {
        document.removeEventListener("keydown", handleEnter);
      };
    }
  }, [handleEnter, isCreate, newTodo]);

  const completedTodos = todos.filter((todo) => todo.completed);
  const doingTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="todoScreen">
      <Text fontSize={"3rem"} color={"var(--primary-color)"}>
        Todo App
      </Text>
      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        width={"100%"}
        onChange={(index) => {
          setSelectTab(index);
        }}
      >
        <TabList className="tab-list">
          <Tab className="tab-item">Đang thực hiện</Tab>
          <Tab className="tab-item" isDisabled={!!editRow || !!isCreate}>
            Đã hoàn thành
          </Tab>
        </TabList>

        <TabPanels padding="1rem" className="todoTabPanel">
          <TabPanel className="todosBlock">
            {isCreate && (
              <div className="todoItem">
                <Input
                  ref={titleRef}
                  placeholder="Dắt chó đi dạo..."
                  value={newTodo}
                  onChange={(e) => {
                    setNewTodo(e.target.value);
                  }}
                  border={"none"}
                  outline={"none"}
                  borderBottom={"1px solid #000"}
                  borderRadius={0}
                  _focusVisible={{
                    outline: "none",
                  }}
                />
                <CheckIcon
                  className="check-icon"
                  cursor={"pointer"}
                  fontSize={16}
                  color="green"
                  onClick={() => handleCreateTodo()}
                />
                <CloseIcon
                  className="cancel-icon"
                  cursor={"pointer"}
                  fontSize={16}
                  color="#FF0200"
                  onClick={() => setNewTodo(null)}
                />
              </div>
            )}
            {doingTodos.map((todo) => {
              const isEdit = todo.id === editRow?.id;

              return (
                <div
                  className={`todoItem ${isEdit && "edit"} ${
                    todo.completed ? "completed" : "doing"
                  }`}
                  key={todo.id}
                >
                  <div className="left">
                    {!isEdit && (
                      <Checkbox
                        className="complete-checkbox"
                        variant={"todo"}
                        defaultChecked={todo.completed}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          handleUpdateTodo(todo.id, {
                            title: todo.title,
                            completed: checked,
                          });
                        }}
                      />
                    )}
                    {isEdit ? (
                      <Input
                        ref={titleRef}
                        placeholder="Dắt chó đi dạo..."
                        value={editRow.title}
                        onChange={(e) => {
                          setEditRow({ ...editRow, title: e.target.value });
                        }}
                        border={"none"}
                        outline={"none"}
                        borderBottom={"1px solid #000"}
                        borderRadius={0}
                        _focusVisible={{
                          outline: "none",
                        }}
                      />
                    ) : (
                      <span>{todo.title}</span>
                    )}
                  </div>

                  <div className="right">
                    {!isEdit && (
                      <EditIcon
                        className="edit-icon"
                        cursor={"pointer"}
                        fontSize={16}
                        onClick={() => {
                          setEditRow(todo);
                        }}
                      />
                    )}
                    {isEdit && (
                      <CheckIcon
                        color={"green"}
                        className="check-icon"
                        cursor={"pointer"}
                        fontSize={16}
                        onClick={async () => {
                          await handleUpdateTodo(todo.id, { ...editRow });
                          setEditRow(null);
                        }}
                      />
                    )}
                    <CloseIcon
                      className="delete-icon"
                      cursor={"pointer"}
                      fontSize={16}
                      color="#FF0200"
                      onClick={() => {
                        if (isEdit) {
                          setEditRow(null);
                        } else {
                          setDeleteId(todo.id);
                          onOpen();
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
            {doingTodos.length === 0 &&
              !isCreate &&
              (isLoadingTodos ? (
                <Text
                  fontWeight={"bold"}
                  textAlign={"center"}
                  fontSize={16}
                  color={"#61686f"}
                >
                  Đang tải ...
                </Text>
              ) : (
                <div className="empty">
                  <img src={EmptyImage} alt="empty" />
                  <Text fontWeight={"bold"} fontSize={16} color={"#61686f"}>
                    Amazing gút chóp em!
                  </Text>
                </div>
              ))}
          </TabPanel>
          <TabPanel className="todosBlock">
            {completedTodos.map((todo) => {
              return (
                <div
                  className={`todoItem ${
                    todo.completed ? "completed" : "doing"
                  }`}
                  key={todo.id}
                >
                  <div className="left">
                    <Checkbox
                      colorScheme="green"
                      className="complete-checkbox"
                      defaultChecked={todo.completed}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        handleUpdateTodo(todo.id, {
                          title: todo.title,
                          completed: checked,
                        });
                      }}
                    />
                    <span>{todo.title}</span>
                  </div>
                  <div className="right">
                    <CloseIcon
                      className="delete-icon"
                      fontSize={16}
                      color="#FF0200"
                      onClick={() => {
                        setDeleteId(todo.id);
                        onOpen();
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>

      {selectTab === 0 && (
        <button
          className="addButton"
          disabled={isCreate}
          onClick={() => {
            setNewTodo("");
          }}
        >
          <AddIcon />
        </button>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color={"#333"}>
              Xoá todo list
            </AlertDialogHeader>

            <AlertDialogBody color={"#333"}>
              Bạn chắc chắn muốn xoá chứ ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Huỷ bỏ
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  if (deleteId) {
                    handleDeleteTodo(deleteId);
                    onClose();
                  }
                }}
                ml={3}
              >
                Chắc chắn
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default Todo;
