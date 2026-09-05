const mongoose = require('mongoose');
const News = require('./models/News');

// Database Connection (Server wala same)
mongoose.connect('mongodb://127.0.0.1:27017/newspoint')
    .then(() => console.log('Connected to DB for seeding...'))
    .catch(err => console.log(err));

// Dummy Data for all Sidebar Categories
const dummyNews = [
    { title: "India launches new digital currency framework nationwide", content: "The government has officially rolled out the framework for the digital rupee, aiming to revolutionize digital transactions across all states. Banks have started integrating the new system.", category: "india" },
    { title: "Parliament passes historic Women's Reservation Bill", content: "In a landmark move, the Parliament unanimously passed the Women's Reservation Bill, ensuring 33% reservation for women in the Lok Sabha and state assemblies.", category: "politics" },
    { title: "Sensex hits 80,000 mark for the first time, Nifty up", content: "Indian stock markets witnessed a historic rally today with the BSE Sensex crossing the 80,000 milestone driven by strong global cues and FII inflows.", category: "business" },
    { title: "ISRO successfully tests next-gen scramjet engine", content: "The Indian Space Research Organisation achieved a major technological breakthrough by successfully testing its indigenously developed scramjet engine.", category: "technology" },
    { title: "India wins T20 World Cup final against Australia", content: "In a thrilling final, Team India clinched the T20 World Cup trophy by defeating Australia by 6 wickets with Virat Kohli scoring a magnificent century.", category: "sports" },
    { title: "Bollywood's biggest blockbuster crosses 1000 Crore", content: "The much-anticipated action drama has become the first Indian film to cross the 1000 Crore mark at the domestic box office in just two weeks.", category: "entertainment" },
    { title: "Global leaders gather for G20 Climate Summit in Paris", content: "World leaders are meeting in Paris to discuss pressing climate change issues, focusing on carbon emission targets and renewable energy transitions.", category: "world" },
    { title: "UPSC declares Civil Services 2024 final results", content: "The Union Public Service Commission has declared the final results for the Civil Services Examination 2024, with candidates from diverse backgrounds making it to the top 10.", category: "education" },
    { title: "Indian Railways announces 50,000 new vacancies for 2025", content: "Railway Recruitment Board (RRB) has released an official notification for 50,000 new posts across various departments including technical and non-technical roles.", category: "jobs" },
    { title: "AIIMS introduces robotic surgery for complex heart procedures", content: "AIIMS New Delhi has become the first government hospital to routinely use advanced robotic arms for performing complex cardiac surgeries with 100% success rate.", category: "health" },
    { title: "Minimalist lifestyle trends are rising among Gen Z in metro cities", content: "A significant shift is being observed among Gen Z in cities like Mumbai and Bangalore, who are adopting minimalism and sustainable fashion over fast fashion.", category: "lifestyle" },
    { title: "Indian scientists discover new high-temperature superconductor", content: "Researchers at IISc Bangalore have discovered a new material that exhibits superconducting properties at relatively higher temperatures, promising revolution in power transmission.", category: "science" },
    { title: "Tata Motors unveils India's first mass-market electric SUV", content: "Tata Motors has revealed its most affordable electric SUV yet, priced aggressively to bring EVs to the mainstream Indian middle-class market.", category: "auto" },
    { title: "Why India needs to rethink its foreign policy strategy", content: "With rapidly changing geopolitical dynamics, experts argue that India must adopt a more proactive rather than reactive stance in its foreign diplomacy.", category: "opinion" }
];

// Data ko Database mein daalne ka function
const seedData = async () => {
    try {
        // Pehle purani news ko delete karo (taaki duplicates na aayein)
        await News.deleteMany({});
        console.log('Cleared old news.');

        // Naye data ko insert karo
        await News.insertMany(dummyNews);
        console.log('✅ Successfully inserted 14 dummy news articles!');
        
        // Script band kar do
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit();
    }
};

seedData();