import { debounce } from "lodash";
import { useState, useEffect, useRef } from "react";
import { fetchUsersByDisplayName } from "../apifetch/user-api-fetch";
import LoadingIndicator from "../components/LoadingIndicator";
import profilePlaceholder from "../assets/person.png"
import { useNavigate } from "react-router";
import { useContext } from "react";
import SocketContext from "../providers/Socket";

function UserTile({ displayName, profilePictureUrl, onClick }) {




    return (
        <div
            className="flex items-center p-4 space-x-4 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition duration-200"
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`View profile of ${displayName}`}
        >
            <img src={profilePictureUrl || profilePlaceholder} alt={`Profile of ${displayName}`} className="w-16 h-16 rounded-full object-cover" />
            <h2 className="text-lg font-semibold dark:text-white">{displayName}</h2>
        </div>
    );
}

export default function HomePage() {


    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState(null);
    const socket = useContext(SocketContext);
    const searchContainerRef = useRef(null);
    const resultsContainerRef = useRef(null);
    const navigate = useNavigate();

    useEffect (()=>{
        console.log("Socket",socket)
        if(socket){
            console.log("Emitting Ping")
            socket.emit('ping', { message: 'Ping from HomePage' });
            console.log("Ping emitted")
            socket.on('pong', (data) => {
                console.log("Pong received",data)
            }
            )
        }


        


        return () =>{
            if(socket){socket.off('pong')}
        }
    }, [socket])

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await fetchUsersByDisplayName(searchQuery);
                setUsers(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                setUsers([]);
            } finally {
                setIsLoading(false);
            }
        };

        const debouncedFetchUsers = debounce(fetchUsers, 500);
        setDebouncedSearch(() => debouncedFetchUsers)

        if (searchQuery) {
            debouncedFetchUsers();
        } else {
            setUsers([]);
            setIsLoading(false);
        }

        return () => debouncedFetchUsers.cancel();
    }, [searchQuery]);

    const handleUserTileClick = (user, e) => {
        e.stopPropagation();
        navigate(`/user-profile/${user.id}`);
    };

    const handleSearchClick = () => {
        if (debouncedSearch && searchQuery) {
            debouncedSearch()
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Only clear search if click is outside both search container and results
            if (
                searchContainerRef.current && 
                !searchContainerRef.current.contains(event.target) &&
                resultsContainerRef.current &&
                !resultsContainerRef.current.contains(event.target)
            ) {
                setSearchQuery("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex bg-gradient-to-br dark:from-gray-600 dark:via-gray-800 dark:to-gray-950 from-gray-200 via-gray-300 to-gray-400 items-center justify-center h-screen px-4">
            <div className="w-full max-w-3xl">
                <div className="relative" ref={searchContainerRef}>
                    <input
                        type="text"
                        placeholder="Search for users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full dark:shadow-amber-50  shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        aria-label="Search for users"
                    />
                    {isLoading ? (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 rounded-full">
                            <LoadingIndicator />
                        </div>
                    ) : (
                        <button
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600"
                            onClick={handleSearchClick}
                            aria-label="Search"
                        >
                            Search
                        </button>
                    )}
                </div>

                <div ref={resultsContainerRef}>
                    {isLoading && <LoadingIndicator />}

                    {!isLoading && users.length > 0 && (
                        <ul className="mt-4 space-y-4">
                            {users.map((user) => (
                                <li key={user.id}>
                                    <UserTile
                                        displayName={user.displayName}
                                        profilePictureUrl={user.profilePicture}
                                        onClick={(e) => handleUserTileClick(user, e)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}

                    {!isLoading && searchQuery && users.length === 0 && (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            No users found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}