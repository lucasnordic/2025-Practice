import {ClerkProvider} from '@clerk/nextjs'

// const MOCK = true // Set to true to use mock user data

// const MockUserContext = ({children}: {children: React.ReactNode}) => {
//     const user = {
//         id: 1,
//         firstName: 'Johnny',
//         lastName: 'Bravo',
//         email: 'bigjohnny@example.com'
//     }

//     return (
//         <>
//         <p>User: {user.firstName} {user.lastName} {children}</p>
//         </>
//     )
// }

export default function AuthWrapper({children}: {children: React.ReactNode}) {
    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
}