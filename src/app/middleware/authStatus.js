"use client";

function authStatus() {
    const refreshToken = localStorage.getItem("refreshToken");

    const refreshAccessToken = async () => {
        try {
            const response = await fetch("https://alx-focus-zen-backend.vercel.app/api/v1/refresh/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh: refreshToken,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(errorData.detail || "Failed to refresh access token");
                return null;
            }

            const data = await response.json();
            localStorage.setItem("accessToken", data.access);
            return data.access;
        } catch (err) {
            console.error("Error connecting to the server:", err);
            return null;
        }
    }
    const token = refreshAccessToken();
    return token;
}

module.exports = { authStatus };