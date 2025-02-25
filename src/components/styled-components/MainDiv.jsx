export default function MainDiv({children}){
    return (
        <div className="flex dark:from-gray-600 dark:via-gray-800 dark:to-gray-950 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 items-center justify-center h-screen">
            {children}
        </div>
    )
}