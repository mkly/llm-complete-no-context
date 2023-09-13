import { useEffect } from "react";
import { useOpenAIKey } from "@/context/OpenAIKey";
import { usePageContent } from "@/context/PageContent";
import { useSuggestions } from "@/context/Suggestions";
import { useShowSuggestions } from "@/context/ShowSuggestions";
import { useTextarea } from "@/context/Textarea";
import postOpenAIInferencePrompt from "@/services/postOpenAIInferencePrompt";

export default function getSuggestionsButton() {
  const [openAIKey] = useOpenAIKey();
  const pageContent = usePageContent();
  const textareaEl = useTextarea();
  const [, setSuggestions] = useSuggestions();
  const [, setShowSuggestions] = useShowSuggestions();

  const handleGetSuggestions = async () => {
    if (textareaEl === null) {
      return;
    }

    const content = textareaEl.value;

    if (openAIKey === undefined) {
      return;
    }

    const chatcompletions = await postOpenAIInferencePrompt({
      pageContent: pageContent || "",
      content,
      openAIKey,
    });

    setSuggestions(chatcompletions);
    setShowSuggestions(true);
  };

  useEffect(() => {
  }, [textareaEl?.value]);

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="button"
      onClick={() => handleGetSuggestions()}
    >
      Get Suggestions
    </button>
  );
}
