export interface User {
    _id?: string;
    name: string;
    email: string;
    role?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface Project {
    _id?: string;
    id?: string; // Fallback for some APIs
    title: string;
    description: string;
    technologies: string[];
    liveUrl?: string; // described as liveUrl
    imageUrl?: string;
}

export interface Blog {
    _id?: string;
    id?: string;
    title: string;
    description: string; // short description
    details: string; // rich text
    technologies: string[];
    readTime?: string;
    imageUrl?: string;
    createdAt?: string;
}

export interface Contact {
    _id?: string;
    id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt?: string;
}
