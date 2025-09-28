import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, DollarSign, BarChart3 } from "lucide-react";
import Navigation from "@/components/Navigation";

const stats = [
  { label: "Managed Brands", value: "12", icon: Building, change: "+2" },
  { label: "Active Creators", value: "156", icon: Users, change: "+24" },
  { label: "Total Spend", value: "₹ 45,20,000.00", icon: DollarSign, change: "+₹ 8,50,000.00" },
  { label: "Campaign ROI", value: "3.2x", icon: BarChart3, change: "+0.4x" }
];

const brands = [
  {
    id: 1,
    name: "EcoStyle",
    campaigns: 3,
    spend: "₹ 12,50,000.00",
    performance: "Excellent"
  },
  {
    id: 2,
    name: "TechFlow",
    campaigns: 5,
    spend: "₹ 18,20,000.00",
    performance: "Good"
  },
  {
    id: 3,
    name: "FreshBites",
    campaigns: 2,
    spend: "₹ 8,90,000.00",
    performance: "Excellent"
  }
];

export default function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Brand Manager Dashboard</h1>
            <p className="text-muted-foreground">Manage multiple brands and oversee all creator partnerships.</p>
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

          <Tabs defaultValue="brands" className="space-y-6">
            <TabsList>
              <TabsTrigger value="brands">Brand Portfolio</TabsTrigger>
              <TabsTrigger value="campaigns">All Campaigns</TabsTrigger>
              <TabsTrigger value="creators">Creator Network</TabsTrigger>
              <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="brands" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Managed Brands</h2>
                <Button variant="coral">Add New Brand</Button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brands.map((brand) => (
                  <Card key={brand.id}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">{brand.name}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Active Campaigns:</span>
                          <span className="font-medium">{brand.campaigns}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Spend:</span>
                          <span className="font-medium">{brand.spend}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Performance:</span>
                          <Badge variant={brand.performance === "Excellent" ? "default" : "secondary"}>
                            {brand.performance}
                          </Badge>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        Manage Brand
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    View and manage all campaigns across your brand portfolio.
                  </p>
                  <Button className="mt-4" variant="coral">
                    View All Campaigns
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="creators" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Creator Network Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Manage relationships with creators across all your brands.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="coral">Find New Creators</Button>
                    <Button variant="outline">Manage Existing</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive analytics across all brands and campaigns.
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