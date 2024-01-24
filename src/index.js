import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DragDropContext } from "react-beautiful-dnd";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <DragDropContext>
    <StrictMode>
      <App />
    </StrictMode>
  </DragDropContext>
);

reportWebVitals();
