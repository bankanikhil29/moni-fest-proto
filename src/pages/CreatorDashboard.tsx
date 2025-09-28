import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Clock, Star, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";

const stats = [
  { label: "Total Earnings", value: "$3,450", icon: DollarSign, change: "+12%" },
  { label: "Active Campaigns", value: "5", icon: TrendingUp, change: "+2" },
  { label: "Pending Payments", value: "$850", icon: Clock, change: "" },
  { label: "Average Rating", value: "4.9", icon: Star, change: "+0.1" }
];

const campaigns = [
  {
    id: 1,
    brand: "EcoStyle",
    title: "Summer Collection Showcase",
    status: "Active",
    payment: "$300",
    deadline: "2024-02-15",
    deliverables: ["2 Reels", "3 Stories"]
  },
  {
    id: 2,
    brand: "TechFlow",
    title: "Smart Home Review",
    status: "In Review",
    payment: "$500",
    deadline: "2024-02-20",
    deliverables: ["1 Reel", "1 YouTube Short"]
  }
];

export default function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Sarah! Here's your overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      {stat.change && (
                        <p className="text-sm text-accent">
                          {stat.change}
                        </p>
                      )}
                    </div>
                    <stat.icon className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="campaigns" className="space-y-6">
            <TabsList>
              <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
              <TabsTrigger value="opportunities">New Opportunities</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold">{campaign.title}</h3>
                          <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                          <div className="flex gap-2 mt-2">
                            {campaign.deliverables.map((item, i) => (
                              <Badge key={i} variant="secondary">{item}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                            {campaign.status}
                          </Badge>
                          <p className="font-semibold text-lg mt-1">{campaign.payment}</p>
                          <p className="text-sm text-muted-foreground">Due: {campaign.deadline}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">New brand opportunities will appear here based on your profile and preferences.</p>
                  <Button className="mt-4" variant="coral">
                    Browse All Opportunities
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Manage your creator profile, rates, and preferences.</p>
                  <Button className="mt-4" variant="outline">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}