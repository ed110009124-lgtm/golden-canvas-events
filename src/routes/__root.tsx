import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AdminAccess } from "@/components/AdminAccess";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <h1 className="font-serif text-3xl md:text-4xl text-white text-balance leading-snug">
          This page doesn't exist. But your event does. Let's get back to it.
        </h1>
        <div className="mt-8">
          <Link to="/" className="text-xs uppercase tracking-luxe text-gold border-b border-gold pb-0.5">
            Return to beauty
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mileyn Events — Luxury Events Crafted With Precision & Elegance" },
      { name: "description", content: "Luxury event design and production for weddings, corporate galas, and private celebrations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Mileyn Events — Luxury Events Crafted With Precision & Elegance" },
      { name: "twitter:title", content: "Mileyn Events — Luxury Events Crafted With Precision & Elegance" },
      { property: "og:description", content: "Luxury event design and production for weddings, corporate galas, and private celebrations." },
      { name: "twitter:description", content: "Luxury event design and production for weddings, corporate galas, and private celebrations." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f5395928-9041-4be6-ada1-d81f3b8dc72a/id-preview-c2fec6a0--6b374fbc-a806-4fc3-b416-7d18cfaa285a.lovable.app-1779277210378.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f5395928-9041-4be6-ada1-d81f3b8dc72a/id-preview-c2fec6a0--6b374fbc-a806-4fc3-b416-7d18cfaa285a.lovable.app-1779277210378.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster theme="dark" position="bottom-center" toastOptions={{ style: { background: "rgba(10,10,10,0.95)", border: "1px solid rgba(201,168,76,0.3)", color: "#fff" } }} />
      <AdminAccess />
    </QueryClientProvider>
  );
}
