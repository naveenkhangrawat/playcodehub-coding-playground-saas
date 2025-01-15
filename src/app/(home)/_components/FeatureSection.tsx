import { cn } from "@/lib/utils";
import {
  Globe,
  Shield,
  RefreshCcw,
  Boxes

} from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
        title: "Global Infrastructure",
        description:
        "Lightning fast execution across worldwide edge nodes",
        icon: <Globe color="#0942c8" />,
    },
    {
        title: "Enterprise Security",
        description:
        "Bank grade encryption and security protocols",
        icon: <Shield color="#0942c8" />,
    },
    {
        title: "Real-time Sync",
        description:
        "Instant synchronization across all devices",
        icon: <RefreshCcw color="#0942c8" />,
    },
    {
        title: "Unlimited Storage",
        description: "Store unlimited snippets and projects",
        icon: <Boxes color="#0942c8" />,
    }];


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 py-10 max-w-4xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
    return (
    <div
        className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature border-purple-900/40",
        "lg:border-l border-purple-900/40",
        index < 4 && "lg:border-b border-purple-900/40"
        )}
    >
        {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t  from-purple-900/50 to-transparent pointer-events-none" />
        )}
        {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none" />
        )}
        <div className="mb-4 relative z-10 px-10 text-neutral-400">
        {icon}
        </div>
        <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
            {title}
        </span>
        </div>
        <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
        </p>
    </div>
    );
};
