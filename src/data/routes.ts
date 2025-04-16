export interface Route {
  id: number;
  spotId: number;
  name: string;
  description: string;
  distance: number;
  duration: string;
  difficulty: string;
}

export const routes: Route[] = [
  {
    id: 1,
    spotId: 1,
    name: "Classic Nandi Hills Route",
    description: "The most popular route to Nandi Hills via Bangalore-Hyderabad Highway and Nandi Hills Road. Offers a good mix of highway riding and twisty hill roads.",
    distance: 60,
    duration: "1.5 hours",
    difficulty: "Moderate"
  },
  {
    id: 2,
    spotId: 1,
    name: "Scenic Countryside Route",
    description: "A longer but more scenic route through Doddaballapur and rural villages. Less traffic and beautiful countryside views.",
    distance: 75,
    duration: "2 hours",
    difficulty: "Easy"
  },
  {
    id: 3,
    spotId: 1,
    name: "Adventure Trail",
    description: "For experienced riders, this route includes some off-road sections and passes through Chikkaballapur. Best for adventure motorcycles.",
    distance: 65,
    duration: "2 hours",
    difficulty: "Hard"
  },
  {
    id: 4,
    spotId: 2,
    name: "Direct Savandurga Route",
    description: "The shortest route to Savandurga Hills via Magadi Road. Good road conditions with some twisty sections near the hills.",
    distance: 50,
    duration: "1.5 hours",
    difficulty: "Easy"
  },
  {
    id: 5,
    spotId: 2,
    name: "Manchanabele Dam Loop",
    description: "A longer route that includes a stop at Manchanabele Dam before heading to Savandurga. Great for a full day ride.",
    distance: 70,
    duration: "2.5 hours",
    difficulty: "Moderate"
  },
  {
    id: 6,
    spotId: 6,
    name: "Sunrise Route",
    description: "The most direct route to Skandagiri for catching the sunrise. Start early (around 4 AM) to reach before dawn.",
    distance: 70,
    duration: "2 hours",
    difficulty: "Moderate"
  },
  {
    id: 7,
    spotId: 6,
    name: "Scenic Detour",
    description: "A longer route that passes through Chikkaballapur and offers beautiful views of the countryside. Good for a leisurely ride.",
    distance: 85,
    duration: "2.5 hours",
    difficulty: "Easy"
  },
  {
    id: 8,
    spotId: 10,
    name: "Highway Express",
    description: "The fastest route to Shivanasamudra Falls via Kanakapura Road and state highways. Excellent road conditions for most of the way.",
    distance: 120,
    duration: "3 hours",
    difficulty: "Easy"
  },
  {
    id: 9,
    spotId: 10,
    name: "Countryside Explorer",
    description: "A scenic route through rural Karnataka, passing through small villages and farmlands. More immersive but takes longer.",
    distance: 145,
    duration: "4 hours",
    difficulty: "Moderate"
  },
  {
    id: 10,
    spotId: 10,
    name: "Multi-Day Adventure",
    description: "For those looking to make it a weekend trip, this route includes stops at Talakadu and Somnathpur Temple. Best split over two days.",
    distance: 180,
    duration: "5 hours (total riding time)",
    difficulty: "Moderate"
  }
];