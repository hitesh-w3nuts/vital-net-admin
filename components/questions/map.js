import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export default function Map({ options, setInputChange }) {
    const [content, setContent] = useState(options);
    
    useEffect(() => {
        setInputChange({
            questionOptions: content
        });
    }, [content]);

    return (
        <>
            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
                rows={5}
                />
            </div>
        </>
    )
}