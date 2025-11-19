import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CampaignsLayout from "@/components/CampaignsLayout";
import Navigation from "@/components/Navigation";

export default function CampaignDetailsPage() {
  const { id } = useParams();

  return (
    <>
      <Navigation />
      <CampaignsLayout>
        <div className="space-y-6">
          {/* Header */}
          <h1 className="text-4xl font-bold text-foreground">Campaign Details</h1>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Overview Card */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Creator</p>
                  <p className="text-foreground">—</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Objective</p>
                  <p className="text-foreground">—</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Budget</p>
                  <p className="text-foreground">—</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="text-foreground">—</p>
                </div>
              </CardContent>
            </Card>

            {/* Performance Card */}
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Impressions</p>
                  <p className="text-foreground">—</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Clicks</p>
                  <p className="text-foreground">—</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Spend</p>
                  <p className="text-foreground">—</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">CTR</p>
                  <p className="text-foreground">—</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CampaignsLayout>
    </>
  );
}
