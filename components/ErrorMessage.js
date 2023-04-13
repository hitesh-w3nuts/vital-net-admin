export default function ErrorMessage({ message }) {
    return (
        <>
            {message && (
                <div className="alert alert-danger alert-dismissible">
                    {message}
                </div>
            )}
        </>
    );
}