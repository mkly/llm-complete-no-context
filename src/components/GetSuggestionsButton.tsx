interface GetSuggestionsButtonProps {
  onClick: () => void;
}

export default function getSuggestionsButton(
  { onClick }: GetSuggestionsButtonProps,
) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="button"
      onClick={onClick}
    >
      Get Suggestions
    </button>
  );
}
