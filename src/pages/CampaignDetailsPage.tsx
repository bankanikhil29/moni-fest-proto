import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CampaignsLayout from "@/components/CampaignsLayout";
import Navigation from "@/components/Navigation";
import { useCampaigns } from "@/contexts/CampaignStore";
import { formatINR } from "@/lib/utils";
import { format } from "date-fns";
import { AlertCircle } from "lucide-react";

export default function CampaignDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { getCampaign } = useCampaigns();
  
  const campaign = id ? getCampaign(id) : undefined;

  if (!campaign) {
    return (
      <>
        <Navigation />
        <CampaignsLayout>
          <div className="space-y-6">
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <AlertCircle className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Campaign not found</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  The campaign you're looking for doesn't exist or has been removed.
                </p>
                <Button asChild>
                  <Link to="/campaigns">Back to Campaigns</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CampaignsLayout>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <CampaignsLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-foreground">Campaign Details</h1>
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                End Campaign
              </Button>
              <Button disabled>
                Release Payment
              </Button>
            </div>
          </div>

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
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={campaign.creator.avatar} alt={campaign.creator.name} />
                      <AvatarFallback>{campaign.creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{campaign.creator.name}</p>
                      {campaign.creator.handle && (
                        <p className="text-sm text-muted-foreground">{campaign.creator.handle}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Objective</p>
                  <p className="text-foreground">{campaign.objective}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Brief</p>
                  <p className="text-foreground">{campaign.brief || '—'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Content</p>
                  <p className="text-foreground">
                    {campaign.content.type === 'upload' 
                      ? `Upload: ${campaign.content.ref}` 
                      : `Link: ${campaign.content.ref}`}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Budget</p>
                  <p className="text-foreground text-xl font-bold">{formatINR(campaign.budgetINR)}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Audience</p>
                  <p className="text-foreground">{campaign.audiencePreset}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Platforms</p>
                  <div className="flex gap-1 flex-wrap">
                    {campaign.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                    {campaign.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-foreground">{format(new Date(campaign.createdAt), 'PPP')}</p>
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
                  <p className="text-foreground text-2xl font-bold">1,234</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Clicks</p>
                  <p className="text-foreground text-2xl font-bold">58</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Spend</p>
                  <p className="text-foreground text-2xl font-bold">{formatINR(850)}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">CTR</p>
                  <p className="text-foreground text-2xl font-bold">4.7%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CampaignsLayout>
    </>
  );
}
