import { Hero } from "@/components/hero"
import { ProjectsTrail } from "@/components/projects-trail"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackgroundEffect } from "@/components/background-effect"
import { ProfileProvider } from "@/lib/context/profile-context"
import { StructuredData } from "@/components/structured-data"
import { projects } from "@/lib/data"
import { profile } from "@/lib/data"

// Profile data

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData profile={profile} projects={projects} />

      <ProfileProvider profile={profile} projects={projects}>
        <main className="relative min-h-screen overflow-hidden">
          <BackgroundEffect />
          <div className="container relative z-10 mx-auto max-w-4xl px-4 py-4">
            <div className="fixed right-4 top-4 z-50">
              <ThemeToggle />
            </div>

            {/* Semantic HTML structure with proper heading hierarchy */}
            <header>
              <Hero
                name={profile.name}
                title={profile.title}
                description={profile.description}
                socialLinks={profile.socialLinks}
              />
            </header>

            <main id="projects">
              <h2 className="sr-only">Projects</h2>
              <ProjectsTrail />
            </main>

            <Footer />
          </div>
        </main>
      </ProfileProvider>
    </>
  )
}
