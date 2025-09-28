import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usdToInrDisplay } from "@/lib/currency-utils";

export default function CurrencyToggle() {
  const [isINR, setIsINR] = useState(true);
  
  const toggleCurrency = () => {
    setIsINR(!isINR);
  };

  // Example conversion for display
  const exampleAmount = isINR ? "₹ 15,000.00" : "$150";
  
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleCurrency}
        className="text-sm font-medium"
        title={`Currently showing ${isINR ? 'INR' : 'USD'} - Click to switch`}
      >
        <span className={`${isINR ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
          INR
        </span>
        <span className="mx-1 text-muted-foreground">|</span>
        <span className={`${!isINR ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
          USD
        </span>
      </Button>
      <span className="text-xs text-muted-foreground hidden md:inline">
        (×100)
      </span>
    </div>
  );
}