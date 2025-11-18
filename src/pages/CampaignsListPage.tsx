import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CampaignsLayout from "@/components/CampaignsLayout";
import Navigation from "@/components/Navigation";
import { Plus, FolderOpen } from "lucide-react";
import { useCampaigns } from "@/contexts/CampaignStore";
import { formatINR } from "@/lib/utils";
import { format } from "date-fns";

export default function CampaignsListPage() {
  const navigate = useNavigate();
  const { campaigns } = useCampaigns();

  return (
    <>
      <Navigation />
      <CampaignsLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-foreground">Campaigns</h1>
            <Button
              onClick={() => navigate("/create-campaign")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </div>

          {campaigns.length === 0 ? (
            /* Empty State */
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <FolderOpen className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No campaigns yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Get started by creating your first campaign to collaborate with creators and grow your brand.
                </p>
                <Button
                  onClick={() => navigate("/create-campaign")}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Campaign
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Campaign List */
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <Card
                  key={campaign.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => navigate(`/campaigns/${campaign.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      {/* Creator */}
                      <div className="flex items-center gap-3 md:col-span-2">
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

                      {/* Objective */}
                      <div className="md:col-span-1">
                        <p className="text-sm text-muted-foreground mb-1">Objective</p>
                        <p className="font-medium text-foreground">{campaign.objective}</p>
                      </div>

                      {/* Budget */}
                      <div className="md:col-span-1">
                        <p className="text-sm text-muted-foreground mb-1">Budget</p>
                        <p className="font-medium text-foreground">{formatINR(campaign.budgetINR)}</p>
                      </div>

                      {/* Platforms */}
                      <div className="md:col-span-1">
                        <p className="text-sm text-muted-foreground mb-1">Platforms</p>
                        <div className="flex gap-1 flex-wrap">
                          {campaign.platforms.slice(0, 2).map((platform) => (
                            <Badge key={platform} variant="secondary" className="text-xs">
                              {platform.split(' ')[0]}
                            </Badge>
                          ))}
                          {campaign.platforms.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{campaign.platforms.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Status & Date */}
                      <div className="md:col-span-1 flex flex-col items-start md:items-end gap-2">
                        <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(campaign.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CampaignsLayout>
    </>
  );
}
