import { Card } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";

export default function SuggestionsPanel() {
    return (
      <Card className="w-full h-screen flex flex-col shadow-xl rounded-2xl border-0 bg-gray-50 dark:bg-gray-900 pt-16">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-blue-600 text-white">
          <h2 className="text-lg font-semibold">Suggestions & Corrections</h2>
        </div>

        {/* Content Area */}
        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          <div className="space-y-4">
            <SuggestionPlaceholder />
            <SuggestionPlaceholder />
            <SuggestionPlaceholder />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 border-t text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Suggestions help you improve your English. Corrections are suggestions to improve your writing.
          </p>
        </div>
      </Card>
    );
  }


/** Placeholder for a suggestion item while data loads */
function SuggestionPlaceholder() {
  return (
    <div className="p-4 border rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-1/2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
    </div>
  );
}
