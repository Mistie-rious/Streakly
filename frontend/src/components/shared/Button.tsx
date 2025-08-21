interface AuthButtonProps {
    loading?: boolean;
    text: string;
  }
  
  export default function Button({ loading, text }: AuthButtonProps) {
    return (
      <button
        type="submit"
        className="w-full h-10 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Signing in..." : text}
      </button>
    );
  }
  