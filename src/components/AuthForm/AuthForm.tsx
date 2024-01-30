import * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useHistory } from "react-router-dom";
import AuthService from "@/services/AuthService.ts";
import { AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext/AuthUserContext"
import TokenService from "@/services/UtilServices"
import { restoreAuthUserFromJWT } from "@/App"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [toMainPage, setMainPage] = React.useState<boolean>(false);

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [error, setError] = useState<string>()
    const history = useHistory();

    const [authenticatedUser, setAuthenticatedUser] = useAuth();


    React.useEffect(() => {
        if (toMainPage) {
            console.log('push')
            history.push('/main')
        }
    }, [toMainPage]);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        try {
            await AuthService.login(login, password)
            setMainPage(true)
            const token = TokenService.getToken()
            console.log('tok', token);
            token && setAuthenticatedUser(restoreAuthUserFromJWT(token));
            // history.push('/main')
        } catch (e: any) {
            if (e instanceof AxiosError || e) {
                setError(e.response.data.exception_description)
            } else {
                setError(e)
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="IvanovAB@mai.ru"
                            // type="email"
                            autoCapitalize="none"
                            autoComplete="login"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={login}
                            onChange={e => {
                                setError(undefined);
                                setLogin(e.target.value);
                            }}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="******"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={password}
                            onChange={e => {
                                setError(undefined)
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    {error && (<p className='text-red-600 text-sm p-2'>
                        {error}
                    </p>)}
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Вход
                    </Button>
                </div>
            </form>
        </div>
    )
}