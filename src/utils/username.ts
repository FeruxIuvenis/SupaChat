export function generateUsernameFromEmail(email: string): string {
    const localPart = email.split('@')[0]
    const sanitized = localPart.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase()
    
    const base = sanitized.length < 3 ? `user_${sanitized}` : sanitized
    
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    return `${base}_${randomSuffix}`
}