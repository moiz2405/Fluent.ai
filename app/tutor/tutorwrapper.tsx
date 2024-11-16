// ../tutor/tutorwrappert.tsx
"use client";
import ChatBox from '@/components/tutor/chatbox';
import SuggestionsPanel from '@/components/tutor/Suggestions';

export default function TutorPage() {
  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900">
    <div className="w-1/2 border ">
      <SuggestionsPanel />
    </div>
    <div className="w-1/2 border ">
      <ChatBox />
    </div>
  </div>


  );
}
