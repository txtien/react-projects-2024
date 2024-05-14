import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todo from "./todo/index.tsx";
import { extendTheme } from "@chakra-ui/react";
import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
import MovieReview from "./movie-review/index.tsx";
import Layout from "./layout.tsx";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const todo = definePartsStyle({
  control: defineStyle({
    bg: "var(--secondary-color)",
  }),
});

export const checkboxTheme = defineMultiStyleConfig({
  variants: { todo },
});

const theme = extendTheme({
  components: {
    Checkbox: checkboxTheme,
  },
  styles: {
    global: {
      body: {
        bg: "#002333",
        color: "white",
      },
    },
  },
});

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    element: <Layout />,
    children: [
      { path: "/todo", element: <Todo /> },
      { path: "/movie-review", element: <MovieReview /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
