export interface DayTrip {
  id: number;
  title: string;
  creator: {
    id: number;
    name: string;
    avatar: string;
  };
  description: string;
  startLocation: string;
  startTime: string;
  endLocation: string;
  estimatedDuration: string;
  distance: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  stops: {
    name: string;
    description: string;
    time: string;
    location: {
      latitude: number;
      longitude: number;
    };
    imageUrl?: string;
  }[];
  tags: string[];
  rating: number;
  ridesCompleted: number;
  createdAt: string;
  images: string[];
}

export const dayTrips: DayTrip[] = [
  {
    id: 1,
    title: "Sunrise to Sunset: Dams, Hills & Culture",
    creator: {
      id: 101,
      name: "Arjun Menon",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    description: "Experience the perfect blend of nature, adventure, and culture in this one-day motorcycle journey. Start early to catch the sunrise at Manchanabele Dam, conquer the challenging Thimmappana Betta, enjoy the greenery, then head to the city for some comedy and authentic South Indian breakfast.",
    startLocation: "HSR Layout",
    startTime: "04:30 AM",
    endLocation: "HSR Layout",
    estimatedDuration: "8 hours",
    distance: 120,
    difficulty: "Moderate",
    stops: [
      {
        name: "Manchanabele Dam",
        description: "Enjoy the serene sunrise views over the reservoir with misty mountains in the background.",
        time: "05:45 AM",
        location: {
          latitude: 12.9025,
          longitude: 77.2910
        },
        imageUrl: "https://images.unsplash.com/photo-1505232530843-7e94d7faac73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Kootagalu Thimmappana Betta",
        description: "A moderate trek up the hill offers panoramic views of the surrounding countryside.",
        time: "08:00 AM",
        location: {
          latitude: 12.7651,
          longitude: 77.3340
        },
        imageUrl: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Cubbon Park (Standup Comedy)",
        description: "Attend the popular morning standup comedy show at Cubbon Park for some laughs.",
        time: "11:00 AM",
        location: {
          latitude: 12.9763,
          longitude: 77.5929
        },
        imageUrl: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "MTR Restaurant",
        description: "Finish the trip with an authentic South Indian breakfast at the iconic MTR restaurant.",
        time: "12:30 PM",
        location: {
          latitude: 12.9551,
          longitude: 77.5935
        },
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    tags: ["sunrise", "dam", "hill", "comedy", "food", "culture"],
    rating: 4.8,
    ridesCompleted: 156,
    createdAt: "2024-12-15T10:30:00Z",
    images: [
      "https://images.unsplash.com/photo-1505232530843-7e94d7faac73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    title: "Mystic Morning: Nandi Hills & Countryside",
    creator: {
      id: 102,
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    description: "Experience the magic of sunrise at Nandi Hills followed by a scenic countryside ride through small villages and coffee estates. End your journey with a hearty breakfast at a popular highway dhaba.",
    startLocation: "Indiranagar",
    startTime: "03:30 AM",
    endLocation: "Indiranagar",
    estimatedDuration: "7 hours",
    distance: 140,
    difficulty: "Easy",
    stops: [
      {
        name: "Nandi Hills",
        description: "Catch the breathtaking sunrise from the viewpoint at the top of Nandi Hills.",
        time: "05:00 AM",
        location: {
          latitude: 13.3702,
          longitude: 77.6835
        },
        imageUrl: "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Devanahalli Fort",
        description: "Explore the historic birthplace of Tipu Sultan with its ancient fort.",
        time: "07:30 AM",
        location: {
          latitude: 13.2473,
          longitude: 77.7112
        },
        imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Countryside Coffee Estate",
        description: "Take a short tour of a local coffee estate and sample some freshly brewed coffee.",
        time: "09:00 AM",
        location: {
          latitude: 13.1702,
          longitude: 77.5835
        },
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Highway Dhaba",
        description: "Enjoy a hearty North Indian breakfast at a popular highway dhaba.",
        time: "10:30 AM",
        location: {
          latitude: 13.0473,
          longitude: 77.6112
        },
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    tags: ["sunrise", "hills", "fort", "coffee", "countryside", "breakfast"],
    rating: 4.6,
    ridesCompleted: 203,
    createdAt: "2024-11-20T08:15:00Z",
    images: [
      "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    title: "Waterfall Wonders: Shivanasamudra & Talakadu",
    creator: {
      id: 103,
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    description: "Embark on a journey to witness the majestic Shivanasamudra Falls and explore the ancient temple town of Talakadu. This ride offers a perfect blend of natural beauty, history, and spirituality.",
    startLocation: "Electronic City",
    startTime: "06:00 AM",
    endLocation: "Electronic City",
    estimatedDuration: "10 hours",
    distance: 240,
    difficulty: "Moderate",
    stops: [
      {
        name: "Kamat Lokaruchi",
        description: "Start with a traditional South Indian breakfast at this popular highway restaurant.",
        time: "07:00 AM",
        location: {
          latitude: 12.8251,
          longitude: 77.4168
        },
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Shivanasamudra Falls",
        description: "Witness the magnificent twin waterfalls formed by the Kaveri River.",
        time: "09:30 AM",
        location: {
          latitude: 12.3012,
          longitude: 77.1737
        },
        imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Talakadu",
        description: "Explore the ancient temple town known for its buried temples and sandy landscape.",
        time: "12:00 PM",
        location: {
          latitude: 12.1784,
          longitude: 77.0296
        },
        imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Somnathpur Temple",
        description: "Visit the exquisite 13th-century Keshava Temple known for its intricate carvings.",
        time: "02:30 PM",
        location: {
          latitude: 12.2776,
          longitude: 76.8876
        },
        imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    tags: ["waterfall", "temple", "history", "long ride", "scenic"],
    rating: 4.9,
    ridesCompleted: 124,
    createdAt: "2025-01-05T09:45:00Z",
    images: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 4,
    title: "Urban Explorer: Bangalore City Highlights",
    creator: {
      id: 104,
      name: "Meera Nair",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    description: "Discover the best of Bangalore city in one day. This urban ride takes you through historic landmarks, lush gardens, vibrant markets, and ends with a perfect sunset view.",
    startLocation: "MG Road",
    startTime: "08:00 AM",
    endLocation: "MG Road",
    estimatedDuration: "9 hours",
    distance: 50,
    difficulty: "Easy",
    stops: [
      {
        name: "Lalbagh Botanical Garden",
        description: "Start your day with a peaceful morning walk in this historic garden with its famous glass house.",
        time: "08:30 AM",
        location: {
          latitude: 12.9507,
          longitude: 77.5848
        },
        imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Bangalore Palace",
        description: "Explore the magnificent Tudor-style palace built in 1887.",
        time: "11:00 AM",
        location: {
          latitude: 12.9988,
          longitude: 77.5921
        },
        imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Commercial Street",
        description: "Shop at one of Bangalore's oldest and most popular shopping destinations.",
        time: "01:30 PM",
        location: {
          latitude: 12.9819,
          longitude: 77.6078
        },
        imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "UB City",
        description: "Enjoy a luxury lunch experience at this upscale mall.",
        time: "03:30 PM",
        location: {
          latitude: 12.9715,
          longitude: 77.5945
        },
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Nandi Hills Viewpoint",
        description: "End your day with a beautiful sunset view from this popular viewpoint.",
        time: "05:30 PM",
        location: {
          latitude: 13.3702,
          longitude: 77.6835
        },
        imageUrl: "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    tags: ["city", "urban", "shopping", "palace", "garden", "sunset"],
    rating: 4.5,
    ridesCompleted: 187,
    createdAt: "2024-12-28T11:20:00Z",
    images: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 5,
    title: "Coffee Estates & Countryside",
    creator: {
      id: 105,
      name: "Rahul Sharma",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    description: "Experience the aroma of coffee plantations and the beauty of rural Karnataka in this refreshing day trip. Ride through scenic countryside roads, visit coffee estates, and enjoy authentic local cuisine.",
    startLocation: "Whitefield",
    startTime: "07:00 AM",
    endLocation: "Whitefield",
    estimatedDuration: "8 hours",
    distance: 160,
    difficulty: "Moderate",
    stops: [
      {
        name: "Innovative Film City",
        description: "A quick stop at this entertainment park on the outskirts of Bangalore.",
        time: "08:00 AM",
        location: {
          latitude: 12.8913,
          longitude: 77.4757
        },
        imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Ramanagara",
        description: "Visit the famous rocky outcrops where the movie 'Sholay' was filmed.",
        time: "09:30 AM",
        location: {
          latitude: 12.7223,
          longitude: 77.2810
        },
        imageUrl: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Coffee Day Estate",
        description: "Tour a coffee plantation and learn about coffee production while enjoying freshly brewed coffee.",
        time: "11:30 AM",
        location: {
          latitude: 12.6123,
          longitude: 77.1810
        },
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Local Village Lunch",
        description: "Experience authentic rural Karnataka cuisine at a local village eatery.",
        time: "01:30 PM",
        location: {
          latitude: 12.5823,
          longitude: 77.2210
        },
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    tags: ["coffee", "countryside", "rural", "food", "scenic"],
    rating: 4.7,
    ridesCompleted: 142,
    createdAt: "2025-01-10T10:15:00Z",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  }
];