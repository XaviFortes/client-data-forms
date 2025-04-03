import { createAuthClient } from "better-auth/vue"
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000",
	plugins: [
		adminClient()
    ]
})

export const {
    signIn,
	signOut,
	signUp,
	useSession,
	forgetPassword,
	resetPassword
} = authClient;