import { Badge } from "@/components/ui/badge";

export default function HeroContent() {
  return (
    <div className="space-y-5">
      <Badge className="bg-purple-600 text-white font-bold tracking-wider px-4 py-2 rounded-full">No. 1 Job Search Platform</Badge>
      <h1 className="font-bold text-5xl tracking-wider">Discover & Apply to Your Dream Career</h1>
      <h2 className="text-lg tracking-wide text-muted-foreground">Connect with top recruiter and find your perfect role</h2>
    </div>
  );
}
