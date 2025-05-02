import { redirect } from 'next/navigation'
import { Button } from '~/components/ui/button'
import { SignInButton, SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { MUTATIONS, QUERIES } from '~/server/db/queries'

export default function HomePage() {
const handleRedirect = async () => {
  'use server'

  const user = await currentUser()
  const userId = user?.id

  if (!userId) {
    return redirect('/')
  }

  const rootFolder = await QUERIES.getRootFolderForUser(userId)

  if (!rootFolder) {
    const rootFolderId = await MUTATIONS.onboardUser(userId)
    return redirect(`/f/${rootFolderId}`)
  }

  return redirect(`/f/${rootFolder.id}`)
}


  return (
    <>
      <h1 className="mb-4 bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
        Lucas Drive
      </h1>
      <p className="mx-auto mb-8 max-w-md text-xl text-neutral-400 md:text-2xl">
        Secure, fast, and easy file storage for the modern web
      </p>
        <div className="relative flex flex-col items-center justify-center gap-3">
          <SignedIn>
            <form action={handleRedirect} className="w-full">
              <Button size={'lg'} className="w-1/3 max-w-xs border border-neutral-700 transition-colors hover:bg-neutral-700">
                Open Drive
              </Button>
            </form>
            <SignOutButton>
              <Button size={'lg'} className="w-1/3 max-w-xs border border-neutral-700 transition-colors hover:bg-neutral-700">
              Sign out
              </Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button size={'lg'} className="w-1/3 max-w-xs border border-neutral-700 transition-colors hover:bg-neutral-700">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} Drive. All rights reserved.
      </footer>
    </>
  )
}
