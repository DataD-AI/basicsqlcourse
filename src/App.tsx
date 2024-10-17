import React, { useState } from 'react';
import LessonList from './components/LessonList';
import LessonContent from './components/LessonContent';
import SQLEditor from './components/SQLEditor';
import { lessons } from './data/lessons';

function App() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const handleLessonComplete = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons((prev) => [...prev, currentLesson]);
    }
  };

  const handleSelectLesson = (lessonId: number) => {
    setCurrentLesson(lessonId);
  };

  return (
    <div className="min-h-screen bg-[#00429f] flex flex-col">
      <header className="bg-[#b8e7ff] text-[#00429f] p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">DataD Basic SQL</h1>
          <p className="text-sm">The Story Behind the Numbers</p>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <LessonList
              lessons={lessons}
              currentLesson={currentLesson}
              completedLessons={completedLessons}
              onSelectLesson={handleSelectLesson}
            />
          </div>
          <div className="md:col-span-3">
            <LessonContent lesson={lessons[currentLesson]} />
            <SQLEditor
              initialQuery={lessons[currentLesson].initialQuery}
              expectedResult={lessons[currentLesson].expectedResult}
              onComplete={handleLessonComplete}
            />
          </div>
        </div>
      </main>
      <footer className="bg-[#b8e7ff] p-4 text-center text-[#00429f]">
        <p>&copy; 2024 DataD Basic SQL. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;