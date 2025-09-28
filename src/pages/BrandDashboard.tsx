import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Eye, DollarSign, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";

const stats = [
  { label: "Active Campaigns", value: "8", icon: TrendingUp, change: "+3" },
  { label: "Total Applications", value: "124", icon: Users, change: "+18" },
  { label: "Campaign Spend", value: "₹ 12,50,000.00", icon: DollarSign, change: "+₹ 2,30,000.00" },
  { label: "Profile Views", value: "2,341", icon: Eye, change: "+15%" }
];

const campaigns = [
  {
    id: 1,
    title: "Summer Eco Collection",
    status: "Active",
    budget: "₹ 2,00,000.00 - ₹ 5,00,000.00",
    applications: 23,
    selected: 3,
    deadline: "2024-02-15"
  },
  {
    id: 2,
    title: "Sustainable Fashion Week",
    status: "Draft",
    budget: "₹ 5,00,000.00 - ₹ 10,00,000.00",
    applications: 0,
    selected: 0,
    deadline: "2024-03-01"
  }
];

export default function BrandDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Brand Dashboard</h1>
            <p className="text-muted-foreground">Manage your campaigns and find the perfect creators.</p>
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
              <TabsTrigger value="creators">Find Creators</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Campaign Management</h2>
                <Button variant="coral">Create New Campaign</Button>
              </div>
              
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{campaign.title}</h3>
                          <p className="text-muted-foreground">Budget: {campaign.budget}</p>
                          <p className="text-sm text-muted-foreground mt-1">Deadline: {campaign.deadline}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                            {campaign.status}
                          </Badge>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">{campaign.applications}</span> applications
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">{campaign.selected}</span> selected
                            </p>
                          </div>
                          <Button size="sm" className="mt-2">
                            View Campaign
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="creators" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Discover Creators</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Browse our verified creator network and find the perfect match for your brand.
                  </p>
                  <Button variant="coral">Browse All Creators</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Detailed analytics and performance metrics for your campaigns will appear here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}