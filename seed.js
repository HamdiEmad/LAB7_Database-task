/**
 * Database lab — seed.js
 * ----------------------
 * Seed file: populates the database with Egyptian movies & memes themed data.
 * Run with: node seed.js or npm run seed
 */

const { connectDb, getPool } = require('./db');

/**
 * Hardcoded seed data: Egyptian movie/meme characters and references
 */
const seedData = [
  {
    person: {
      fName: 'Abbas',
      lName: 'Eldemery',
      Address: '123 Talaat Harb Street',
      city: 'Cairo',
      country: 'Egypt',
      Email: 'abbas.eldemery@cinema.eg'
    },
    projects: ['Ya Reit! Movie Production', 'Karkar Comedy Series', 'The Mummy Returns'],
    courses: ['Advanced Comedy Acting', 'Egyptian Cinema History', 'Meme Marketing 101', 'Martial arts', 'Parkour', 'Creating action memes'],
    languages: ['Arabic', 'English', 'French'],
    hobbies: ['Making people laugh', 'Acting in dramas', 'Creating memes'],
    trainings: ['Comedy Workshop', 'Film Direction Basics', 'Social Media Comedy']
  },
  {
    person: {
      fName: 'Lotfy',
      lName: 'Elganayney',
      Address: '456 Zamalek Avenue',
      city: 'Cairo',
      country: 'Egypt',
      Email: 'lotfy.elganayney@meme.eg'
    },
    projects: ['Mabrouk! TikTok Series', 'Ya Nhar! Comedy Album', 'Khalt Thiba Remake'],
    courses: ['TikTok Content Creation', 'Stand-up Comedy', 'Arabic Linguistics'],
    languages: ['Arabic', 'English', 'German'],
    hobbies: ['TikTok filming', 'Stand-up comedy', 'Anime watching'],
    trainings: ['Content Creator Bootcamp', 'Video Editing Master Class', 'Viral Marketing']
  },
  {
    person: {
      fName: 'Motaz',
      lName: 'Elbalooty',
      Address: '789 Zamalek Island',
      city: 'Cairo',
      country: 'Egypt',
      Email: 'motaz.elbalooty@cinema.eg'
    },
    projects: ['Alhabibi Ya Mounira', 'Ya Reit Drama Series', 'Meme Queen Documentary'],
    courses: ['Dramatic Acting', 'Film Production', 'Social Media Strategy'],
    languages: ['Arabic', 'English', 'Italian'],
    hobbies: ['Acting', 'Dancing', 'Creating viral videos'],
    trainings: ['Meisner Technique', 'Film Directing', 'Digital Marketing for Actors']
  },
  {
    person: {
      fName: 'Salma',
      lName: 'Elshahat',
      Address: '321 Nasr City',
      city: 'Cairo',
      country: 'Egypt',
      Email: 'salma.elshahat@movies.eg'
    },
    projects: ['Abu el-Layth el-Khimar Trilogy', 'Action Hero Chronicles', 'Meme Legends'],
    courses: ['Action Choreography', 'Stunt Training', 'Movie Production'],
    languages: ['Arabic', 'English'],
    hobbies: ['Martial arts', 'Parkour', 'Creating action memes'],
    trainings: ['Advanced Stunt Work', 'Action Direction', 'Fight Choreography']
  },
  {
    person: {
      fName: 'Nasrat',
      lName: 'Hekal',
      Address: '654 Helwan Tech Park',
      city: 'Helwan',
      country: 'Egypt',
      Email: 'nasrat.hekal@social.eg'
    },
    projects: ['Ya Reit Database Project', 'Karkar App'],
    courses: ['Full Stack Web Development', 'Database Design', 'Node.js Mastery'],
    languages: ['Arabic', 'English', 'Python', 'JavaScript'],
    hobbies: ['Coding meme apps', 'Debugging code', 'Making developer memes'],
    trainings: ['Advanced MySQL', 'Express.js Workshop', 'DevOps Essentials']
  },
  {
    person: {
      fName: 'Othman',
      lName: 'Elbagory',
      Address: '987 Downtown Cairo',
      city: 'Cairo',
      country: 'Egypt',
      Email: 'othman.elbagory@oldmovies.eg'
    },
    projects: ['Classic Egyptian Cinema Archive', 'Golden Era Documentaries', 'Meme History Book'],
    courses: ['Film History', 'Cinema Restoration', 'Egyptian Culture Studies'],
    languages: ['Arabic', 'English', 'French', 'German'],
    hobbies: ['Watching classic films', 'Archiving cinema history', 'Collecting movie posters'],
    trainings: ['Film Restoration Techniques', 'Documentary Filmmaking', 'Cultural Heritage Preservation']
  },
  {
    person: {
      fName: 'Omar',
      lName: 'Khairallah',
      Address: '111 Giza',
      city: 'Giza',
      country: 'Egypt',
      Email: 'omar.khairallah@laugh.eg'
    },
    projects: ['Mabrouk Comedy Club', 'Ya Nhar Podcast', 'Meme Collection YouTube Channel'],
    courses: ['Improv Comedy', 'Video Production', 'Content Strategy'],
    languages: ['Arabic', 'English'],
    hobbies: ['Standup comedy', 'Podcast hosting', 'Meme curation'],
    trainings: ['Comedy Workshop', 'Podcast Production', 'YouTube Creator Academy']
  },
  {
    person: {
      fName: 'Nesma',
      lName: 'Adel',
      Address: '222 Dokki',
      city: 'Cairo',
      country: 'Egypt',
      Email: 'nesma.adel@cinema.eg'
    },
    projects: ['Epic Film Scores', 'Ya Reit Musical', 'Meme Soundtrack Album'],
    courses: ['Film Scoring'],
    languages: ['Arabic', 'English', 'Italian'],
    hobbies: ['Composing soundtracks', 'Playing piano', 'Creating viral music'],
    trainings: ['Hans Zimmer Masterclass', 'FL Studio Advanced', 'Music Theory Master']
  },
  {
    person: {
      fName: 'Ateyat',
      lName: 'Maaty',
      Address: '333 Maadi',
      city: 'Cairo',
      country: 'Egypt',
      Email: 'ateyat.maaty@memes.eg'
    },
    projects: ['El Meme El Kbeer', 'Cairo Laugh Factory', 'Viral Scene Remix'],
    courses: ['Script Writing', 'Content Editing', 'Comedy Timing'],
    languages: ['Arabic', 'English'],
    hobbies: ['Voice acting', 'Meme remixes', 'Sketch comedy'],
    trainings: ['Storytelling Bootcamp', 'Short Video Production', 'Audience Engagement']
  }
];

/**
 * Main function: clear existing data, insert seed data
 */
async function seed() {
  await connectDb();
  const pool = getPool();

  try {
    console.log('🎬 Starting Egyptian Cinema & Memes Seed...\n');

    // Clear existing data (optional — comment out to preserve data)
    console.log('🗑️  Clearing existing data...');
    await pool.query('DELETE FROM training');
    await pool.query('DELETE FROM hobby');
    await pool.query('DELETE FROM language');
    await pool.query('DELETE FROM course');
    await pool.query('DELETE FROM project');
    await pool.query('DELETE FROM person');
    console.log('✅ Tables cleared.\n');

    let personCount = 0;
    let projectCount = 0;
    let courseCount = 0;
    let languageCount = 0;
    let hobbyCount = 0;
    let trainingCount = 0;

    // Insert each person and their child records
    for (const data of seedData) {
      console.log(`📺 Inserting ${data.person.fName} ${data.person.lName}...`);

      // Insert person
      const [personResult] = await pool.query(
        'INSERT INTO person (fName, lName, Address, city, country, Email) VALUES (?, ?, ?, ?, ?, ?)',
        [
          data.person.fName,
          data.person.lName,
          data.person.Address,
          data.person.city,
          data.person.country,
          data.person.Email
        ]
      );
      const personId = personResult.insertId;
      personCount++;

      // Helper: insert child rows
      const insertChildren = async (table, names) => {
        for (const name of names) {
          if (name) {
            await pool.query(
              `INSERT INTO ${table} (name, person_idperson) VALUES (?, ?)`,
              [name, personId]
            );
            if (table === 'project') projectCount++;
            else if (table === 'course') courseCount++;
            else if (table === 'language') languageCount++;
            else if (table === 'hobby') hobbyCount++;
            else if (table === 'training') trainingCount++;
          }
        }
      };

      // Insert child records
      await insertChildren('project', data.projects);
      await insertChildren('course', data.courses);
      await insertChildren('language', data.languages);
      await insertChildren('hobby', data.hobbies);
      await insertChildren('training', data.trainings);

      console.log(`   ✅ Added: ${data.projects.length} projects, ${data.courses.length} courses, ${data.languages.length} languages, ${data.hobbies.length} hobbies, ${data.trainings.length} trainings\n`);
    }

    console.log('🎉 Seed Complete!\n');
    console.log('📊 Summary:');
    console.log(`   👤 Persons: ${personCount}`);
    console.log(`   🎬 Projects: ${projectCount}`);
    console.log(`   📚 Courses: ${courseCount}`);
    console.log(`   🗣️  Languages: ${languageCount}`);
    console.log(`   🎮 Hobbies: ${hobbyCount}`);
    console.log(`   🎓 Trainings: ${trainingCount}`);
    console.log('\n✨ Mabrouk! Your database is ready for queries!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
}

// Run the seed
seed();
