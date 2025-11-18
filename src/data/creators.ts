import priyaImage from "@/assets/creator-priya.jpg";
import arjunImage from "@/assets/creator-arjun.jpg";
import kavyaImage from "@/assets/creator-kavya.jpg";
import rohitImage from "@/assets/creator-rohit.jpg";
import meeraImage from "@/assets/creator-meera.jpg";
import devImage from "@/assets/creator-dev.jpg";

export interface Creator {
  id: number;
  name: string;
  handle: string;
  followers: string;
  followersNum: number;
  location: string;
  categories: string[];
  ratePerReel: string;
  ratePerPost: string;
  rating: number;
  completedProjects: number;
  isVerified: boolean;
  avatar: string;
  portfolio: string[];
}

export const creators: Creator[] = [
  {
    id: 1,
    name: "Priya Sharma",
    handle: "@priyafashion",
    followers: "45K",
    followersNum: 45000,
    location: "Mumbai, Maharashtra",
    categories: ["Fashion", "Lifestyle"],
    ratePerReel: "₹12,000",
    ratePerPost: "₹8,000",
    rating: 4.9,
    completedProjects: 127,
    isVerified: true,
    avatar: priyaImage,
    portfolio: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop"]
  },
  {
    id: 2,
    name: "Arjun Patel",
    handle: "@arjuntech",
    followers: "32K",
    followersNum: 32000,
    location: "Bangalore, Karnataka", 
    categories: ["Tech", "Gaming"],
    ratePerReel: "₹15,000",
    ratePerPost: "₹9,500",
    rating: 4.8,
    completedProjects: 89,
    isVerified: true,
    avatar: arjunImage,
    portfolio: ["https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"]
  },
  {
    id: 3,
    name: "Kavya Singh",
    handle: "@kavyabeauty",
    followers: "38K",
    followersNum: 38000,
    location: "Delhi, NCR",
    categories: ["Beauty", "Skincare"],
    ratePerReel: "₹12,800",
    ratePerPost: "₹7,600",
    rating: 4.9,
    completedProjects: 178,
    isVerified: true,
    avatar: kavyaImage,
    portfolio: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop"]
  },
  {
    id: 4,
    name: "Rohit Kumar",
    handle: "@rohitfitness",
    followers: "52K",
    followersNum: 52000,
    location: "Pune, Maharashtra",
    categories: ["Fitness", "Health"],
    ratePerReel: "₹14,500",
    ratePerPost: "₹8,800",
    rating: 4.8,
    completedProjects: 203,
    isVerified: true,
    avatar: rohitImage,
    portfolio: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop"]
  },
  {
    id: 5,
    name: "Meera Iyer",
    handle: "@meeracooks",
    followers: "35K",
    followersNum: 35000,
    location: "Chennai, Tamil Nadu",
    categories: ["Food", "Cooking"],
    ratePerReel: "₹11,200",
    ratePerPost: "₹6,800",
    rating: 4.8,
    completedProjects: 189,
    isVerified: true,
    avatar: meeraImage,
    portfolio: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop"]
  },
  {
    id: 6,
    name: "Dev Malhotra",
    handle: "@devtravels",
    followers: "41K",
    followersNum: 41000,
    location: "Jaipur, Rajasthan",
    categories: ["Travel", "Photography"],
    ratePerReel: "₹13,600",
    ratePerPost: "₹8,400",
    rating: 4.7,
    completedProjects: 145,
    isVerified: true,
    avatar: devImage,
    portfolio: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop"]
  }
];
