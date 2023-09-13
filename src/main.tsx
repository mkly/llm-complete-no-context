import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import App from "./App";

const textAreas = [...document.querySelectorAll("textarea")];
chrome.storage.sync.get(
  ["openAIKey"],
  ({ openAIKey }: { openAIKey: string }) => {
    textAreas.forEach((textarea) => {
      const uuid = uuidv4();
      const container = document.createElement("div");
      textarea.parentNode?.insertBefore(container, textarea);
      ReactDOM.createRoot(container).render(
        <StrictMode>
          <App
            uuid={uuid}
            openAIKey={openAIKey}
            textareaEl={textarea}
            pageContent={document.body.innerHTML}
          />
        </StrictMode>,
      );
    });
  },
);
