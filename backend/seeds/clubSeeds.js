const mongoose = require('mongoose');
require('dotenv').config();
const Club = require('../Model/Club');

// Sample student IDs - replace these with actual IDs from your database
const sampleStudents = [
    '673f9b741e30841c0bbe5db9', // Replace with actual MongoDB ObjectIds
    '673f8b741e30841c0bbe5db9',
    '673f7b741e30841c0bbe5db9',
    '673f6b741e30841c0bbe5db9',
    '673f5b741e30841c0bbe5db9'
];

const clubs = [
    // Academic Clubs
    {
        name: "Math Enthusiasts",
        description: "A club dedicated to exploring advanced mathematics and problem-solving techniques.",
        category: "ACADEMIC",
        icon: "➗",
        coverImage: "https://example.com/images/math-club.jpg",
        members: [
            {
                studentId: sampleStudents[0],
                role: "ADMIN",
                joinedAt: new Date('2024-01-01')
            },
            {
                studentId: sampleStudents[1],
                role: "MODERATOR",
                joinedAt: new Date('2024-01-02')
            }
        ],
        events: [
            {
                title: "Math Olympiad Prep",
                description: "Preparation session for upcoming mathematics competition",
                date: new Date('2024-04-15'),
                location: "Room 101",
                attendees: [sampleStudents[0], sampleStudents[1]],
                createdBy: sampleStudents[0]
            }
        ],
        posts: [
            {
                studentId: sampleStudents[0],
                content: "Welcome to the Math Enthusiasts club! Let's solve some problems together.",
                likes: [sampleStudents[1]],
                comments: [
                    {
                        studentId: sampleStudents[1],
                        content: "Excited to be part of this club!",
                        createdAt: new Date('2024-01-02')
                    }
                ],
                createdAt: new Date('2024-01-01')
            }
        ]
    },

    // Sports Clubs
    {
        name: "Basketball Warriors",
        description: "Join us for competitive basketball and improve your game!",
        category: "SPORTS",
        icon: "🏀",
        coverImage: "https://example.com/images/basketball-club.jpg",
        members: [
            {
                studentId: sampleStudents[2],
                role: "ADMIN",
                joinedAt: new Date('2024-01-01')
            }
        ],
        events: [
            {
                title: "Weekend Practice Session",
                description: "Regular practice session with drills and scrimmage",
                date: new Date('2024-04-10'),
                location: "Main Gym",
                attendees: [sampleStudents[2]],
                createdBy: sampleStudents[2]
            }
        ]
    },

    // Technology Clubs
    {
        name: "Code Wizards",
        description: "Learn programming, build projects, and share knowledge about software development.",
        category: "TECHNOLOGY",
        icon: "💻",
        coverImage: "https://example.com/images/coding-club.jpg",
        members: [
            {
                studentId: sampleStudents[3],
                role: "ADMIN",
                joinedAt: new Date('2024-01-01')
            }
        ],
        events: [
            {
                title: "Web Development Workshop",
                description: "Learn the basics of HTML, CSS, and JavaScript",
                date: new Date('2024-04-20'),
                location: "Computer Lab",
                attendees: [sampleStudents[3]],
                createdBy: sampleStudents[3]
            }
        ]
    },

    // Arts Clubs
    {
        name: "Creative Canvas",
        description: "Express yourself through various forms of visual arts and painting.",
        category: "ARTS",
        icon: "🎨",
        coverImage: "https://example.com/images/art-club.jpg",
        members: [
            {
                studentId: sampleStudents[4],
                role: "ADMIN",
                joinedAt: new Date('2024-01-01')
            }
        ],
        events: [
            {
                title: "Watercolor Workshop",
                description: "Learn watercolor painting techniques",
                date: new Date('2024-04-25'),
                location: "Art Studio",
                attendees: [sampleStudents[4]],
                createdBy: sampleStudents[4]
            }
        ]
    },

    // Social Clubs
    {
        name: "Cultural Exchange",
        description: "Share and learn about different cultures, traditions, and languages.",
        category: "SOCIAL",
        icon: "🌍",
        coverImage: "https://example.com/images/cultural-club.jpg",
        members: [
            {
                studentId: sampleStudents[0],
                role: "ADMIN",
                joinedAt: new Date('2024-01-01')
            }
        ],
        events: [
            {
                title: "International Food Festival",
                description: "Share and taste dishes from around the world",
                date: new Date('2024-05-01'),
                location: "Student Center",
                attendees: [sampleStudents[0]],
                createdBy: sampleStudents[0]
            }
        ]
    }
];

// Function to generate random posts
const generateRandomPosts = (clubIndex) => {
    const posts = [];
    const numPosts = Math.floor(Math.random() * 5) + 1; // 1-5 posts per club

    for (let i = 0; i < numPosts; i++) {
        const studentId = sampleStudents[Math.floor(Math.random() * sampleStudents.length)];
        posts.push({
            studentId,
            content: `Sample post ${i + 1} for ${clubs[clubIndex].name}`,
            likes: [sampleStudents[Math.floor(Math.random() * sampleStudents.length)]],
            comments: [
                {
                    studentId: sampleStudents[Math.floor(Math.random() * sampleStudents.length)],
                    content: "Great post!",
                    createdAt: new Date()
                }
            ],
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
        });
    }
    return posts;
};

// Add random posts to each club
clubs.forEach((club, index) => {
    club.posts = [...(club.posts || []), ...generateRandomPosts(index)];
});

async function seedClubs() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DBURI);
        console.log('Connected to MongoDB');

        // Clear existing clubs
        await Club.deleteMany({});
        console.log('Cleared existing clubs');

        // Insert new clubs
        await Club.insertMany(clubs);
        console.log('Successfully seeded clubs');

        // Log statistics
        const stats = {
            totalClubs: clubs.length,
            totalEvents: clubs.reduce((acc, club) => acc + club.events.length, 0),
            totalPosts: clubs.reduce((acc, club) => acc + club.posts.length, 0),
            totalMembers: clubs.reduce((acc, club) => acc + club.members.length, 0)
        };
        console.log('Seeding statistics:', stats);

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('Error seeding clubs:', error);
        process.exit(1);
    }
}

// Run the seed function if this file is run directly
if (require.main === module) {
    seedClubs();
}

module.exports = {
    clubs,
    seedClubs
};