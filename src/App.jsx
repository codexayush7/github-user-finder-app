import react, { useState } from "react";
import "./App.css";

export default function App() {
    const [username, setUsername] = useState("codexayush7");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    const fetchUser = async () => {
        if (!username.trim()) return;

        setLoading(true);
        setError("");
        setUserData(null);

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error("User not found");
            }
            const data = await response.json();
            setUserData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            fetchUser();
        }
    };

    return (
        <div className={`app-container ${darkMode ? "dark" : ""}`}>
            <div className="header">
                <h1>🔍 GitHub User Finder</h1>
                <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
                    {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={fetchUser}>Search</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {userData && (
                <div className="user-card fade-in">
                    <img src={userData.avatar_url} alt={userData.login} />
                    <h2>{userData.name || userData.login}</h2>
                    <p>{userData.bio}</p>
                    <div className="user-stats">
                        📍 {userData.location || "Unknown"} <br />
                        🏢 {userData.company || "N/A"} <br />
                        🔗{" "}
                        {userData.blog ? (
                            <a href={userData.blog} target="_blank" rel="noopener noreferrer">
                                Blog/Website
                            </a>
                        ) : (
                            "No blog"
                        )}
                    </div>
                    <p className="user-meta">
                        📦 Repos: {userData.public_repos} | 👥 Followers: {userData.followers}
                    </p>
                </div>
            )}
        </div>
    );
}
