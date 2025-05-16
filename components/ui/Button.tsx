interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    isLoading?: boolean
}

export function Button({ children, className = "", isLoading = false, ...props }: ButtonProps) {
    return (
        <button
            className={`w-full max-w-xs mx-auto block bg-fuchsia-600 text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-fuchsia-600 hover:bg-fuchsia-500 ${className}`}
            {...props}
        >
            {isLoading ? (
                <div class="flex items-center justify-center">
                    <div class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                </div>
            ) : (
                children
            )}
        </button>
    )
}
