export interface Comment {
  id: number;
  spotId: number;
  userId: number;
  userName: string;
  userAvatar: string;
  text: string;
  date: string;
  likes: number;
}

export const comments: Comment[] = [
  {
    id: 1,
    spotId: 1,
    userId: 2,
    userName: "Rahul Sharma",
    userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    text: "Nandi Hills is a must-visit for every motorcycle enthusiast in Bangalore! The early morning ride to catch the sunrise is absolutely worth it. The curves on the way up are a joy to ride on my Royal Enfield.",
    date: "2025-03-15T08:30:00Z",
    likes: 24
  },
  {
    id: 2,
    spotId: 1,
    userId: 3,
    userName: "Priya Patel",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    text: "Visited last weekend on my Duke 390. The roads are in excellent condition, and the weather was perfect. Just be careful of the fog if you're riding early morning.",
    date: "2025-03-10T14:15:00Z",
    likes: 18
  },
  {
    id: 3,
    spotId: 1,
    userId: 4,
    userName: "Vikram Singh",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    text: "The hairpin bends on the way to Nandi Hills are a motorcyclist's dream! I took my Ninja 650 there and had a blast. There's a good chai stall at the halfway point where riders usually stop.",
    date: "2025-02-28T10:45:00Z",
    likes: 15
  },
  {
    id: 4,
    spotId: 2,
    userId: 5,
    userName: "Ananya Desai",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    text: "Savandurga is a hidden gem! The approach road is a bit rough in patches but nothing that a good motorcycle can't handle. The view from the top is absolutely worth it.",
    date: "2025-03-05T16:20:00Z",
    likes: 12
  },
  {
    id: 5,
    spotId: 2,
    userId: 6,
    userName: "Karthik Reddy",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    text: "Great spot for a weekend ride. The roads are decent, and there are some good places to eat nearby. My RE Himalayan handled the terrain perfectly.",
    date: "2025-02-20T09:10:00Z",
    likes: 9
  },
  {
    id: 6,
    spotId: 3,
    userId: 7,
    userName: "Meera Nair",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    text: "Thattekere Lake is perfect for a peaceful morning ride. The roads are smooth, and there's hardly any traffic. I enjoyed a quiet breakfast by the lake after my ride.",
    date: "2025-03-12T11:30:00Z",
    likes: 14
  },
  {
    id: 7,
    spotId: 4,
    userId: 8,
    userName: "Arjun Menon",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    text: "Manchanabele Dam is a great destination for a day ride. The route has a good mix of highway and countryside roads. My Triumph Street Triple was in its element!",
    date: "2025-03-08T13:45:00Z",
    likes: 16
  },
  {
    id: 8,
    spotId: 6,
    userId: 9,
    userName: "Divya Krishnan",
    userAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    text: "Skandagiri is challenging but rewarding! The uphill ride tests your skills, but the view from the top is breathtaking. Start early to avoid the crowds.",
    date: "2025-02-25T07:20:00Z",
    likes: 21
  },
  {
    id: 9,
    spotId: 10,
    userId: 10,
    userName: "Rajesh Kumar",
    userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    text: "The ride to Shivanasamudra Falls is long but absolutely worth it! The waterfall is spectacular, especially during the monsoon. The highway is in excellent condition for most of the way.",
    date: "2025-03-01T15:10:00Z",
    likes: 28
  },
  {
    id: 10,
    spotId: 10,
    userId: 11,
    userName: "Sneha Joshi",
    userAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    text: "Did this ride on my Harley Davidson Street 750. The long stretches of highway are perfect for cruising. There are good places to stop for food along the way.",
    date: "2025-02-15T12:30:00Z",
    likes: 19
  }
];