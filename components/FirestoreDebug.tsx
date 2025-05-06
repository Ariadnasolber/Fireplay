"use client";

import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FirestoreDebug() {
    const { user } = useAuth();
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const testFirestore = async () => {
        if (!user) {
            setResult("No user logged in");
            return;
        }

        setLoading(true);
        setResult("Testing Firestore connection...");

        try {
            // Test reading user document
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                setResult(
                    `Successfully read user document: ${JSON.stringify(
                        userDoc.data(),
                        null,
                        2
                    )}`
                );
            } else {
                setResult("User document doesn't exist. Creating it now...");

                // Test creating user document
                await setDoc(userDocRef, {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    createdAt: new Date().toISOString(),
                    favorites: [],
                    cart: [],
                });

                // Verify creation
                const newUserDoc = await getDoc(userDocRef);
                if (newUserDoc.exists()) {
                    setResult(
                        `Successfully created user document: ${JSON.stringify(
                            newUserDoc.data(),
                            null,
                            2
                        )}`
                    );
                } else {
                    setResult("Failed to create user document");
                }
            }
        } catch (error) {
            console.error("Firestore test error:", error);
            setResult(
                `Error: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Firestore Debug</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={testFirestore} disabled={loading}>
                    {loading ? "Testing..." : "Test Firestore Connection"}
                </Button>
                {result && (
                    <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-auto max-h-60">
                        {result}
                    </pre>
                )}
            </CardContent>
        </Card>
    );
}
