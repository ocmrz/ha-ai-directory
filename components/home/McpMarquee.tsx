import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Common Schedueler",
    username: "4 tools available",
    body: "For kickstarting your Common Scheduler Framework projects.",
    img: "/cms-logo.jpg",
  },
  {
    name: "HA Drive",
    username: "16 tools available",
    body: "Using AI to organize and manage your files in HA Drive.",
    img: "/ha-drive-logo.jpg",
  },
  {
    name: "CMS Design System",
    username: "6 tools available",
    body: "Write React in CMS Design System using AI.",
    img: "/cms-logo.jpg",
  },
  {
    name: "JIRA",
    username: "7 tools available",
    body: "Using AI to organize and manage your JIRA issues.",
    img: "/jira-logo.png",
  },
  {
    name: "CMS Spring Starter",
    username: "3 tools available",
    body: "Start your Spring Boot projects with CMS Spring Starter.",
    img: "/cms-logo.jpg",
  },
  {
    name: "csaf.home",
    username: "llms.txt available",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "/csaf-logo.jpg",
  },
  {
    name: "sc4.home",
    username: "llms-full.txt available",
    body: "All info about EAP, ECP, AIOPS, and ADC now available to AI.",
    img: "/sc4-logo.jpg",
  },
  {
    name: "hagithub.home",
    username: "16 tools available",
    body: "View issues, create pull requests, and more.",
    img: "/github-logo.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] bg-background",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function McpMarquee() {
  return (
    <div className="relative flex mt-2 w-[66rem] mx-auto flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
