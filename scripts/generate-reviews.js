
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const projectRoot = path.resolve(__dirname, '..');
const fetchJsonPath = path.join(projectRoot, 'fetch.json');
const outputPath = path.join(projectRoot, 'src', 'data', 'reviews.ts');

console.log('Reading fetch.json from:', fetchJsonPath);

try {
  const fetchContent = fs.readFileSync(fetchJsonPath, 'utf-8');
  const fetchData = JSON.parse(fetchContent);

  if (!fetchData.result || !Array.isArray(fetchData.result)) {
    throw new Error('Invalid fetch.json format: result array missing');
  }

  const propertyIds = fetchData.result.map(p => p.id);
  console.log(`Found ${propertyIds.length} properties.`);

  // Data pools for random generation
  const firstNames = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'James', 'Isabella', 'Oliver',
    'Mia', 'Benjamin', 'Charlotte', 'Elijah', 'Amelia', 'Lucas', 'Harper', 'Mason', 'Evelyn', 'Logan',
    'Abigail', 'Alexander', 'Emily', 'Ethan', 'Elizabeth', 'Jacob', 'Mila', 'Michael', 'Ella', 'Daniel',
    'Avery', 'Henry', 'Sofia', 'Jackson', 'Camila', 'Sebastian', 'Aria', 'Aiden', 'Scarlett', 'Matthew',
    'Victoria', 'Samuel', 'Madison', 'David', 'Luna', 'Joseph', 'Grace', 'Carter', 'Chloe', 'Owen',
    'Penelope', 'Wyatt', 'Layla', 'John', 'Riley', 'Jack', 'Zoey', 'Luke', 'Nora', 'Jayden',
    'Lily', 'Dylan', 'Eleanor', 'Grayson', 'Hannah', 'Levi', 'Lillian', 'Isaac', 'Addison', 'Gabriel',
    'Aubrey', 'Julian', 'Ellie', 'Mateo', 'Stella', 'Anthony', 'Natalie', 'Jaxon', 'Zoe', 'Lincoln',
    'Leah', 'Joshua', 'Hazel', 'Christopher', 'Violet', 'Andrew', 'Aurora', 'Theodore', 'Savannah', 'Caleb'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
  ];

  const positiveAdjectives = [
    'wonderful', 'fantastic', 'amazing', 'perfect', 'lovely', 'beautiful', 'great', 'excellent', 'superb', 'charming',
    'cozy', 'spacious', 'clean', 'spotless', 'inviting', 'comfortable', 'relaxing', 'peaceful', 'quiet', 'memorable'
  ];

  const locationPhrases = [
    'The location was perfect', 'Close to everything', 'Steps from the beach', 'Great neighborhood',
    'Conveniently located', 'Walking distance to shops', 'Right in the heart of town', 'Peaceful surroundings',
    'Beautiful views', 'Easy access to the coast'
  ];

  const housePhrases = [
    'The house was spotless', 'Decor was beautiful', 'Beds were super comfy', 'Kitchen was well-stocked',
    'Everything we needed', 'Felt like home', 'Very spacious', 'Clean and tidy', 'Loved the amenities',
    'High quality furnishings'
  ];

  const hostPhrases = [
    'Host was responsive', 'Check-in was easy', 'Communication was great', 'Very helpful host',
    'Seamless process', 'Kyle was great', 'Host went above and beyond', 'Clear instructions',
    'Warm welcome', 'Felt well taken care of'
  ];

  const closingPhrases = [
    'Would definitely stay again!', 'Highly recommend!', 'Can\'t wait to come back.', 'Five stars!',
    'Our new favorite spot.', 'Best vacation ever.', 'Thanks for a great stay.', 'We will be back.',
    'A true gem.', 'Don\'t hesitate to book.'
  ];

  function getRandomReview(propId, index) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const guestName = `${firstName} ${lastName.charAt(0)}.`;

    const adj = positiveAdjectives[Math.floor(Math.random() * positiveAdjectives.length)];
    const loc = locationPhrases[Math.floor(Math.random() * locationPhrases.length)];
    const house = housePhrases[Math.floor(Math.random() * housePhrases.length)];
    const host = hostPhrases[Math.floor(Math.random() * hostPhrases.length)];
    const close = closingPhrases[Math.floor(Math.random() * closingPhrases.length)];

    const sentences = [
      `We had a ${adj} time here.`,
      loc + '.',
      house + '.',
      host + '.',
      close
    ];

    // Shuffle middle sentences
    const middle = sentences.slice(1, 4).sort(() => 0.5 - Math.random());
    const comment = [sentences[0], ...middle, sentences[4]].join(' ');

    const id = `${propId}-rev-${index + 1}`;

    // Date generation (last 12 months)
    const end = new Date();
    const start = new Date(end.getFullYear() - 1, end.getMonth(), end.getDate());
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];

    // Rating (weighted towards 5)
    const rating = Math.random() > 0.15 ? 5 : 4;

    return {
      id,
      guestName,
      rating,
      date,
      comment
    };
  }

  // Generate reviews
  const allReviews = {};

  propertyIds.forEach(id => {
    // Generate random number of reviews between 3 and 8
    const numReviews = Math.floor(Math.random() * 6) + 3;
    const propertyReviews = [];

    for (let i = 0; i < numReviews; i++) {
      propertyReviews.push(getRandomReview(id, i));
    }

    // Sort by date descending
    propertyReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    allReviews[id] = propertyReviews;
  });

  // Construct file content
  const fileContent = `export interface Review {
  id: string;
  guestName: string;
  rating: number;
  date: string;
  comment: string;
}

export const propertyReviews: Record<string, Review[]> = ${JSON.stringify(allReviews, null, 2)};

export const getReviewsForProperty = (propertyId: string): Review[] => {
  if (propertyReviews[propertyId]) {
    return propertyReviews[propertyId];
  }
  return [];
};
`;

  fs.writeFileSync(outputPath, fileContent);
  console.log(`Successfully generated reviews for ${propertyIds.length} properties in ${outputPath}`);

} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
