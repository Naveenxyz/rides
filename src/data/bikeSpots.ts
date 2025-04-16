export interface BikeSpot {
  id: number;
  name: string;
  description: string;
  distance: number; // in km from city center
  rating: number; // out of 5
  popularity: number; // 1-100
  images: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  tags: string[];
}

export const bikeSpots: BikeSpot[] = [
  {
    id: 1,
    name: "Nandi Hills",
    description: "A popular hill station with stunning sunrise views and winding roads perfect for a challenging motorcycle ride. The twisty roads leading up to the summit offer an exhilarating experience for riders.",
    distance: 60,
    rating: 4.8,
    popularity: 95,
    images: [
      "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    location: {
      latitude: 13.3702,
      longitude: 77.6835
    },
    tags: ["hill station", "sunrise", "twisty roads", "weekend ride"]
  },
  {
    id: 2,
    name: "Savandurga Hills",
    description: "One of the largest monolith hills in Asia, offering great trails and breathtaking views. The approach road is perfect for motorcycle enthusiasts looking for a mix of straight stretches and curves.",
    distance: 50,
    rating: 4.5,
    popularity: 80,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541848952518-f6c4aeb24d8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    location: {
      latitude: 12.9242,
      longitude: 77.2945
    },
    tags: ["monolith", "trails", "scenic", "day trip"]
  },
  {
    id: 3,
    name: "Thattekere Lake",
    description: "A serene lake surrounded by lush greenery, perfect for a peaceful motorcycle ride away from the city. The route offers smooth roads with minimal traffic, ideal for a relaxing cruise.",
    distance: 35,
    rating: 4.2,
    popularity: 75,
    images: [
      "https://images.unsplash.com/photo-1580661869408-55ab23f2ca6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    location: {
      latitude: 12.7348,
      longitude: 77.4741
    },
    tags: ["lake", "peaceful", "nature", "smooth roads"]
  },
  {
    id: 4,
    name: "Manchanabele Dam",
    description: "A beautiful reservoir with picturesque surroundings and good roads for motorcycling. The route features a mix of highway and countryside roads that motorcycle enthusiasts will appreciate.",
    distance: 40,
    rating: 4.3,
    popularity: 70,
    images: [
      "https://images.unsplash.com/photo-1505232530843-7e94d7faac73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490682143684-14369e18dce8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    location: {
      latitude: 12.9025,
      longitude: 77.2910
    },
    tags: ["dam", "reservoir", "scenic", "countryside"]
  },
  {
    id: 5,
    name: "Hesaraghatta Lake",
    description: "A man-made lake with open grasslands and a variety of bird species to spot. The straight roads leading to the lake are perfect for cruiser motorcycles looking for a smooth ride.",
    distance: 28,
    rating: 4.0,
    popularity: 65,
    images: [
      "https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    location: {
      latitude: 13.1358,
      longitude: 77.4966
    },
    tags: ["lake", "grasslands", "birdwatching", "straight roads"]
  },
  {
    id: 6,
    name: "Skandagiri",
    description: "A mountain fortress with ancient ruins and popular for night treks and early morning rides. The challenging uphill roads test the skills of motorcycle riders while offering spectacular views.",
    distance: 70,
    rating: 4.6,
    popularity: 85,
    images: [
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    location: {
      latitude: 13.3527,
      longitude: 77.6755
    },
    tags: ["mountain", "fortress", "sunrise", "challenging ride"]
  },
  {
    id: 7,
    name: "Anthargange",
    description: "Known for its volcanic rock formations and caves, offering a unique riding experience. The route includes some rough patches that adventure motorcyclists will find exciting.",
    distance: 65,
    rating: 4.4,
    popularity: 75,
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1471958680802-1345a694ba6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    location: {
      latitude: 13.1311,
      longitude: 78.0958
    },
    tags: ["caves", "rocks", "adventure", "rough terrain"]
  },
  {
    id: 8,
    name: "Turahalli Forest",
    description: "A small forest area with trails suitable for off-road motorcycling, close to the city. Perfect for a quick escape when you don't have time for a longer ride.",
    distance: 20,
    rating: 4.1,
    popularity: 70,
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    location: {
      latitude: 12.9086,
      longitude: 77.5179
    },
    tags: ["forest", "trails", "off-road", "quick ride"]
  },
  {
    id: 9,
    name: "Ramanagara",
    description: "Famous for the movie 'Sholay', with rocky terrains and good roads for motorcycling. The highway leading to Ramanagara offers excellent riding conditions for sport bikes.",
    distance: 50,
    rating: 4.3,
    popularity: 80,
    images: [
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520962880247-cfaf541c8724?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    location: {
      latitude: 12.7223,
      longitude: 77.2810
    },
    tags: ["rocks", "movie location", "scenic", "highway"]
  },
  {
    id: 10,
    name: "Shivanasamudra Falls",
    description: "A segmented waterfall and one of the earliest hydro-electric power stations in Asia. The long ride to the falls is a favorite among touring motorcycle enthusiasts.",
    distance: 120,
    rating: 4.7,
    popularity: 85,
    images: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470770903f89-0f10a66a3516?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    location: {
      latitude: 12.3012,
      longitude: 77.1737
    },
    tags: ["waterfall", "long ride", "scenic", "touring"]
  },
  {
    id: 11,
    name: "Bheemeshwari",
    description: "A fishing camp and adventure spot along the Cauvery river with beautiful roads. The route offers a mix of forest roads and riverside stretches that are a joy to ride on.",
    distance: 100,
    rating: 4.5,
    popularity: 75,
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    location: {
      latitude: 12.3325,
      longitude: 77.4168
    },
    tags: ["river", "fishing", "adventure", "forest roads"]
  },
  {
    id: 12,
    name: "Kanakapura Road",
    description: "A scenic route with multiple attractions along the way, perfect for a day ride. The well-maintained road is ideal for all types of motorcycles and offers plenty of stopping points.",
    distance: 25,
    rating: 4.2,
    popularity: 90,
    images: [
      "https://images.unsplash.com/photo-1464313200334-9c5164b9d987?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520962922320-2038eebab146?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    location: {
      latitude: 12.6253,
      longitude: 77.4168
    },
    tags: ["scenic route", "day ride", "multiple stops", "well-maintained"]
  }
];