import { CupSoda } from "lucide-react";

export default function MainLogo() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
      <div className="relative bg-primary/10 p-3 rounded-2xl">
        <CupSoda className="w-6 h-6 text-primary" strokeWidth={1.5} />
      </div>
    </div>
  );
}
