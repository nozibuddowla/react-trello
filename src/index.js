import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);

reportWebVitals();
