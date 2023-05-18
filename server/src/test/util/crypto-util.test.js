const {Encryption, Decryption} = require("../../utils/crypto-util/crypto_util.js");
const NullPointError = require("../../utils/errors/NullPointError.js");

describe("Crypto-Util", () => {
    test("Hashed Password", async () => {
        const password = "abcd";
        const hashedPassword = await Encryption(password);
        expect(hashedPassword).not.toEqual(password);
    });

    test("Verified Password", async () => {
        const password = "abcd";
        const hashedPassword = await Encryption(password);
        expect(await Decryption(password, hashedPassword)).toBeTruthy();
    });
    
    test("Encryption Null Check1",async () => {
        let isError = false;
        try {
            await Encryption();
        } catch (e){
            if(e instanceof NullPointError)
                isError = true;
        } finally {
            expect(isError).toBeTruthy();
        }
    });

    test("Encryption Null Check2",async () => {
        let isError = false;
        try {
            await Encryption("");
        } catch (e){
            if(e instanceof NullPointError)
                isError = true;
        } finally {
            expect(isError).toBeTruthy();
        }
    });
    
    test("Decryption Null Check1",async () => {
        let isError = false;
        try {
            await Decryption();
        } catch (e){
            if(e instanceof NullPointError)
                isError = true;
        } finally {
            expect(isError).toBeTruthy();
        }
    });

    test("Decryption Null Check2",async () => {
        let isError = false;
        try {
            await Decryption("","");
        } catch (e){
            if(e instanceof NullPointError)
                isError = true;
        } finally {
            expect(isError).toBeTruthy();
        }
    });

    test("Decryption Null Check3",async () => {
        let isError = false;
        try {
            await Decryption("abced",);
        } catch (e){
            if(e instanceof NullPointError)
                isError = true;
        } finally {
            expect(isError).toBeTruthy();
        }
    });
});