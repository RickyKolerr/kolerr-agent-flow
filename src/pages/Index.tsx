
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Figma, Paperclip, Bitcoin, Bill, Social, Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background/80 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-6">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          Build something <span className="text-brand-pink">Lovable</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground">
          Idea to app in seconds, with your personal full stack engineer
        </p>

        {/* Input Section */}
        <div className="mt-8 relative">
          <div className="glass-panel rounded-lg p-2">
            <Input 
              className="w-full bg-background/50 text-lg p-6 rounded-md"
              placeholder="Ask Lovable to create a dashboard to..."
            />
            <div className="flex items-center justify-between mt-4 px-2">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Figma className="h-4 w-4 mr-2" />
                  Import Figma
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Public
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  ↑
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          <Button variant="outline" className="bg-background/50">
            <Bitcoin className="h-4 w-4 mr-2" />
            Crypto portfolio tracker
          </Button>
          <Button variant="outline" className="bg-background/50">
            <Bill className="h-4 w-4 mr-2" />
            Bill splitter
          </Button>
          <Button variant="outline" className="bg-background/50">
            <Social className="h-4 w-4 mr-2" />
            Social media feed
          </Button>
          <Button variant="outline" className="bg-background/50">
            <Activity className="h-4 w-4 mr-2" />
            Fitness tracker
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
