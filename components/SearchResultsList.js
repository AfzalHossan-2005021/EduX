import React from "react";

const SearchResultsList = ({ results, setResults }) => {
  return (
    <div className="relative left-[308px] w-[480px] bg-white flex-col shadow-md max-h-80 overflow-auto">
      {results.map((result, id) => {
        return (
          <button key={id} className="w-full" onClick={() => setResults([])}>
            <a key={id} href={`/courses/${result.c_id}`}>
              <div
                key={id}
                className="py-5 px-2 hover:bg-zinc-300 text-sky-600"
              >
                {result.title}
              </div>
            </a>
          </button>
        );
      })}
    </div>
  );
};

export default SearchResultsList;
