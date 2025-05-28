import React from 'react';

const InfoPanel = () => {
  return (
    <section className="px-6 py-12 max-w-6xl mx-auto text-white">
      {/* Title outside the panel */}
      <h3 className="text-2xl font-semibold text-center mb-6">Info</h3>

      {/* Info box */}
      <div className="bg-neutral-900 px-6 py-8 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Run time</p>
              <p className="text-base">1h 52min</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Original Audio</p>
              <p className="text-base">English (AAC)</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Audio</p>
              <p className="text-base">English</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Accessibility</p>
              <div className="space-y-2 mt-1">
                <p className="text-sm flex items-start gap-2">
                  <span className="bg-gray-700 px-1.5 rounded text-xs font-bold">CC</span>
                  Closed captions refer to subtitles in the available language with the addition of relevant non-dialogue information.
                </p>
                <p className="text-sm flex items-start gap-2">
                  <span className="bg-gray-700 px-1.5 rounded text-xs font-bold">AD</span>
                  Audio description (AD) refers to a narration track describing what is happening onscreen to provide context for those who are blind or have low vision.
                </p>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Release Year</p>
              <p className="text-base">2024</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Studio</p>
              <p className="text-base">Studio Pow</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Subtitles</p>
              <p className="text-base">
                Bengali, Simplified Chinese, Hindi, Japanese, Korean, Portuguese - Brazilian, Spanish - Chilean, Spanish - Colombian, Spanish - Paraguayan, Spanish - Peruvian, Spanish - Rioplatense, Spanish - Venezuelan
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Filming Locations</p>
              <p className="text-base">London, Studio Two Abbey Road Studios, Liverpool, Los Angeles</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Production</p>
              <p className="text-base">Studio Pow<br />Trevor Beattie Films</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Copyright</p>
              <p className="text-base">Studio Pow (Epstein) Ltd.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoPanel;
