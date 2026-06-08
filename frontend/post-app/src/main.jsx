import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

let root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <>
    <App />
    <Toaster position="top-right" />
  </>,
);
