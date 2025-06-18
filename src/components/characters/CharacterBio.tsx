import { BiblicalCharacter } from '@/types/characters';

interface CharacterBioProps {
  character: BiblicalCharacter;
}

export default function CharacterBio({ character }: CharacterBioProps) {
  return (
    <div className="character-bio bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{character.name}</h1>
        {character.nameMeaning && (
          <p className="text-orange-100 text-lg">
            <span className="font-semibold">Meaning:</span> {character.nameMeaning}
          </p>
        )}
      </div>

      <div className="p-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-orange-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-800 border-b-2 border-orange-200 pb-2">Basic Information</h2>
            <div className="space-y-3">
              {character.gender && (
                <p className="flex justify-between">
                  <span className="font-semibold text-orange-700">Gender:</span> 
                  <span className="text-orange-800">{character.gender}</span>
                </p>
              )}
              {character.tribe && (
                <p className="flex justify-between">
                  <span className="font-semibold text-orange-700">Tribe:</span> 
                  <span className="text-orange-800">{character.tribe}</span>
                </p>
              )}
              {character.father && (
                <p className="flex justify-between">
                  <span className="font-semibold text-orange-700">Father:</span> 
                  <span className="text-orange-800">{character.father}</span>
                </p>
              )}
              {character.mother && (
                <p className="flex justify-between">
                  <span className="font-semibold text-orange-700">Mother:</span> 
                  <span className="text-orange-800">{character.mother}</span>
                </p>
              )}
              {character.spouse && (
                <p className="flex justify-between">
                  <span className="font-semibold text-orange-700">Spouse:</span> 
                  <span className="text-orange-800">{Array.isArray(character.spouse) ? character.spouse.join(', ') : character.spouse}</span>
                </p>
              )}
              {character.children && character.children.length > 0 && (
                <p className="flex justify-between">
                  <span className="font-semibold text-orange-700">Children:</span> 
                  <span className="text-orange-800">{character.children.join(', ')}</span>
                </p>
              )}
            </div>
          </div>

          {/* Key Verses */}
          <div className="bg-orange-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-800 border-b-2 border-orange-200 pb-2">Key Verses</h2>
            <div className="space-y-4">
              {character.keyVerses.slice(0, 3).map((verse, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-400">
                  <p className="font-bold text-orange-700">{verse.reference}</p>
                  <p className="text-orange-800 mt-2 italic">"{verse.text}"</p>
                  <p className="text-sm text-orange-600 mt-2">{verse.significance}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        {character.timeline && character.timeline.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-orange-800 border-b-2 border-orange-200 pb-2">Timeline</h2>
            <div className="relative">
              <div className="absolute left-6 h-full w-1 bg-orange-200"></div>
              <div className="space-y-6">
                {character.timeline.map((event, index) => (
                  <div key={index} className="relative pl-12">
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <div className="bg-orange-50 p-6 rounded-lg shadow-sm border-l-4 border-orange-400">
                      <h3 className="font-bold text-xl text-orange-800 mb-2">{event.title}</h3>
                      {(event.year || event.relativeTime) && (
                        <p className="text-sm text-orange-600 mb-3 font-medium">
                          {event.year ? `~${event.year} ${event.year < 0 ? 'BC' : 'AD'}` : event.relativeTime}
                        </p>
                      )}
                      <p className="text-orange-800 leading-relaxed">{event.description}</p>
                      {event.reference && (
                        <p className="text-sm text-orange-600 mt-3 font-medium">{event.reference}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {character.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-orange-800 border-b-2 border-orange-200 pb-2">Summary</h2>
            <div className="bg-orange-50 p-6 rounded-lg">
              <p className="text-orange-800 leading-relaxed text-lg">{character.summary}</p>
            </div>
          </div>
        )}

        {/* Lessons */}
        {character.lessons && character.lessons.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-orange-800 border-b-2 border-orange-200 pb-2">Lessons</h2>
            <div className="bg-orange-50 p-6 rounded-lg">
              <ul className="list-disc pl-6 space-y-3">
                {character.lessons.map((lesson, index) => (
                  <li key={index} className="text-orange-800 leading-relaxed">{lesson}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Historical Context */}
        {character.historicalContext && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-800 border-b-2 border-orange-200 pb-2">Historical Context</h2>
            <div className="bg-orange-50 p-6 rounded-lg">
              <p className="text-orange-800 leading-relaxed text-lg">{character.historicalContext}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
