import React from 'react';

const MetadataPanel = () => {
  return (
    <section className="bg-white text-black dark:bg-black dark:text-white px-8 py-12 max-w-5xl mx-auto">
      <div className="text-sm text-black dark:text-gray-400 uppercase tracking-wider mb-2">Now Streaming</div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Downers</h2>
      <p className="text-base text-black dark:text-gray-300 mb-6">
        Forced to sleep in the woods until they can raise money for a place, and in debt to a hustler as violent as he is fabulous,
        Damon and Devaugh are going through a rough patch. Then Damon steals a mask from a human sacrifice and raises the ire of a murderously inept cult.
      </p>
    </section>
  );
};

export default MetadataPanel;
