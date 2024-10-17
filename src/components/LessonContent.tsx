import React from 'react';

interface Lesson {
  id: number;
  title: string;
  content: string;
}

interface LessonContentProps {
  lesson: Lesson;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
    </div>
  );
};

export default LessonContent;