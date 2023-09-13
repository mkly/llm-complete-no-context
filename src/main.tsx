import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import App from "./App";
import { UuidProvider } from "./context/Uuid";
import { VisibilityProvider } from "./context/Visibility";
import { TextareaProvider } from "./context/Textarea";
import { OpenAIKeyProvider } from "./context/OpenAIKey";
import { SuggestionsProvider } from "./context/Suggestions";
import { ShowSuggestionsProvider } from "./context/ShowSuggestions";

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
          <UuidProvider uuid={uuid}>
            <OpenAIKeyProvider openAIKey={openAIKey}>
              <TextareaProvider textareaEl={textarea}>
                <VisibilityProvider initialVisible={false}>
                  <ShowSuggestionsProvider>
                    <SuggestionsProvider>
                      <App />
                    </SuggestionsProvider>
                  </ShowSuggestionsProvider>
                </VisibilityProvider>
              </TextareaProvider>
            </OpenAIKeyProvider>
          </UuidProvider>
        </StrictMode>,
      );
    });
  },
);
