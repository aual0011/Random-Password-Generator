import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { usePasswordGenerator } from "@/hooks/usePasswordGenerator";
import { Copy, RefreshCw } from "lucide-react";

export const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  
  const { toast } = useToast();
  const { password, generatePassword, calculateStrength } = usePasswordGenerator();

  const handleGenerate = () => {
    generatePassword({
      length,
      includeUppercase,
      includeNumbers,
      includeSymbols,
    });
  };

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
  };

  const strengthColor = (strength: number) => {
    switch (strength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      case 4:
        return "bg-emerald-500";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-center">Password Generator</h2>
        <p className="text-sm text-muted-foreground text-center">
          Generate a secure, random password
        </p>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between bg-secondary p-4 rounded-lg">
          <code className="password-font text-lg break-all">
            {password || "Click generate"}
          </code>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              disabled={!password}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {password && (
          <div className="mt-2 flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i < calculateStrength(password)
                    ? strengthColor(calculateStrength(password))
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Password Length</Label>
            <span className="text-muted-foreground">{length}</span>
          </div>
          <Slider
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            min={8}
            max={32}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="uppercase">Include Uppercase</Label>
            <Switch
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={setIncludeUppercase}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="numbers">Include Numbers</Label>
            <Switch
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={setIncludeNumbers}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="symbols">Include Symbols</Label>
            <Switch
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={setIncludeSymbols}
            />
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleGenerate}
        size="lg"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Generate Password
      </Button>
    </Card>
  );
};