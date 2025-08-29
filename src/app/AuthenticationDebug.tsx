import { useAuth } from "@/context/AuthContext";
import { storage } from "@/utils/storage";
import { useEffect, useState } from "react";

export default function AuthenticationDebug() {
    const { user, token, isAuthenticated, refreshAuthToken, logout } = useAuth();
    const [tokenInfo, setTokenInfo] = useState<{
        expiresAt?: string;
        timeUntilExpiry?: string;
        isExpired?: boolean;
    }>({});

    useEffect(() => {
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const expirationTime = payload.exp * 1000;
                const currentTime = Date.now();
                const timeUntilExpiry = expirationTime - currentTime;

                setTokenInfo({
                    expiresAt: new Date(expirationTime).toLocaleString(),
                    timeUntilExpiry: timeUntilExpiry > 0
                        ? `${Math.floor(timeUntilExpiry / 1000 / 60)} minutes`
                        : 'Expired',
                    isExpired: timeUntilExpiry <= 0
                });
            } catch (error) {
                console.error('Error parsing token:', error);
            }
        }
    }, [token]);

    const handleManualRefresh = async () => {
        try {
            await refreshAuthToken();
            alert('Token refreshed successfully!');
        } catch (error) {
            alert('Failed to refresh token: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            alert('Logout successful!');
        } catch (error) {
            alert('Logout failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    };  
    return (
        <div>
            <div className="w-full bg-gray-900 p-4 rounded-lg mb-4 max-w-6xl mx-auto">
                <h2 className="text-lg font-semibold mb-2">Authentication Debug Info</h2>
                <div className="space-y-2 text-sm">
                    <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
                    <p><strong>User ID:</strong> {user?.id}</p>
                    <p><strong>User Name:</strong> {user?.name}</p>
                    <p><strong>User Email:</strong> {user?.email}</p>
                    <p><strong>User Role:</strong> {user?.role}</p>
                    <p><strong>Access Token:</strong> {token ? `${token.substring(0, 20)}...` : 'None'}</p>
                    <p><strong>Refresh Token:</strong> {storage.getRefreshToken() ? `${storage.getRefreshToken()?.substring(0, 20)}...` : 'None'}</p>
                    <p><strong>Token Expires At:</strong> {tokenInfo.expiresAt || 'Unknown'}</p>
                    <p><strong>Time Until Expiry:</strong> {tokenInfo.timeUntilExpiry || 'Unknown'}</p>
                    <p><strong>Token Status:</strong>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${tokenInfo.isExpired ? 'bg-red-600' : 'bg-green-600'
                            }`}>
                            {tokenInfo.isExpired ? 'Expired' : 'Valid'}
                        </span>
                    </p>
                </div>

                <div className="mt-4 space-x-2">
                    <button
                        onClick={handleManualRefresh}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        Manual Refresh Token
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                        Test Logout
                    </button>
                </div>
            </div>
        </div>
    )

}