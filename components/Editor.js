import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
const ckEditor = ({data, changeEvent, blurEvent}) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={data}
            onChange={changeEvent}
            onBlur={blurEvent}
        />
    )
}

export default ckEditor;