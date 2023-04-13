export default function SuccessMessage({ message }) {
    return (
        <>
            {message && (
                <div className="alert alert-success alert-dismissible">
                    {message}
                </div>
            )}
        </>
    );
}