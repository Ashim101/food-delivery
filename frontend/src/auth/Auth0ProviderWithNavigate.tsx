import { AppState, Auth0Provider, User } from "@auth0/auth0-react";

type Props = {
    children: React.ReactNode
}

const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENTID;
    const redirectUri = import.meta.env.VITE_AUTH0_REDIRECTURI;
    const onRedirectCallback = (appState?: AppState, user?: User) => {
        console.log("successfully initialize")
        console.log(user);

    }
    if (!domain || !clientId || !redirectUri) {
        throw new Error("unable to initialise auth0")
    }
    console.log(`DOMAIN${domain}, clientId${clientId}, redirectUri  ${redirectUri}`)

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{ redirect_uri: redirectUri }}
            onRedirectCallback={onRedirectCallback}>

            {children}
        </Auth0Provider>
    )



}

export default Auth0ProviderWithNavigate;