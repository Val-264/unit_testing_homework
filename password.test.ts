import { hashPassword, comparePassword } from '../../../src/utils/password.util.ts';

describe ('password code test', ()=> {
    const password1 = "(caramba123)";
    const password2 = "(lacontrasennia?)";

    it ('should generate a hash that is not an empty string and is different to the original password', async ()=> {
        const hash1 = await hashPassword(password1);
        const hash2 = await hashPassword(password2);

        expect(hash1).toBeTypeOf('string');
        expect(hash1.length).toBeGreaterThan(0);
        expect(hash1).not.toBe(password1);

        expect(hash2).toBeTypeOf('string');
        expect(hash2.length).toBeGreaterThan(0);
        expect(hash2).not.toBe(password2);
    });
    
    it ('should return true when compare password with hash using comparePassword', async ()=> {
        const hash1 = await hashPassword(password1);
        const hash2 = await hashPassword(password2);

        const match1 = await comparePassword(password1, hash1);
        const match2 = await comparePassword(password2, hash2);

        expect(match1).toBe(true);
        expect(match2).toBe(true);
    });
    
    it ('should return false when compare password with wrong hash using comparePassword', async ()=> {
        const hash1 = await hashPassword(password1);
        const hash2 = await hashPassword(password2);

        const mismatch1 = await comparePassword(password1, hash2);
        const mismatch2 = await comparePassword(password2, hash1);

        expect(mismatch1).toBe(false);
        expect(mismatch2).toBe(false);
    });
})