import React from "react"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Registration from "../pages/Registration"

export enum routes {
    LOGIN="/login",
    REGISTRATION="/registration",
    EVENTS="/events"
}

interface IRoute {
    path: string,
    page: React.ComponentType,
    exact: boolean
}

export const publicRoutes: IRoute[] = [
    {
        path: routes.LOGIN,
        page: Login,
        exact: true
    },
    {
        path: routes.REGISTRATION,
        page: Registration,
        exact: true
    },
]

export const privateRoutes: IRoute[] = [
    {
        path: routes.EVENTS,
        page: Home,
        exact: true
    },
]