// types.d.ts

import { Session } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        email: string;
        // Add any other properties you need
        username: string;
    }
}
