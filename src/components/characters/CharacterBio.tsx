import { BiblicalCharacter, CharacterEvent, CharacterTimelineEvent } from '@/types/characters';

interface CharacterBioProps {
  character: BiblicalCharacter;
}

export default function CharacterBio({ character }: CharacterBioProps) {
  return (
    <div className="character-bio bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-700 text-white p-6">
        <h1 className="text-3xl font-bold">{character.name}</h1>
        {character.nameMeaning && (
          <p className="text-blue-100 mt-1">
            <span className="font-semibold">Meaning:</span> {character.nameMeaning}
          </p>
        )}
      </div>

      <div className="p-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Basic Information</h2>
            <div className="space-y-2">
              {character.gender && (
                <p><span className="font-medium">Gender:</span> {character.gender}</p>
              )}
              {character.tribe && (
                <p><span className="font-medium">Tribe:</span> {character.tribe}</p>
              )}
              {character.father && (
                <p><span className="font-medium">Father:</span> {character.father}</p>
              )}
              {character.mother && (
                <p><span className="font-medium">Mother:</span> {character.mother}</p>
              )}
              {character.spouse && (
                <p><span className="font-medium">Spouse:</span> {Array.isArray(character.spouse) ? character.spouse.join(', ') : character.spouse}</p>
              )}
              {character.children && character.children.length > 0 && (
                <p>
                  <span className="font-medium">Children:</span> {character.children.join(', ')}
                </p>
              )}
            </div>
          </div>

          {/* Key Verses */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Key Verses</h2>
            <div className="space-y-4">
              {character.keyVerses.slice(0, 3).map((verse, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">{verse.reference}</p>
                  <p className="text-gray-700 mt-1">"{verse.text}"</p>
                  <p className="text-sm text-gray-500 mt-1">{verse.significance}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        {character.timeline && character.timeline.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Timeline</h2>
            <div className="relative">
              <div className="absolute left-4 h-full w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                {character.timeline.map((event, index) => (
                  <div key={index} className="relative pl-10">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      {(event.year || event.relativeTime) && (
                        <p className="text-sm text-gray-500 mb-2">
                          {event.year ? `~${event.year} ${event.year < 0 ? 'BC' : 'AD'}` : event.relativeTime}
                        </p>
                      )}
                      <p className="text-gray-700">{event.description}</p>
                      {event.reference && (
                        <p className="text-sm text-blue-600 mt-2">{event.reference}</p>
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
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Summary</h2>
            <p className="text-gray-700 leading-relaxed">{character.summary}</p>
          </div>
        )}

        {/* Lessons */}
        {character.lessons && character.lessons.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Lessons</h2>
            <ul className="list-disc pl-5 space-y-2">
              {character.lessons.map((lesson, index) => (
                <li key={index} className="text-gray-700">{lesson}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Historical Context */}
        {character.historicalContext && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Historical Context</h2>
            <p className="text-gray-700 leading-relaxed">{character.historicalContext}</p>
          </div>
        )}
      </div>
    </div>
  );
}
