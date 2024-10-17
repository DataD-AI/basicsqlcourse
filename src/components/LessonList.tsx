import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
}

interface LessonListProps {
  lessons: Lesson[];
  currentLesson: number;
  completedLessons: number[];
  onSelectLesson: (lessonId: number) => void;
}

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  currentLesson,
  completedLessons,
  onSelectLesson,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-[#00429f]">Lessons</h2>
      <ul>
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            className={`flex items-center p-2 cursor-pointer ${
              lesson.id === currentLesson ? 'bg-[#b8e7ff]' : ''
            }`}
            onClick={() => onSelectLesson(lesson.id)}
          >
            {completedLessons.includes(lesson.id) ? (
              <CheckCircle className="text-[#00429f] mr-2" />
            ) : (
              <Circle className="text-gray-300 mr-2" />
            )}
            <span className={`text-black ${lesson.id === currentLesson ? 'font-semibold' : ''}`}>
              {lesson.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;