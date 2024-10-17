import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import initSqlJs, { Database } from 'sql.js';

interface SQLEditorProps {
  initialQuery: string;
  expectedResult: any[];
  onComplete: () => void;
}

const SQLEditor: React.FC<SQLEditorProps> = ({
  initialQuery,
  expectedResult,
  onComplete,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [db, setDb] = useState<Database | null>(null);

  const initializeDatabase = async () => {
    const SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });
    const database = new SQL.Database();
    database.run(`
      CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, status TEXT);
      INSERT INTO users (id, name, email, status) VALUES (1, 'John Doe', 'john@example.com', 'active');
      INSERT INTO users (id, name, email, status) VALUES (2, 'Jane Smith', 'jane@example.com', 'active');
      
      CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, product TEXT, price REAL);
      INSERT INTO orders (id, user_id, product, price) VALUES (1, 1, 'Book', 15.99);
      INSERT INTO orders (id, user_id, product, price) VALUES (2, 2, 'Pen', 1.99);
    `);
    setDb(database);
  };

  useEffect(() => {
    initializeDatabase();
  }, []);

  useEffect(() => {
    setQuery(initialQuery);
    setResult(null);
    setError(null);
  }, [initialQuery]);

  const runQuery = () => {
    if (!db) {
      setError('Database not initialized');
      return;
    }

    try {
      const results = [];
      const queries = query.split(';').filter(q => q.trim() !== '');
      
      for (const singleQuery of queries) {
        const stmt = db.prepare(singleQuery);
        while (stmt.step()) {
          results.push(stmt.getAsObject());
        }
      }
      
      setResult(results);
      setError(null);

      if (JSON.stringify(results) === JSON.stringify(expectedResult)) {
        onComplete();
      }
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    }
  };

  const resetDatabase = () => {
    initializeDatabase();
    setQuery(initialQuery);
    setResult(null);
    setError(null);
  };

  return (
    <div className="mt-6">
      <textarea
        className="w-full h-48 p-2 border border-[#00429f] rounded font-mono text-sm text-black bg-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex justify-between mt-2">
        <button
          className="bg-[#b8e7ff] text-[#00429f] px-4 py-2 rounded flex items-center hover:bg-[#8cd5ff] transition-colors"
          onClick={runQuery}
        >
          <Play className="mr-2" />
          Run Query
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center hover:bg-gray-400 transition-colors"
          onClick={resetDatabase}
        >
          <RotateCcw className="mr-2" />
          Reset
        </button>
      </div>
      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          <XCircle className="inline mr-2" />
          {error}
        </div>
      )}
      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-[#b8e7ff]">Result:</h3>
          <pre className="bg-[#003580] text-[#b8e7ff] p-2 rounded overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
          {JSON.stringify(result) === JSON.stringify(expectedResult) && (
            <div className="mt-2 text-[#b8e7ff] flex items-center">
              <CheckCircle className="mr-2" />
              Correct! You can move to the next lesson.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SQLEditor;